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

import useTeleport from 'teleport/useTeleport';
import { Option } from 'teleport/Discover/Shared/SelectCreatable';

import { ResourceKind } from '../ResourceKind';

import type { User, UserTraits } from 'teleport/services/user';
import type { DbMeta, KubeMeta, NodeMeta } from 'teleport/Discover/useDiscover';
import type { AgentStepProps } from '../../types';

// useUserTraits handles:
//  - retrieving the latest user (for the dynamic traits) from the backend
//  - extracting traits into static traits (role-defined) and dynamic traits (user-defined)
//  - updating user in the backend with the latest dynamic traits
//  - updating the dynamic traits for our in-memory resource meta object
//  - provides utility function that makes data objects (type Option) for react-select component
export function useUserTraits(props: AgentStepProps) {
  const ctx = useTeleport();

  const [user, setUser] = useState<User>();
  const { attempt, run, setAttempt, handleError } = useAttempt('processing');

  const isSsoUser = ctx.storeUser.state.authType === 'sso';
  const canEditUser = ctx.storeUser.getUserAccess().edit;
  const dynamicTraits = initUserTraits(user);

  // Filter out static traits from the resource that we
  // queried in a prior step where we discovered the newly connected resource.
  // The resource itself contains traits that define both
  // dynamic (user-defined) and static (role-defined) traits.
  let meta = props.agentMeta;
  let staticTraits = initUserTraits();
  switch (props.selectedResourceKind) {
    case ResourceKind.Kubernetes:
      const kube = (meta as KubeMeta).kube;
      staticTraits.kubeUsers = kube.users.filter(
        v => !dynamicTraits.kubeUsers.includes(v)
      );
      staticTraits.kubeGroups = kube.groups.filter(
        v => !dynamicTraits.kubeGroups.includes(v)
      );
      break;

    case ResourceKind.Server:
      const node = (meta as NodeMeta).node;
      staticTraits.logins = node.sshLogins.filter(
        login => !dynamicTraits.logins.includes(login)
      );
      break;

    case ResourceKind.Database:
      const db = (meta as DbMeta).db;
      staticTraits.databaseUsers = db.users.filter(
        v => !dynamicTraits.databaseUsers.includes(v)
      );
      staticTraits.databaseNames = db.names.filter(
        v => !dynamicTraits.databaseNames.includes(v)
      );
      break;

    default:
      throw new Error(
        `useUserTraits.ts:statiTraits: resource kind ${props.selectedResourceKind} is not handled`
      );
  }

  useEffect(() => {
    fetchUserTraits();
  }, []);

  function fetchUserTraits() {
    run(() =>
      ctx.userService.fetchUser(ctx.storeUser.getUsername()).then(setUser)
    );
  }

  // onProceed deduplicates and removes static traits from the list of traits
  // before updating user in the backend.
  function onProceed(traitOpts: Partial<Record<Traits, Option[]>>) {
    switch (props.selectedResourceKind) {
      case ResourceKind.Kubernetes:
        const newDynamicKubeUsers = new Set<string>();
        traitOpts.kubeUsers.forEach(o => {
          if (!staticTraits.kubeUsers.includes(o.value)) {
            newDynamicKubeUsers.add(o.value);
          }
        });

        const newDynamicKubeGroups = new Set<string>();
        traitOpts.kubeGroups.forEach(o => {
          if (!staticTraits.kubeGroups.includes(o.value)) {
            newDynamicKubeGroups.add(o.value);
          }
        });

        nextStep({
          kubeUsers: [...newDynamicKubeUsers],
          kubeGroups: [...newDynamicKubeGroups],
        });
        break;

      case ResourceKind.Server:
        const newDynamicLogins = new Set<string>();
        traitOpts.logins.forEach(o => {
          if (!staticTraits.logins.includes(o.value)) {
            newDynamicLogins.add(o.value);
          }
        });

        nextStep({ logins: [...newDynamicLogins] });
        break;

      case ResourceKind.Database:
        const newDynamicDbUsers = new Set<string>();
        traitOpts.databaseUsers.forEach(o => {
          if (!staticTraits.databaseUsers.includes(o.value)) {
            newDynamicDbUsers.add(o.value);
          }
        });

        const newDynamicDbNames = new Set<string>();
        traitOpts.databaseNames.forEach(o => {
          if (!staticTraits.databaseNames.includes(o.value)) {
            newDynamicDbNames.add(o.value);
          }
        });

        nextStep({
          databaseUsers: [...newDynamicDbUsers],
          databaseNames: [...newDynamicDbNames],
        });
        break;

      default:
        throw new Error(
          `useUserTrait.ts:onProceed: resource kind ${props.selectedResourceKind} is not handled`
        );
    }
  }

  // updateResourceMetaDynamicTraits updates the in memory
  // meta with the updated dynamic traits.
  function updateResourceMetaDynamicTraits(
    newDynamicTraits: Partial<UserTraits>
  ) {
    let meta = props.agentMeta;
    switch (props.selectedResourceKind) {
      case ResourceKind.Kubernetes:
        const kube = (meta as KubeMeta).kube;
        props.updateAgentMeta({
          ...meta,
          kube: {
            ...kube,
            users: [...staticTraits.kubeUsers, ...newDynamicTraits.kubeUsers],
            groups: [
              ...staticTraits.kubeGroups,
              ...newDynamicTraits.kubeGroups,
            ],
          },
        });
        break;

      case ResourceKind.Server:
        const node = (meta as NodeMeta).node;
        props.updateAgentMeta({
          ...meta,
          node: {
            ...node,
            sshLogins: [...staticTraits.logins, ...newDynamicTraits.logins],
          },
        });
        break;

      case ResourceKind.Database:
        const db = (meta as DbMeta).db;
        props.updateAgentMeta({
          ...meta,
          db: {
            ...db,
            users: [
              ...staticTraits.databaseUsers,
              ...newDynamicTraits.databaseUsers,
            ],
            names: [
              ...staticTraits.databaseNames,
              ...newDynamicTraits.databaseNames,
            ],
          },
        });
        break;

      default:
        throw new Error(
          `useUserTraits.ts:updateResourceMetaDynamicTraits: resource kind ${props.selectedResourceKind} is not handled`
        );
    }
  }

  async function nextStep(newDynamicTraits: Partial<UserTraits>) {
    if (isSsoUser || !canEditUser) {
      props.nextStep();
      return;
    }

    // Update resources with the new dynamic traits.
    updateResourceMetaDynamicTraits(newDynamicTraits);
    setAttempt({ status: 'processing' });
    try {
      await ctx.userService.updateUser({
        ...user,
        traits: {
          ...user.traits,
          ...newDynamicTraits,
        },
      });

      await ctx.userService.applyUserTraits();
      props.nextStep();
    } catch (err) {
      handleError(err);
    }
  }

  function getSelectableOptions(trait: Traits): Option[] {
    switch (trait) {
      case 'logins':
        return dynamicTraits.logins.map(v => makeOpt(v));
      case 'kubeGroups':
        return dynamicTraits.kubeGroups.map(v => makeOpt(v));
      case 'kubeUsers':
        return dynamicTraits.kubeUsers.map(v => makeOpt(v));
      case 'databaseNames':
        return dynamicTraits.databaseNames.map(v => makeOpt(v));
      case 'databaseUsers':
        return dynamicTraits.databaseUsers.map(v => makeOpt(v));
      default:
        throw new Error(
          `useUserTraits.ts:getSelectableOptions: trait kind ${trait} is not handled`
        );
    }
  }

  function getFixedOptions(trait: Traits): Option[] {
    switch (trait) {
      case 'logins':
        return staticTraits.logins.map(v => makeOpt(v, true /*fixed*/));
      case 'kubeGroups':
        return staticTraits.kubeGroups.map(v => makeOpt(v, true /*fixed*/));
      case 'kubeUsers':
        return staticTraits.kubeUsers.map(v => makeOpt(v, true /*fixed*/));
      case 'databaseNames':
        return staticTraits.databaseNames.map(v => makeOpt(v, true /*fixed*/));
      case 'databaseUsers':
        return staticTraits.databaseUsers.map(v => makeOpt(v, true /*fixed*/));
      default:
        throw new Error(
          `useUserTraits.ts:getFixedOptions: trait kind ${trait} is not handled`
        );
    }
  }

  function initSelectedOptions(trait: Traits): Option[] {
    return initSelectedOptionsHelper(trait, staticTraits, dynamicTraits);
  }

  return {
    attempt,
    onProceed,
    fetchUserTraits,
    isSsoUser,
    canEditUser,
    initSelectedOptions,
    getFixedOptions,
    getSelectableOptions,
    dynamicTraits,
    staticTraits,
  };
}

