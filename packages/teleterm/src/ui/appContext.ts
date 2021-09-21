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

import { matchPath, generatePath } from 'react-router';
import { StoreApp, StoreCmd } from './stores';
import ServicePlatform from './../services/platform';
import * as serviceTypes from './../services/types';
import getConfig, { Config } from './getConfig';
import { UriParams } from './types';

export default class AppContext {
  storeApp = new StoreApp();
  storeCmd = new StoreCmd();
  servicePlatform = new ServicePlatform();
  cfg = getConfig();

  constructor(cfg?: Config) {
    this.cfg = cfg || this.cfg;
  }

  async init() {
    const [clusters, error] = await this.servicePlatform.listClusters();
    this.storeApp.setClusters(clusters);
  }

  openDialog() {
    //  this.storeApp.
  }

  openDocument(uri: string) {
    const homeMatch = matchPath<UriParams>(uri, this.cfg.routes.home);
    const srvMatch = matchPath<UriParams>(uri, this.cfg.routes.clusterServers);
    const dbsMatch = matchPath<UriParams>(uri, this.cfg.routes.clusterDbs);

    if (this.storeApp.findDocument(uri)) {
      // do nothing
    } else if (homeMatch) {
      this.storeApp.addDocument({
        uri,
        title: 'Home',
        kind: 'home',
        created: new Date(),
      });
    } else if (srvMatch) {
      this.storeApp.addDocument({
        uri,
        clusterId: srvMatch.params.clusterId,
        title: 'Servers',
        kind: 'servers',
        created: new Date(),
      });
    } else if (dbsMatch) {
      this.storeApp.addDocument({
        uri,
        clusterId: dbsMatch.params.clusterId,
        title: 'Databases',
        kind: 'dbs',
        created: new Date(),
      });
    } else {
      this.storeApp.addDocument({
        uri,
        title: 'not-found',
        kind: 'blank',
        created: new Date(),
      });
    }

    this.storeApp.setLocation(uri);
  }

  getDocuments() {
    return this.storeApp.state.docs;
  }

  getDocument(url: string) {
    return this.storeApp.findDocument(url);
  }

  getActiveDocument() {
    return this.storeApp.findDocument(this.storeApp.getLocation());
  }

  getLocation() {
    return this.storeApp.getLocation();
  }

  closeDocument({ uri }: { uri: string }) {
    const nextUri = this.storeApp.getNextDocumentUri(uri);
    const docs = this.storeApp.state.docs.filter(i => i.uri !== uri);
    this.storeApp.setState({ docs, location: nextUri });
  }

  match(uri: string) {
    const location = this.getLocation();
    return !!matchPath<UriParams>(location, uri);
  }

  getUriServer(params: UriParams) {
    return generatePath(this.cfg.routes.clusterServers, { ...params });
  }

  getUriDb(params: UriParams) {
    return generatePath(this.cfg.routes.clusterDbs, { ...params });
  }

  getUriApps(params: UriParams) {
    return generatePath(this.cfg.routes.clusterApps, { ...params });
  }

  addCluster(cluster: serviceTypes.Cluster) {
    this.storeApp.addCluster(cluster);
  }
}
