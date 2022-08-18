/*
Copyright 2022 Gravitational, Inc.

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
import React, { useState } from 'react';
import SlideTabs from 'design/SlideTabs';
import { useLocation } from 'react-router';
import { Image, Text, Box, Flex } from 'design';

import AddApp from 'teleport/Apps/AddApp';
import AddDatabase from 'teleport/Databases/AddDatabase';
import AddKube from 'teleport/Kubes/AddKube';
import useTeleport from 'teleport/useTeleport';

import { Acl } from 'teleport/services/user';

import applicationIcon from './assets/application.png';
import databaseIcon from './assets/database.png';
import serverIcon from './assets/server.png';
import k8sIcon from './assets/kubernetes.png';

import { ApplicationResource } from './ApplicationResource';
import { DatabaseResource } from './DatabaseResource';
import { DesktopResource } from './DesktopResource';
import { KubernetesResource } from './KubernetesResource';
import { ServerResource } from './ServerResource';

import type { UserContext } from 'teleport/services/user';
import type { State } from '../useDiscover';
import type { AgentStepProps } from '../types';
import type { TabComponent } from 'design/SlideTabs/SlideTabs';

export default function Container(props: AgentStepProps) {
  const ctx = useTeleport();
  const userContext = ctx.storeUser.state;

  return (
    <SelectResource
      userContext={userContext}
      isEnterprise={ctx.isEnterprise}
      nextStep={props.nextStep}
    />
  );
}

type ValidResourceTypes =
  | 'application'
  | 'database'
  | 'desktop'
  | 'kubernetes'
  | 'server';

type Loc = {
  state: {
    entity: ValidResourceTypes;
  };
};

type Props = {
  userContext: UserContext;
  isEnterprise: boolean;
  nextStep: State['nextStep'];
};

interface Tab extends TabComponent {
  permissionsNeeded: boolean[];
}

function checkPermissions(acl: Acl, tab: Tab) {
  const basePermissionsNeeded = [
    acl.tokens.create,
    acl.users.edit,
    acl.connectionDiagnostic.create,
    acl.connectionDiagnostic.read,
    acl.connectionDiagnostic.edit,
  ];

  const permissionsNeeded = [
    ...basePermissionsNeeded,
    ...tab.permissionsNeeded,
  ];

  // if some (1+) are false, we do not have enough permissions
  return permissionsNeeded.some(value => !value);
}

export function SelectResource({ isEnterprise, nextStep, userContext }: Props) {
  const { acl } = userContext;

  const location: Loc = useLocation();

  const [selectedResource, setSelectedResource] = useState<ValidResourceTypes>(
    location?.state?.entity || 'server'
  );

  const [showAddApp, setShowAddApp] = useState(false);
  const [showAddKube, setShowAddKube] = useState(false);
  const [showAddDB, setShowAddDB] = useState(false);

  const tabs: Tab[] = [
    {
      name: 'server',
      component: (
        <Flex style={{ lineHeight: '31px' }}>
          <Image src={serverIcon} width="32px" mr={2} /> Server
        </Flex>
      ),
      permissionsNeeded: [acl.nodes.read, acl.nodes.list],
    },

    {
      name: 'database',
      component: (
        <>
          <Flex style={{ lineHeight: '31px' }}>
            <Image src={databaseIcon} width="32px" mr={2} /> Database
          </Flex>
        </>
      ),
      permissionsNeeded: [acl.dbServers.read, acl.dbServers.list],
    },

    {
      name: 'kubernetes',
      component: (
        <Flex style={{ lineHeight: '31px' }}>
          <Image src={k8sIcon} width="32px" mr={2} /> Kubernetes
        </Flex>
      ),
      permissionsNeeded: [acl.kubeServers.read, acl.kubeServers.list],
    },

    {
      name: 'application',
      component: (
        <Flex style={{ lineHeight: '31px' }}>
          <Image src={applicationIcon} width="32px" mr={2} /> Application
        </Flex>
      ),
      permissionsNeeded: [acl.appServers.read, acl.appServers.list],
    },

    {
      name: 'desktop',
      component: (
        <Flex style={{ lineHeight: '31px' }}>
          <Image src={serverIcon} width="32px" mr={2} /> Desktop
        </Flex>
      ),
      permissionsNeeded: [acl.desktops.read, acl.desktops.list],
    },
  ];

  const index = tabs.findIndex(
    component => component.name === selectedResource
  );
  const selectedTabIndex = index > 0 ? index : 0;

  const disabled = checkPermissions(acl, tabs[selectedTabIndex]);

  return (
    <Box width="1020px">
      <Text typography="h4">Resource Selection</Text>
      <Text mb={4}>
        Users are able to add and access many different types of resources
        through Teleport. Start by selecting the type of resource you want to
        add.
      </Text>
      <Text mb={2}>Select Resource Type</Text>
      <SlideTabs
        initialSelected={selectedTabIndex}
        tabs={tabs}
        onChange={index =>
          setSelectedResource(tabs[index].name as ValidResourceTypes)
        }
      />
      {selectedResource === 'database' && (
        <DatabaseResource
          disabled={disabled}
          onProceed={() => setShowAddDB(true)}
        />
      )}
      {selectedResource === 'application' && (
        <ApplicationResource
          disabled={disabled}
          onProceed={() => setShowAddApp(true)}
        />
      )}
      {selectedResource === 'desktop' && (
        <DesktopResource disabled={disabled} />
      )}
      {selectedResource === 'kubernetes' && (
        <KubernetesResource
          disabled={disabled}
          onProceed={() => setShowAddKube(true)}
        />
      )}
      {selectedResource === 'server' && (
        <ServerResource disabled={disabled} onProceed={nextStep} />
      )}
      {showAddApp && <AddApp onClose={() => setShowAddApp(false)} />}
      {showAddKube && <AddKube onClose={() => setShowAddKube(false)} />}
      {showAddDB && (
        <AddDatabase
          isEnterprise={isEnterprise}
          username={userContext.username}
          version={userContext.cluster.authVersion}
          authType={userContext.authType}
          onClose={() => setShowAddDB(false)}
        />
      )}
    </Box>
  );
}
