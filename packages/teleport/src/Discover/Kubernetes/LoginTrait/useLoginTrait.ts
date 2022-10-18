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

import { useState, useEffect } from 'react';
import useAttempt from 'shared/hooks/useAttemptNext';

import TeleportContext from 'teleport/teleportContext';

import type { User } from 'teleport/services/user';
import type { AgentStepProps } from '../../types';
import type { KubeMeta } from 'teleport/Discover/useDiscover';

export function useLoginTrait({ ctx, props }: Props) {
  const [user, setUser] = useState<User>();
  const { attempt, run, setAttempt, handleError } = useAttempt('processing');

  const [staticTraits, setStaticTraits] = useState<Traits>();

  const isSsoUser = ctx.storeUser.state.authType === 'sso';
  const canEditUser = ctx.storeUser.getUserAccess().edit;

  useEffect(() => {
    fetchLoginTraits();
  }, []);

  function fetchLoginTraits() {
    run(() =>
      ctx.userService.fetchUser(ctx.storeUser.getUsername()).then(user => {
        setUser(user);

        // Filter out dynamic traits from the kube resource
        // which contain both dynamic and static traits.
        const userDefinedKubeUsers = user.traits.kubeUsers;
        const userDefinedKubeGroups = user.traits.kubeGroups;

        const meta = props.agentMeta as KubeMeta;
        const filteredStaticUsers = meta.kube.users.filter(
          user => !userDefinedKubeUsers.includes(user)
        );
        const filteredStaticGroups = meta.kube.groups.filter(
          groups => !userDefinedKubeGroups.includes(groups)
        );

        setStaticTraits({
          users: filteredStaticUsers,
          groups: filteredStaticGroups,
        });
      })
    );
  }

  // updateKubeMeta updates the meta with updated dynamic traits.
  function updateKubeMeta(dynamicTraits: Traits) {
    const meta = props.agentMeta as KubeMeta;
    props.updateAgentMeta({
      ...meta,
      kube: {
        ...meta.kube,
        users: [...staticTraits.users, ...dynamicTraits.users],
        groups: [...staticTraits.groups, ...dynamicTraits.groups],
      },
    });
  }

  async function nextStep(dynamicTraits: Traits) {
    if (isSsoUser || !canEditUser) {
      props.nextStep();
      return;
    }

    updateKubeMeta(dynamicTraits);

    // Update the dynamic traits for the user in backend.
    setAttempt({ status: 'processing' });
    try {
      await ctx.userService.updateUser({
        ...user,
        traits: {
          ...user.traits,
          kubeUsers: dynamicTraits.users,
          kubeGroups: dynamicTraits.groups,
        },
      });
      props.nextStep();
    } catch (err) {
      handleError(err);
    }
  }

  return {
    attempt,
    nextStep,
    dynamicTraits: {
      users: user?.traits.kubeUsers,
      groups: user?.traits.kubeGroups,
    },
    staticTraits,
    fetchLoginTraits,
    isSsoUser,
    canEditUser,
  };
}

type Props = {
  ctx: TeleportContext;
  props: AgentStepProps;
};

type Traits = {
  users: string[];
  groups: string[];
};

export type State = ReturnType<typeof useLoginTrait>;
