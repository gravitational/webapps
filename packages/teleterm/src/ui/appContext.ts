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

import { StoreApp, StoreDocs, StoreNav } from './stores';
import serviceNodes from 'teleport/services/nodes';
import serviceClusters from 'teleport/services/clusters';
import serviceUser from 'teleport/services/user';
import { Document } from './types';
import ServicePlatform from './../services/platform';

// const logger = Logger.create('teleport/console');

/**
 * Console Context is used by components to access shared state and also to communicate
 * with other services.
 */
export default class AppContext {
  storeDocs = new StoreDocs();
  storeNav = new StoreNav();
  storeApp = new StoreApp();
  servicePlatform = new ServicePlatform();

  constructor() {}

  async init() {
    const clusters = await this.servicePlatform.listClusters();
    this.storeApp.initCluster(clusters);
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

  gotoTab({ id }: { id: string }) {
    this.storeDocs.makeActive(id);
  }

  closeTab(doc: Document) {
    const next = this.removeDocument(doc.id);
    this.gotoTab(next);
  }
}
