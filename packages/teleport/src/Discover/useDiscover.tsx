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

import { useState } from 'react';
import useAttempt from 'shared/hooks/useAttemptNext';

import { useLocation } from 'react-router';

import TeleportContext from 'teleport/teleportContext';
import session from 'teleport/services/websession';
import useMain from 'teleport/Main/useMain';

import { ResourceKind } from 'teleport/Discover/Shared';

import { addIndexToViews, findViewAtIndex, View } from './flow';

import { resources } from './resources';

import type { Node } from 'teleport/services/nodes';

import type {
  JoinMethod,
  JoinRole,
  JoinToken,
  JoinRule,
} from 'teleport/services/joinToken';
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
  const { attempt, run } = useAttempt('');
  const location = useLocation<{ entity: string }>();

  const [joinToken, setJoinToken] = useState<JoinToken>();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedResourceKind, setSelectedResourceKind] =
    useState<ResourceKind>(
      getKindFromString(location?.state?.entity || 'server')
    );
  const [agentMeta, setAgentMeta] = useState<AgentMeta>();

  const resource = resources.find(r => r.kind === selectedResourceKind);
  const [views, setViews] = useState<View[]>(() =>
    addIndexToViews(resource.views)
  );

  function onSelectResource(kind: ResourceKind) {
    const resource = resources.find(r => r.kind === kind);

    setViews(addIndexToViews(resource.views));
    setSelectedResourceKind(kind);
  }

  function nextStep() {
    const nextView = findViewAtIndex(views, currentStep + 1);

    if (nextView) {
      setCurrentStep(currentStep + 1);
    }
  }

  function prevStep() {
    const previousView = findViewAtIndex(views, currentStep - 1);

    if (previousView) {
      setCurrentStep(currentStep - 1);
    }
  }

  function updateAgentMeta(meta: AgentMeta) {
    setAgentMeta(meta);
  }

  function logout() {
    session.logout();
  }

  function createJoinToken(method: JoinMethod = 'token', rules?: JoinRule[]) {
    let systemRole: JoinRole;
    switch (selectedResourceKind) {
      case ResourceKind.Application:
        systemRole = 'App';
        break;
      case ResourceKind.Database:
        systemRole = 'Db';
        break;
      case ResourceKind.Desktop:
        systemRole = 'WindowsDesktop';
        break;
      case ResourceKind.Kubernetes:
        systemRole = 'Kube';
        break;
      case ResourceKind.Server:
        systemRole = 'Node';
        break;
      default:
        console;
    }

    run(() =>
      ctx.joinTokenService
        .fetchJoinToken([systemRole], method, rules)
        .then(setJoinToken)
    );
  }

  return {
    initAttempt: { status: initState.status, statusText: initState.statusText },
    userMenuItems: ctx.storeNav.getTopMenuItems(),
    username: ctx.storeUser.getUsername(),
    currentStep,
    selectedResourceKind,
    logout,
    onSelectResource,
    views,
    // Rest of the exported fields are used to prop drill
    // to Step 2+ components.
    attempt,
    joinToken,
    agentMeta,
    updateAgentMeta,
    nextStep,
    prevStep,
    createJoinToken,
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
