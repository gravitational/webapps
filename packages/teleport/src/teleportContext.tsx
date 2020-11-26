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
import cfg from 'teleport/config';
import * as types from './types';
import auditService from './services/audit';
import nodeService from './services/nodes';
import clusterService from './services/clusters';
import sshService from './services/ssh';
import resourceService from './services/resources';
import userService from './services/user';
import appService from './services/apps';

class TeleportContext implements types.Context {
  // stores
  storeNav = new StoreNav();
  storeUser = new StoreUserContext();

  // features
  features: types.Feature[] = [];

  // services
  auditService = auditService;
  nodeService = nodeService;
  clusterService = clusterService;
  sshService = sshService;
  resourceService = resourceService;
  userService = userService;
  appService = appService;

  isEnterprise = cfg.isEnterprise;

  init() {
    return userService.fetchUserContext().then(user => {
      this.storeUser.setState(user);
    });
  }

  getFeatureFlags() {
    const userContext = this.storeUser;
    return {
      account: userContext.isSso() === false,
      audit: userContext.getEventAccess().list,
      authConnector: userContext.getConnectorAccess().list,
      roles: userContext.getRoleAccess().list,
      trustedClusters: userContext.getTrustedClusterAccess().list,
      users: userContext.getUserAccess().list,
      applications: userContext.getAppServerAccess().list,
    };
  }
}

export default TeleportContext;
