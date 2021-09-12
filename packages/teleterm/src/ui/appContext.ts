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

import { StoreDocs } from './stores';
import session from 'teleport/services/session';
import cfg, { UrlSshParams } from 'teleport/config';
import { getAccessToken } from 'teleport/services/api';
import Tty from 'teleport/lib/term/tty';
import TtyAddressResolver from 'teleport/lib/term/ttyAddressResolver';
import serviceSsh, { Session } from 'teleport/services/ssh';
import serviceNodes from 'teleport/services/nodes';
import serviceClusters from 'teleport/services/clusters';
import serviceUser from 'teleport/services/user';
import { Document } from './types';

// const logger = Logger.create('teleport/console');

/**
 * Console Context is used by components to access shared state and also to communicate
 * with other services.
 */
export default class AppContext {
  storeDocs = new StoreDocs();

  constructor() {
    // always initialize the console with 1 document
    this.storeDocs.add({
      id: '-1',
      kind: 'blank',
      created: new Date(),
    });
  }

  removeDocument(id: string) {
    const nextId = this.storeDocs.getNext(id);
    const items = this.storeDocs.filter(id);
    this.storeDocs.setState({ items });
    return this.storeDocs.find(nextId);
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

  fetchNodes(clusterId: string) {
    return Promise.all([
      serviceUser.fetchUserContext(),
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

  gotoTab({ id }: { id: string }, replace = true) {
    this.storeDocs.makeActive(id);
  }

  closeTab(doc: Document) {
    const next = this.removeDocument(doc.id);
    this.gotoTab(next);
  }
}

function getHostName() {
  return location.hostname + (location.port ? ':' + location.port : '');
}
