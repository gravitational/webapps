/**
 * Copyright 2022 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { FeatureHeader, Props } from './FeatureHeader';
import { FeatureHeaderTitle } from './Layout';

export default {
  title: 'Teleport/Layout/FeatureHeader',
  excludeStories: ['props'],
};

export const NoMessages = () => (
  <FeatureHeader {...props}>
    <FeatureHeaderTitle>Applications</FeatureHeaderTitle>
  </FeatureHeader>
);

export const OneMessage = () => (
  <FeatureHeader {...props} errMessages={[{ text: 'error' }]}>
    <FeatureHeaderTitle>Applications</FeatureHeaderTitle>
  </FeatureHeader>
);

export const MultipleMessages = () => (
  <FeatureHeader
    {...props}
    errMessages={[
      { text: 'error' },
      { text: 'second error' },
      { text: 'another error' },
    ]}
  >
    <FeatureHeaderTitle>Applications</FeatureHeaderTitle>
  </FeatureHeader>
);

export const props: Props = {
  errMessages: [],
};
