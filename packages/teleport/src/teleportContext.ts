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

import { StoreNav, StoreUserContext } from './stores';
import { Activator } from 'shared/libs/featureBase';
import cfg from 'teleport/config';
import * as teleport from './types';
import auditService from './services/audit';
import nodeService from './services/nodes';
import clusterService from './services/clusters';
import sshService from './services/ssh';
import resourceService from './services/resources';
import userService from './services/user';
import appService from './services/apps';

export default class Context implements teleport.Context {
  // stores
  storeNav = new StoreNav();
  storeUser = new StoreUserContext();

  // features
  features: teleport.Feature[] = [];

  // services
  auditService = auditService;
  nodeService = nodeService;
  clusterService = clusterService;
  sshService = sshService;
  resourceService = resourceService;
  userService = userService;
  appService = appService;

  constructor(params?: { clusterId?: string; features?: teleport.Feature[] }) {
    const { clusterId, features = [] } = params || {};
    this.features = features;
    cfg.setClusterId(clusterId);
  }

  init() {
    return this.storeUser.fetchUserContext().then(() => {
      const activator = new Activator<Context>(this.features);
      activator.onload(this);
    });
  }

  isAccountEnabled() {
    return this.storeUser.isSso() === false;
  }

  isAuditEnabled() {
    return this.storeUser.getEventAccess().list;
  }

  isAuthConnectorEnabled() {
    return this.storeUser.getConnectorAccess().list;
  }

  isRolesEnabled() {
    return this.storeUser.getRoleAccess().list;
  }

  isTrustedClustersEnabled() {
    return this.storeUser.getTrustedClusterAccess().list;
  }

  isUsersEnabled() {
    return this.storeUser.getUserAccess().list;
  }

  isApplicationsEnabled() {
    return this.storeUser.getAppAccess().list;
  }
}