function initUserTraits(user?: User): UserTraits {
  return {
    logins: user?.traits.logins || [],
    databaseUsers: user?.traits.databaseUsers || [],
    databaseNames: user?.traits.databaseNames || [],
    kubeUsers: user?.traits.kubeUsers || [],
    kubeGroups: user?.traits.kubeGroups || [],
    windowsLogins: user?.traits.windowsLogins || [],
    awsRoleArns: user?.traits.awsRoleArns || [],
  };
}

function makeOpt(value: string, isFixed = false): Option {
  return {
    value,
    label: value,
    isFixed,
  };
}

export function initSelectedOptionsHelper(
  trait: Traits,
  staticTraits: UserTraits,
  dynamicTraits: UserTraits
): Option[] {
  switch (trait) {
    case 'logins':
      const fixedLogins = staticTraits.logins.map(l => makeOpt(l, true));
      const logins = dynamicTraits.logins.map(l => makeOpt(l));
      return [...fixedLogins, ...logins];

    case 'kubeGroups':
      const fixedGroups = staticTraits.kubeGroups.map(l => makeOpt(l, true));
      const groups = dynamicTraits.kubeGroups.map(l => makeOpt(l));
      return [...fixedGroups, ...groups];

    case 'kubeUsers':
      const fixedUsers = staticTraits.kubeUsers.map(l => makeOpt(l, true));
      const users = dynamicTraits.kubeUsers.map(l => makeOpt(l));
      return [...fixedUsers, ...users];

    case 'databaseNames':
      const fixedDbNames = staticTraits.databaseNames.map(l =>
        makeOpt(l, true)
      );
      const names = dynamicTraits.databaseNames.map(l => makeOpt(l));
      return [...fixedDbNames, ...names];

    case 'databaseUsers':
      const fixedDbUsers = staticTraits.databaseUsers.map(l =>
        makeOpt(l, true)
      );
      const dbUsers = dynamicTraits.databaseUsers.map(l => makeOpt(l));
      return [...fixedDbUsers, ...dbUsers];

    default:
      throw new Error(
        `useUserTrait.ts:initSelectedOptionsHelper: trait '${trait}' is not handled`
      );
  }
}

type Traits = keyof UserTraits;
export type State = ReturnType<typeof useUserTraits>;
