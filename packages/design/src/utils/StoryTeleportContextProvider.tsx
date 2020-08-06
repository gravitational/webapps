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

import React, { ReactNode } from 'react';
import { Router } from 'react-router';
import { createMemoryHistory, MemoryHistoryBuildOptions } from 'history';
import TeleportContextProvider from 'teleport/teleportContextProvider';
import TeleportContext from 'teleport/teleportContext';

/**
 * StoryTeleportContextProvider sets up the boilerplate needed to
 * render components that rely on teleport context.
 */
export default function StoryTeleportContextProvider({
  ctx,
  history = {},
  children,
}: Props) {
  return (
    <TeleportContextProvider value={ctx}>
      <Router history={createMemoryHistory(history)} children={children} />
    </TeleportContextProvider>
  );
}

export const dummyCtx = new TeleportContext();
dummyCtx.storeUser.state = {
  acl: {
    users: {
      list: true,
      read: true,
      create: true,
      remove: true,
      edit: true,
    },
    roles: {
      list: true,
      read: true,
      create: true,
      remove: true,
      edit: true,
    },
    logins: undefined,
    authConnectors: undefined,
    trustedClusters: undefined,
    sessions: undefined,
    events: undefined,
  },
  authType: undefined,
  username: undefined,
  cluster: {
    clusterId: '',
    lastConnected: undefined,
    connectedText: '',
    status: '',
    url: '',
    nodeCount: 0,
    publicURL: '',
    authVersion: '',
    proxyVersion: '',
  },
};

type Props = {
  ctx: TeleportContext;
  history?: MemoryHistoryBuildOptions;
  children: ReactNode;
};
