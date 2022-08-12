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
import React, { useEffect, useState } from 'react';
import { Cloud } from 'design/Icon';
import SlideTabs from 'design/SlideTabs';
import styled from 'styled-components';

import { Image, Text, Box, Flex } from 'design';

import AddApp from 'teleport/Apps/AddApp';
import AddKube from 'teleport/Kubes/AddKube';
import Empty from 'teleport/components/Empty';

import useStickyClusterId from 'teleport/useStickyClusterId';

import useTeleport from 'teleport/useTeleport';

import { ActionButtons } from '../Shared';

import applicationIcon from './assets/application.png';
import databaseIcon from './assets/database.png';
import serverIcon from './assets/server.png';
import k8sIcon from './assets/kubernetes.png';

import type { TabComponent } from 'design/SlideTabs/SlideTabs';
import type { ResourceType, ResourceLocation } from '../resource-lists';
import type { AgentStepProps } from '../types';
import type { State } from '../useDiscover';

export default function Container(props: AgentStepProps) {
  const ctx = useTeleport();
  const { clusterId, isLeafCluster } = useStickyClusterId();
  return (
    <SelectResource
      canCreate={ctx.storeUser.getTokenAccess().create}
      clusterId={clusterId}
      isLeafCluster={isLeafCluster}
      nextStep={props.nextStep}
    />
  );
}

type Props = {
  clusterId: string;
  canCreate: boolean;
  isLeafCluster: boolean;
  nextStep: State['nextStep'];
};

export function SelectResource({
  canCreate,
  clusterId,
  isLeafCluster,
  nextStep,
}: Props) {
  const [selectedResource, setSelectedResource] = useState<string>('server');
  const [selectedType, setSelectedType] = useState('');
  const [disableProceed, setDisableProceed] = useState<boolean>(true);
  const [showAddApp, setShowAddApp] = useState(false);
  const [showAddKube, setShowAddKube] = useState(false);
  const [showAddDB, setShowAddDB] = useState(false);

  const tabs: TabComponent[] = [
    {
      name: 'server',
      component: (
        <Flex style={{ lineHeight: '31px' }}>
          <Image src={serverIcon} width="32px" mr={2} /> Server
        </Flex>
      ),
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
    },

    {
      name: 'kubernetes',
      component: (
        <Flex style={{ lineHeight: '31px' }}>
          <Image src={k8sIcon} width="32px" mr={2} /> Kubernetes
        </Flex>
      ),
    },

    {
      name: 'application',
      component: (
        <Flex style={{ lineHeight: '31px' }}>
          <Image src={applicationIcon} width="32px" mr={2} /> Application
        </Flex>
      ),
    },

    {
      name: 'desktop',
      component: (
        <Flex style={{ lineHeight: '31px' }}>
          <Image src={serverIcon} width="32px" mr={2} /> Desktop
        </Flex>
      ),
    },
  ];

  useEffect(() => {
    if (selectedResource === 'server') {
      // server doesn't have any additional deployment options
      setDisableProceed(false);
      return;
    }
    if (selectedResource && selectedType) {
      setDisableProceed(false);
      return;
    }
    setDisableProceed(true);
  }, [selectedResource, selectedType]);

  return (
    <Box width="1020px">
      <Text typography="h4">Resource Selection</Text>
      <Text mb={4}>Begin with selecting resource to create a connection</Text>
      <Text mb={2}>Select Resource Type</Text>
      <SlideTabs
        tabs={tabs}
        onChange={index => setSelectedResource(tabs[index].name)}
      />
      {selectedResource === 'database' && (
        // As we're focusing on the server flow uncomment this when we start
        // implementing the database support.
        // <SelectDBDeploymentType
        //   selectedType={selectedType}
        //   setSelectedType={setSelectedType}
        //   resourceTypes={resourceTypes}
        // />
        <Empty
          clusterId={clusterId}
          canCreate={canCreate && !isLeafCluster}
          onClick={() => {
            setShowAddDB(true);
          }}
          emptyStateInfo={{
            title: 'Add your first database to Teleport',
            byline:
              'Teleport Database Access provides secure access to PostgreSQL, MySQL, MariaDB, MongoDB, Redis, and Microsoft SQL Server.',
            docsURL: 'https://goteleport.com/docs/database-access/guides/',
            resourceType: 'database',
            readOnly: {
              title: 'No Databases Found',
              resource: 'databases',
            },
          }}
        />
      )}
      {selectedResource === 'application' && (
        <Empty
          clusterId={clusterId}
          canCreate={canCreate && !isLeafCluster}
          onClick={() => {
            setShowAddApp(true);
          }}
          emptyStateInfo={{
            title: 'Add your first application to Teleport',
            byline:
              'Teleport Application Access provides secure access to internal applications.',
            docsURL:
              'https://goteleport.com/docs/application-access/getting-started/',
            resourceType: 'application',
            readOnly: {
              title: 'No Applications Found',
              resource: 'applications',
            },
          }}
        />
      )}
      {selectedResource === 'desktop' && (
        <Empty
          clusterId={clusterId}
          canCreate={canCreate && !isLeafCluster}
          emptyStateInfo={{
            title: 'Add your first Windows desktop to Teleport',
            byline:
              'Teleport Desktop Access provides graphical desktop access to remote Windows hosts.',
            docsURL:
              'https://goteleport.com/docs/desktop-access/getting-started/',
            resourceType: 'desktop',
            readOnly: {
              title: 'No Desktops Found',
              resource: 'desktops',
            },
          }}
        />
      )}
      {selectedResource === 'kubernetes' && (
        <Empty
          clusterId={clusterId}
          canCreate={canCreate && !isLeafCluster}
          onClick={() => setShowAddKube(true)}
          emptyStateInfo={{
            title: 'Add your first Kubernetes cluster to Teleport',
            byline:
              'Teleport Kubenetes Access provides secure access to Kubernetes clusters.',
            docsURL: 'https://goteleport.com/docs/kubernetes-access/guides',
            resourceType: 'kubernetes',
            readOnly: {
              title: 'No Kubernetes Clusters Found',
              resource: 'kubernetes clusters',
            },
          }}
        />
      )}
      {/* only show the proceed button if it's the server view for now */}
      {selectedResource === 'server' && (
        <ActionButtons
          onProceed={() => {
            nextStep();
          }}
        />
      )}
      {showAddApp && <AddApp onClose={() => setShowAddApp(false)} />}
      {showAddKube && <AddKube onClose={() => setShowAddKube(false)} />}
    </Box>
  );
}

