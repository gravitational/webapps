import React, { useState } from 'react';
import styled from 'styled-components';

import { Box, Flex, Text } from 'design';

import { Cloud } from 'design/Icon';

import SlideTabs from 'design/SlideTabs';

import {
  ResourceLocation,
  ResourceType,
} from 'teleport/Discover/resource-lists';
import { ActionButtons } from 'teleport/Discover/Shared';

import { PermissionsErrorMessage } from './PermissionsErrorMessage';

interface DatabaseResourceProps {
  disabled: boolean;
  onProceed: () => void;
}

export function DatabaseResource(props: DatabaseResourceProps) {
  // As we're focusing on the server flow uncomment this when we start
  // implementing the database support.
  // let content = (
  //   <SelectDBDeploymentType
  //     selectedType={selectedType}
  //     setSelectedType={setSelectedType}
  //     resourceTypes={resourceTypes}
  //   />
  // );
  let content;
  if (props.disabled) {
    content = (
      <PermissionsErrorMessage
        action="add new Databases"
        productName="Database Access"
      />
    );
  }

  return (
    <>
      {content}

      <ActionButtons
        onProceed={() => props.onProceed()}
        disableProceed={props.disabled}
      />
    </>
  );
}

interface SelectDBDeploymentTypeProps {
  selectedType: string;
  setSelectedType: (string) => void;
  resourceTypes: ResourceType[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
