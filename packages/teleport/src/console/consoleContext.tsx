/*
Copyright 2019 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { StoreParties, StoreDocs, DocumentSsh, Document } from './stores';
import Logger from 'shared/libs/logger';
import session from 'teleport/services/session';
import history from 'teleport/services/history';
import cfg, { UrlSshParams } from 'teleport/config';
import { getAccessToken } from 'teleport/services/api';
import Tty from 'teleport/lib/term/tty';
import TtyAddressResolver from 'teleport/lib/term/ttyAddressResolver';
import serviceSsh, { Session, ParticipantList } from 'teleport/services/ssh';
import serviceNodes from 'teleport/services/nodes';
import serviceClusters from 'teleport/services/clusters';
import serviceUser from 'teleport/services/user';

const logger = Logger.create('teleport/console');

/**
 * Console Context is used by components to access shared state and also to communicate
 * with other services.
 */
export default class ConsoleContext {
  storeDocs = new StoreDocs();
  storeParties = new StoreParties();

  constructor() {
    // set default clusterId (proxy)
    cfg.setClusterId(cfg.proxyCluster);

    // always initialize the console with 1 document
    this.storeDocs.add({
      kind: 'blank',
      url: cfg.getConsoleRoute(cfg.proxyCluster),
      clusterId: cfg.proxyCluster,
      created: new Date(),
    });
  }

  getActiveDocId(url: string) {
    const doc = this.storeDocs.findByUrl(url);
    return doc ? doc.id : -1;
  }

  removeDocument(id: number) {
    const nextId = this.storeDocs.getNext(id);
    const items = this.storeDocs.filter(id);
    this.storeDocs.setState({ items });
    return this.storeDocs.find(nextId);
  }

  updateSshDocument(id: number, partial: Partial<DocumentSsh>) {
    this.storeDocs.update(id, partial);
  }

  addNodeDocument(clusterId = cfg.proxyCluster) {
    return this.storeDocs.add({
      clusterId,
      title: `New session`,
      kind: 'nodes',
      url: cfg.getConsoleNodesRoute(clusterId),
      created: new Date(),
    });
  }

  addSshDocument({ login, serverId, sid, clusterId }: UrlSshParams) {
    const title = login && serverId ? `${login}@${serverId}` : sid;
    const url = this.getSshDocumentUrl({
      clusterId,
      login,
      serverId,
      sid,
    });

    return this.storeDocs.add({
      kind: 'terminal',
      status: 'disconnected',
      clusterId,
      title,
      serverId,
      login,
      sid,
      url,
      created: new Date(),
    });
  }

  getDocuments() {
    return this.storeDocs.state.items;
  }

  getNodeDocumentUrl(clusterId: string) {
    return cfg.getConsoleNodesRoute(clusterId);
  }

  getSshDocumentUrl(sshParams: UrlSshParams) {
    return sshParams.sid
      ? cfg.getSshSessionRoute(sshParams)
      : cfg.getSshConnectRoute(sshParams);
  }

  refreshParties() {
    // Finds unique clusterIds from all active ssh sessions
    // and creates a separate API call per each.
    // After receiving the data, it updates the stores only once.
    const clusters = this.storeDocs
      .getSshDocuments()
      .filter(doc => doc.status === 'connected')
      .map(doc => doc.clusterId);

    const unique = [...new Set(clusters)];
    const requests = unique.map(clusterId =>
      // Fetch parties for a given cluster and in case of an error
      // return an empty object.
      serviceSsh.fetchParticipants({ clusterId }).catch(err => {
        logger.error('failed to refresh participants', err);
        const emptyResults: ParticipantList = {};
        return emptyResults;
      })
    );

    return Promise.all(requests).then(results => {
      let parties: ParticipantList = {};
      for (let i = 0; i < results.length; i++) {
        parties = {
          ...results[i],
        };
      }

      this.storeParties.setParties(parties);
    });
  }

  fetchNodes(clusterId: string) {
    return Promise.all([
      serviceUser.fetchUserContext(clusterId),
      serviceNodes.fetchNodes(clusterId),
    ]).then(values => {
      const [user, nodes] = values;
      return {
        logins: user.acl.logins,
        nodes,
      };
    });
  }

  fetchClusters() {
    return serviceClusters.fetchClusters();
  }

  fetchSshSession(clusterId: string, sid: string) {
    return serviceSsh.fetchSession({ clusterId, sid });
  }

  createSshSession(clusterId: string, serverId: string, login: string) {
    return serviceSsh.create({
      serverId,
      clusterId,
      login,
    });
  }

  logout() {
    session.logout();
  }

  createTty(session: Session): Tty {
    const { login, sid, serverId, clusterId } = session;
    const ttyUrl = cfg.api.ttyWsAddr
      .replace(':fqdm', getHostName())
      .replace(':token', getAccessToken())
      .replace(':clusterId', clusterId);

    const addressResolver = new TtyAddressResolver({
      ttyUrl,
      ttyParams: {
        login,
        sid,
        server_id: serverId,
      },
    });

    return new Tty(addressResolver);
  }

  gotoNodeTab(clusterId: string) {
    const url = this.getNodeDocumentUrl(clusterId);
    this.gotoTab({ url });
  }

  gotoTab({ url }: { url: string }, replace = true) {
    if (replace) {
      history.replace(url);
    } else {
      history.push(url);
    }
  }

  closeTab(doc: Document) {
    const next = this.removeDocument(doc.id);
    this.gotoTab(next);
  }
}

function getHostName() {
  return location.hostname + (location.port ? ':' + location.port : '');
}
