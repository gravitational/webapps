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
import { Box, Flex, Image, Text } from 'design';

import AddApp from 'teleport/Apps/AddApp';
import AddDatabase from 'teleport/Databases/AddDatabase';
import AddKube from 'teleport/Kubes/AddKube';
import useTeleport from 'teleport/useTeleport';

import { Acl } from 'teleport/services/user';

import { ResourceKind , Header, HeaderSubtitle } from 'teleport/Discover/Shared';

import applicationIcon from './assets/application.png';
import databaseIcon from './assets/database.png';
import serverIcon from './assets/server.png';
import k8sIcon from './assets/kubernetes.png';

import { ApplicationResource } from './ApplicationResource';
import { DatabaseResource } from './DatabaseResource';
import { DesktopResource } from './DesktopResource';
import { KubernetesResource } from './KubernetesResource';
import { ServerResource } from './ServerResource';

import type { TabComponent } from 'design/SlideTabs/SlideTabs';

function checkPermissions(acl: Acl, tab: Tab) {
  const basePermissionsNeeded = [acl.tokens.create];

  const permissionsNeeded = [
    ...basePermissionsNeeded,
    ...tab.permissionsNeeded,
  ];

  // if some (1+) are false, we do not have enough permissions
  return permissionsNeeded.some(value => !value);
}

interface Tab extends TabComponent {
  permissionsNeeded: boolean[];
  kind: ResourceKind;
}

interface SelectResourceProps {
  onSelect: (kind: ResourceKind) => void;
  onNext: () => void;
  selectedResourceKind: ResourceKind;
}

export function SelectResource(props: SelectResourceProps) {
  const ctx = useTeleport();

  const userContext = ctx.storeUser.state;
  const { acl } = userContext;

  const [showAddApp, setShowAddApp] = useState(false);
  const [showAddKube, setShowAddKube] = useState(false);
  const [showAddDB, setShowAddDB] = useState(false);

  const tabs: Tab[] = [
    {
      name: 'server',
      kind: ResourceKind.Server,
      component: <TabItem iconSrc={serverIcon} title="Server" />,
      permissionsNeeded: [acl.nodes.list],
    },

    {
      name: 'database',
      kind: ResourceKind.Database,
      component: <TabItem iconSrc={databaseIcon} title="Database" />,
      permissionsNeeded: [acl.dbServers.read, acl.dbServers.list],
    },

    {
      name: 'kubernetes',
      kind: ResourceKind.Kubernetes,
      component: <TabItem iconSrc={k8sIcon} title="Kubernetes" />,
      permissionsNeeded: [acl.kubeServers.read, acl.kubeServers.list],
    },

    {
      name: 'application',
      kind: ResourceKind.Application,
      component: <TabItem iconSrc={applicationIcon} title="Application" />,
      permissionsNeeded: [acl.appServers.read, acl.appServers.list],
    },
    {
      name: 'desktop',
      kind: ResourceKind.Desktop,
      component: <TabItem iconSrc={serverIcon} title="Desktop" />,
      permissionsNeeded: [acl.desktops.read, acl.desktops.list],
    },
  ];

  const index = tabs.findIndex(
    component => component.kind === props.selectedResourceKind
  );
  const selectedTabIndex = Math.max(0, index);

  const disabled = checkPermissions(acl, tabs[selectedTabIndex]);

  return (
    <Box>
      <Header>Select Resource Type</Header>
      <HeaderSubtitle>
        Users are able to add and access many different types of resources
        through Teleport. <br />
        Start by selecting the type of resource you want to add.
      </HeaderSubtitle>
      <SlideTabs
        initialSelected={selectedTabIndex}
        tabs={tabs}
        onChange={index => props.onSelect(tabs[index].kind)}
      />
      {props.selectedResourceKind === ResourceKind.Database && (
        <DatabaseResource
          disabled={disabled}
          onProceed={() => setShowAddDB(true)}
        />
      )}
      {props.selectedResourceKind === ResourceKind.Application && (
        <ApplicationResource
          disabled={disabled}
          onProceed={() => setShowAddApp(true)}
        />
      )}
      {props.selectedResourceKind === ResourceKind.Desktop && (
        <DesktopResource disabled={disabled} onProceed={() => props.onNext()} />
      )}
      {props.selectedResourceKind === ResourceKind.Kubernetes && (
        <KubernetesResource
          disabled={disabled}
          onProceed={() => setShowAddKube(true)}
        />
      )}
      {props.selectedResourceKind === ResourceKind.Server && (
        <ServerResource disabled={disabled} onProceed={() => props.onNext()} />
      )}
      {showAddApp && <AddApp onClose={() => setShowAddApp(false)} />}
      {showAddKube && <AddKube onClose={() => setShowAddKube(false)} />}
      {showAddDB && (
        <AddDatabase
          isEnterprise={ctx.isEnterprise}
          username={userContext.username}
          version={userContext.cluster.authVersion}
          authType={userContext.authType}
          onClose={() => setShowAddDB(false)}
        />
      )}
    </Box>
  );
}

const TabItem = ({ iconSrc, title }: { iconSrc: string; title: string }) => (
  <Flex
    css={`
      align-items: center;
    `}
  >
    <Image src={iconSrc} width="32px" mr={2} />
    <Text bold typography="h5">
      {title}
    </Text>
  </Flex>
);
