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
import { Cloud, Server } from 'design/Icon';
import SlideTabs from 'design/SlideTabs';
import styled from 'styled-components';
import { Text, Box, ButtonPrimary, ButtonSecondary, Flex } from 'design';

import { resourceTypes } from './resource-lists';

import type { TabComponent } from 'design/SlideTabs/SlideTabs';
import type { ResourceType, ResourceLocation } from './resource-lists';

export function SelectResource({ onSelect }: SelectResourceProps) {
  const [selectedResource, setSelectedResource] = useState<string>('server');
  const [selectedType, setSelectedType] = useState('');
  const [disableProceed, setDisableProceed] = useState<boolean>(true);
  const tabs: TabComponent[] = [
    {
      name: 'server',
      component: (
        <>
          <Server /> Server
        </>
      ),
    },
    {
      name: 'database',
      component: (
        <>
          <Server /> Database
        </>
      ),
    },

    {
      name: 'kubernetes',
      component: (
        <>
          <Server /> Kubernetes
        </>
      ),
    },

    {
      name: 'application',
      component: (
        <>
          <Server /> Application
        </>
      ),
    },

    {
      name: 'desktop',
      component: (
        <>
          <Server /> Desktop
        </>
      ),
    },
  ];

  useEffect(() => {
    if (selectedResource === 'server') {
      // server doesn't have any additional deployment options
      setDisableProceed(false);
      return;
    }
    setDisableProceed(true);
  }, [selectedResource]);

  return (
    <Box width="900px">
      <Text mb={4} typography="h4">
        Resource Selection
      </Text>
      <Text mb={2}>Select Resource Type</Text>
      <SlideTabs
        tabs={tabs}
        onChange={index => setSelectedResource(tabs[index].name)}
      />
      {selectedResource === 'database' && (
        <SelectDBDeploymentType
          setSelectedType={setSelectedType}
          resourceTypes={resourceTypes}
        />
      )}
      <Box mt={4}>
        <ButtonPrimary
          size="medium"
          disabled={disableProceed}
          mr={3}
          onClick={() => {
            onSelect({
              resource: selectedResource,
              type: selectedType,
            });
          }}
        >
          Proceed
        </ButtonPrimary>
        <ButtonSecondary size="medium">Go to dashboard</ButtonSecondary>
      </Box>
    </Box>
  );
}

type SelectResourceProps = {
  onSelect: (string) => void;
};

function SelectDBDeploymentType({
  setSelectedType,
  resourceTypes,
}: SelectDBDeploymentTypeProps) {
  type FilterType = 'All' | ResourceLocation;
  const filterTabs: FilterType[] = ['All', 'AWS', 'Self-Hosted'];
  const [filter, setFilter] = useState<FilterType>('All');
  return (
    <Box>
      <Flex>
        <Text mb={2}>Select Deployment Type</Text>
        <Box width="379px">
          <SlideTabs
            appearance="round"
            tabs={filterTabs}
            onChange={index => setFilter(filterTabs[index])}
          />
        </Box>
      </Flex>
      <Flex flexWrap="wrap" gap="12">
        {resourceTypes
          .filter(resource => filter === 'All' || resource.type === filter)
          .map(resource => (
            <ResourceTypeOption onClick={() => setSelectedType(resource.key)}>
              <Flex>
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
  setSelectedType: (string) => void;
  resourceTypes: ResourceType[];
};

const ResourceTypeOption = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  box-sizing: border-box;
  padding: 12px;
  height: 72px;
  width: 242px;
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
  width: 57px;
`;
