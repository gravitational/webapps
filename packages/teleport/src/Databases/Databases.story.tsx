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
import Databases from './Databases';
import { databases } from './fixtures';

type PropTypes = Parameters<typeof Databases>[0];

export const Loaded = () => render({ status: 'success' });

export const Loading = () => render({ status: 'processing' });

export const Failed = () =>
  render({ status: 'failed', statusText: 'Server Error' });

export default {
  title: 'Teleport/Databases',
};

function render(attemptOptions: Partial<PropTypes['attempt']>) {
  const props = {
    databases,
    attempt: {
      status: '' as any,
      statusText: '',
      ...attemptOptions,
    },
  };

  return <Databases {...props} />;
}
