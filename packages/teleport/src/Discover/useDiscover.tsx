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

import { useMemo, useState } from 'react';
import useAttempt from 'shared/hooks/useAttemptNext';

import { useLocation } from 'react-router';

import TeleportContext from 'teleport/teleportContext';
import session from 'teleport/services/websession';
import useMain from 'teleport/Main/useMain';

import { ResourceKind } from 'teleport/Discover/Shared';

import { addIndexToViews, findViewAtIndex, View } from './flow';

import { resources } from './resources';

import type { Node } from 'teleport/services/nodes';
import type { Feature } from 'teleport/types';

export function getKindFromString(value: string) {
  switch (value) {
    case 'application':
      return ResourceKind.Application;
    case 'database':
      return ResourceKind.Database;
    case 'desktop':
      return ResourceKind.Desktop;
    case 'kubernetes':
      return ResourceKind.Kubernetes;
    case 'server':
      return ResourceKind.Server;
  }
}

export function useDiscover(ctx: TeleportContext, features: Feature[]) {
  const initState = useMain(features);
  const location = useLocation<{ entity: string }>();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedResourceKind, setSelectedResourceKind] =
    useState<ResourceKind>(
      getKindFromString(location?.state?.entity || 'desktop')
    );
  const [agentMeta, setAgentMeta] = useState<AgentMeta>();

  const resource = resources.find(r => r.kind === selectedResourceKind);
  const views = useMemo<View[]>(
    () => addIndexToViews(resource.views),
    [resource.views]
  );

  function onSelectResource(kind: ResourceKind) {
    setSelectedResourceKind(kind);
  }

  function nextStep() {
    const nextView = findViewAtIndex(views, currentStep + 1);

    if (nextView) {
      setCurrentStep(currentStep + 1);
    }
  }

  function updateAgentMeta(meta: AgentMeta) {
    setAgentMeta(meta);
  }

  function logout() {
    session.logout();
  }

  return {
    agentMeta,
    alerts: initState.alerts,
    currentStep,
    customBanners: initState.customBanners,
    dismissAlert: initState.dismissAlert,
    initAttempt: { status: initState.status, statusText: initState.statusText },
    logout,
    nextStep,
    onSelectResource,
    selectedResourceKind,
    updateAgentMeta,
    userMenuItems: ctx.storeNav.getTopMenuItems(),
    username: ctx.storeUser.getUsername(),
    views,
  };
}

type BaseMeta = {
  resourceName: string;
};

// NodeMeta describes the fields for node resource
// that needs to be preserved throughout the flow.
export type NodeMeta = BaseMeta & {
  node: Node;
};

// AppMeta describes the fields that may be provided or required by user
// when connecting a app.
type AppMeta = BaseMeta & {
  name: string;
  publicAddr: string;
};

export type AgentMeta = AppMeta | NodeMeta;

export type State = ReturnType<typeof useDiscover>;
