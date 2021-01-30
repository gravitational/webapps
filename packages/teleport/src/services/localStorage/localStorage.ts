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

import { KeysEnum } from './types';
import { BearerToken, Session } from 'teleport/services/session';

const storage = {
  clear() {
    window.localStorage.clear();
  },

  subscribe(fn) {
    window.addEventListener('storage', fn);
  },

  unsubscribe(fn) {
    window.removeEventListener('storage', fn);
  },

  setBearerToken(token: BearerToken) {
    window.localStorage.setItem(KeysEnum.TOKEN, JSON.stringify(token));
  },

  getBearerToken(): BearerToken {
    const item = window.localStorage.getItem(KeysEnum.TOKEN);
    if (item) {
      return JSON.parse(item);
    }

    return null;
  },

  getAccessToken() {
    const bearerToken = this.getBearerToken();
    return bearerToken ? bearerToken.accessToken : null;
  },

  broadcast(messageType, messageBody) {
    window.localStorage.setItem(messageType, messageBody);
    window.localStorage.removeItem(messageType);
  },

  // setDefaultSession preserves the data from first session created after user logs in.
  // This enables users who assumed additional roles from access requests,
  // to switch back to their default roles and resume remaining ttl.
  setDefaultSession(session: Session) {
    if (this.getDefaultSession()) {
      return;
    }

    window.localStorage.setItem(
      KeysEnum.DEFAULT_SESSION,
      JSON.stringify(session)
    );
  },

  getDefaultSession(): Session {
    const item = window.localStorage.getItem(KeysEnum.DEFAULT_SESSION);

    return JSON.parse(item);
  },
};

export default storage;
