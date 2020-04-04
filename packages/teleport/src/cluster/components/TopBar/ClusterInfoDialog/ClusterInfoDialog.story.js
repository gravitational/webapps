/**
 * Copyright 2020 Gravitational, Inc.
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
import ClusterDialog from './ClusterInfoDialog';

export default {
  title: 'Teleport/ClusterInfoDialog',
};

export const ClusterInfoDialog = () => (
  <ClusterDialog
    clusterName="applePie"
    numNodes={45}
    publicURL="some.kind.of.host:8080"
    authVersion="5.0.0"
    proxyVersion="4.2.2"
  />
);

ClusterInfoDialog.story = {
  name: 'ClusterInfoDialog',
};