type SelectResourceProps = {
  onSelect: (string) => void;
};

function SelectDBDeploymentType({
  selectedType,
  setSelectedType,
  resourceTypes,
}: SelectDBDeploymentTypeProps) {
  type FilterType = 'All' | ResourceLocation;
  const filterTabs: FilterType[] = ['All', 'AWS', 'Self-Hosted'];
  const [filter, setFilter] = useState<FilterType>('All');
  return (
    <Box mt={6}>
      <Flex alignItems="center" justifyContent="space-between">
        <Text mb={2}>Select Deployment Type</Text>
        <Box width="379px">
          <SlideTabs
            appearance="round"
            size="medium"
            tabs={filterTabs}
            onChange={index => setFilter(filterTabs[index])}
          />
        </Box>
      </Flex>
      <Flex
        flexWrap="wrap"
        mt={4}
        justifyContent="space-between"
        gap="12px 12px"
        rowGap="15px"
      >
        {resourceTypes
          .filter(resource => filter === 'All' || resource.type === filter)
          .map(resource => (
            <ResourceTypeOption
              onClick={() => setSelectedType(resource.key)}
              key={resource.key}
              selected={selectedType === resource.key}
            >
              <Flex justifyContent="space-between" mb={2}>
                <Cloud />
                <Tag>popular</Tag>
              </Flex>
              {resource.name}
            </ResourceTypeOption>
          ))}
      </Flex>
    </Box>
  );
}

type SelectDBDeploymentTypeProps = {
  selectedType: string;
  setSelectedType: (string) => void;
  resourceTypes: ResourceType[];
};

const ResourceTypeOption = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: ${props =>
    !props.selected
      ? '2px solid rgba(255, 255, 255, 0)'
      : '2px solid rgba(255, 255, 255, 0.1);'};
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
  height: 72px;
  padding: 12px;
  width: 242px;

  &:hover {
    border: 2px solid rgba(255, 255, 255, 0.1);
  }
`;

const Tag = styled.div`
  align-items: center;
  background-color: #512fc9;
  border-radius: 33px;
  box-sizing: border-box;
  font-size: 10px;
  height: 15px;
  line-height: 11px;
  padding: 2px 10px;
  max-width: 57px;
`;
