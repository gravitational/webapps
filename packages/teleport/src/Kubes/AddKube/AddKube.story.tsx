/*
Copyright 2022 Gravitational, Inc.

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
import { AddKube } from './AddKube';

export default {
  title: 'Teleport/Kubes/Add',
};

export const Loaded = () => <AddKube {...props} />;

export const TokenGenerated = () => <AddKube {...props} token="soem token" />;

export const Processing = () => (
  <AddKube {...props} attempt={{ status: 'processing' }} />
);

export const Failed = () => (
  <AddKube
    {...props}
    attempt={{ status: 'failed', statusText: 'some error message' }}
  />
);

const props = {
  onClose() {
    return null;
  },
  createToken() {
    return Promise.resolve(null);
  },
  expires: '4 hours',
  attempt: {
    status: 'success',
    statusText: '',
  } as any,
  token: '',
  version: '10.0.0',
};
