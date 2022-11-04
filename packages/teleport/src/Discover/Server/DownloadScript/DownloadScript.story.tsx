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
import { MemoryRouter } from 'react-router';

import { ContextProvider, Context as TeleportContext } from 'teleport';
import cfg from 'teleport/config';
import {
  clearCachedJoinTokenResult,
  JoinTokenProvider,
} from 'teleport/Discover/Shared/JoinTokenContext';
import { PingTeleportProvider } from 'teleport/Discover/Shared/PingTeleportContext';
import { userContext } from 'teleport/Main/fixtures';
import { ResourceKind } from 'teleport/Discover/Shared';

import DownloadScript from './DownloadScript';

export default {
  title: 'Teleport/Discover/Server/DownloadScripts',
  decorators: [
    Story => {
      // Reset request handlers added in individual stories.
      window.msw.worker.resetHandlers();
      clearCachedJoinTokenResult();
      return <Story />;
    },
  ],
};

export const Polling = () => {
  const { worker, rest } = window.msw;
  // Use default fetch token handler defined in mocks/handlers

  worker.use(
    rest.get(cfg.api.nodesPath, (req, res, ctx) => {
      return res(ctx.delay('infinite'));
    })
  );
  return (
    <Provider>
      <DownloadScript />
    </Provider>
  );
};

export const PollingSuccess = () => {
  const { worker, rest } = window.msw;
  // Use default fetch token handler defined in mocks/handlers

  worker.use(
    rest.get(cfg.api.nodesPath, (req, res, ctx) => {
      return res(ctx.json({ items: [{}] }));
    })
  );
  return (
    <Provider interval={5}>
      <DownloadScript />
    </Provider>
  );
};

export const PollingError = () => {
  const { worker, rest } = window.msw;
  // Use default fetch token handler defined in mocks/handlers

  worker.use(
    rest.get(cfg.api.nodesPath, (req, res, ctx) => {
      return res(ctx.delay('infinite'));
    })
  );
  return (
    <Provider timeout={20}>
      <DownloadScript />
    </Provider>
  );
};

export const Processing = () => {
  const { worker, rest } = window.msw;
  worker.use(
    rest.post(cfg.api.joinTokenPath, (req, res, ctx) => {
      return res(ctx.delay('infinite'));
    })
  );
  return (
    <Provider interval={5}>
      <DownloadScript />
    </Provider>
  );
};

export const Failed = () => {
  const { worker, rest } = window.msw;
  worker.use(
    rest.post(cfg.api.joinTokenPath, (req, res, ctx) => {
      return res.once(ctx.status(500));
    })
  );
  return (
    <Provider>
      <DownloadScript />
    </Provider>
  );
};

const Provider = props => {
  const ctx = createTeleportContext();

  return (
    <MemoryRouter>
      <ContextProvider ctx={ctx}>
        <JoinTokenProvider timeout={props.timeout || 100000}>
          <PingTeleportProvider
            timeout={props.timeout || 100000}
            interval={props.interval || 100000}
            resourceKind={ResourceKind.Server}
          >
            {props.children}
          </PingTeleportProvider>
        </JoinTokenProvider>
      </ContextProvider>
    </MemoryRouter>
  );
};

function createTeleportContext() {
  const ctx = new TeleportContext();

  ctx.isEnterprise = false;
  ctx.storeUser.setState(userContext);

  return ctx;
}
