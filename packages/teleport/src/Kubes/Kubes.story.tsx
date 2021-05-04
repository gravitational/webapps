/*
Copyright 2021 Gravitational, Inc.

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
import { Kubes } from './Kubes';
import { kubes } from './fixtures';
import ConnectDialog from './ConnectDialog';

export default {
  title: 'Teleport/Kubes',
};

export function Loaded() {
  return <Kubes {...props} attempt={{ status: 'success' }} />;
}

export function Loading() {
  return <Kubes {...props} attempt={{ status: 'processing' }} />;
}

export function Failed() {
  return (
    <Kubes
      {...props}
      attempt={{ status: 'failed', statusText: 'server error' }}
    />
  );
}

export function Connect() {
  return (
    <ConnectDialog
      onClose={() => null}
      user={'sam'}
      name={'tele.logicoma.dev-prod'}
    />
  );
}

const props = {
  kubes: kubes,
  user: 'sam',
  isEnterprise: true,
  isLeafCluster: false,
};
