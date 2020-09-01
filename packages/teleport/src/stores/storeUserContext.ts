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

import { Store } from 'shared/libs/stores';
import service, { UserContext } from 'teleport/services/user';

export default class StoreUserContext extends Store<UserContext> {
  state: UserContext = null;

  isSso() {
    return this.state.authType === 'sso';
  }

  getEventAccess() {
    return this.state.acl.events;
  }

  getConnectorAccess() {
    return this.state.acl.authConnectors;
  }

  getRoleAccess() {
    return this.state.acl.roles;
  }

  getLogins() {
    return this.state.acl.logins;
  }

  getTrustedClusterAccess() {
    return this.state.acl.trustedClusters;
  }

  getUserAccess() {
    return this.state.acl.users;
  }

  getAppAccess() {
    return this.state.acl.apps;
  }

  fetchUserContext() {
    return service.fetchUserContext().then(user => {
      this.setState(user);
    });
  }
}
