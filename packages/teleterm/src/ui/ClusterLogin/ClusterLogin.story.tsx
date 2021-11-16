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

import React from 'react';
import { ClusterLogin } from './ClusterLogin';
import * as types from 'teleterm/services/tshd/types';

const props = {
  title: 'localhost',
  loginAttempt: {
    status: 'error',
    statusText: 'fsdfd',
  } as const,
  initAttempt: {
    status: 'success',
    statusText: '',
  } as const,

  onClose: () => null,

  loginWithLocal: (email: string, password: string) =>
    Promise.resolve<[void, Error]>([null, null]),
  loginWithSso: (provider: types.AuthProvider) => null,
};

export default {
  title: 'Teleterm/ClusterLogin',
};

export const Basic = () => <ClusterLogin {...props} />;
