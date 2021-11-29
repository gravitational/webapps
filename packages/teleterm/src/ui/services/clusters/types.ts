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

import * as tsh from 'teleterm/services/tshd/types';
import * as shared from 'shared/services/types';

export type SyncStatus = {
  status: 'processing' | 'ready' | 'failed' | '';
  statusText?: string;
};

export type PreferredMfaType = shared.PreferredMfaType;

export type Auth2faType = shared.Auth2faType;

export type AuthProviderType = shared.AuthProviderType;

export type AuthProvider = tsh.AuthProvider;

export type LoginParams = tsh.LoginParams;

export interface AuthSettings extends tsh.AuthSettings {
  secondFactor: Auth2faType;
  preferredMfa: PreferredMfaType;
}

export { tsh };
