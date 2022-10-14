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

export function useLoginTrait({ ctx, props }: Props) {
  const [user, setUser] = useState<User>();
  const { attempt, run, setAttempt, handleError } = useAttempt('processing');

  const [dynamicTraits, setDynamicTraits] = useState<Traits>();
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

        // Filter out dynamic users and groups from the kube resource
        // which contain both dynamic and static users and groups.
        const userDefinedKubeUsers = user.traits.kubeUsers;
        const userDefinedKubeGroups = user.traits.kubeGroups;

        // // TODO apply logic for kubes after this issue gets resolved:
        // // https://github.com/gravitational/teleport/issues/17382
        // const meta = props.agentMeta as KubeMeta;
        // const filteredStaticUsers = meta.kube.users.filter(
        //   user => !userDefinedKubeUsers.includes(user)
        // );
        // const filteredStaticGroups = meta.kube.groups.filter(
        //   groups => !userDefinedKubeGroups.includes(groups)
        // );

        setStaticTraits({ users: [], groups: [] }); // TODO update it with computed value above
        setDynamicTraits({
          users: userDefinedKubeUsers,
          groups: userDefinedKubeGroups,
        });
      })
    );
  }

  async function nextStep(kubeUsers: string[], kubeGroups: string[]) {
    if (isSsoUser || !canEditUser) {
      props.nextStep();
      return;
    }

    // Update the dynamic users and groups for the user in backend.
    setAttempt({ status: 'processing' });
    try {
      await ctx.userService.updateUser({
        ...user,
        traits: {
          ...user.traits,
          kubeUsers,
          kubeGroups,
        },
      });

      await ctx.userService.applyUserTraits();
      props.nextStep();
    } catch (err) {
      handleError(err);
    }
  }

  return {
    attempt,
    nextStep,
    dynamicTraits,
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
