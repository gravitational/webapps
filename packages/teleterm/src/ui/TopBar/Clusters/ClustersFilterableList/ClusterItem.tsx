import React from 'react';
import { Flex, Label, Text } from 'design';
import { CircleCheck } from 'design/Icon';

import styled from 'styled-components';

import { ListItem } from 'teleterm/ui/components/ListItem';
import { useKeyboardArrowsNavigation } from 'teleterm/ui/components/KeyboardArrowsNavigation';
import { Cluster } from 'teleterm/services/tshd/types';
import { getClusterName } from 'teleterm/ui/utils';

interface ClusterItemProps {
  index: number;
  item: Cluster;
  isSelected: boolean;

  onSelect(): void;
}

export function ClusterItem(props: ClusterItemProps) {
  const { isActive } = useKeyboardArrowsNavigation({
    index: props.index,
    onRun: props.onSelect,
  });

  const LabelVersion = props.isSelected ? InvertedLabel : Label;
  const clusterName = getClusterName(props.item);

  return (
    <StyledListItem
      onClick={props.onSelect}
      isActive={isActive}
      isSelected={props.isSelected}
      isLeaf={props.item.leaf}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flex="1"
        width="100%"
        minWidth="0"
      >
        <Text typography="body1" title={clusterName}>
          {clusterName}
        </Text>
        {!props.item.leaf ? (
          <LabelVersion ml={1} kind="primary">
            root
          </LabelVersion>
        ) : null}
        {props.isSelected ? <CircleCheck fontSize={12} /> : null}
      </Flex>
    </StyledListItem>
  );
}

const StyledListItem = styled(ListItem)`
  padding-left: ${props => (props.isLeaf ? '32px' : null)};
  background: ${getBackgroundColor};

  &:hover,
  &:focus {
    background: ${getHoverBackgroundColor};
  }
`;

const InvertedLabel = styled(Label)`
  color: ${props => props.theme.colors.secondary.main};
  background-color: ${props => props.theme.colors.secondary.contrastText};
`;

function getBackgroundColor(props) {
  if (props.isSelected) {
    if (props.isActive) {
      return props.theme.colors.secondary.light;
    }
    return props.theme.colors.secondary.main;
  }
  if (props.isActive) {
    return props.theme.colors.secondary.lighter;
  }
}

function getHoverBackgroundColor(props) {
  if (props.isSelected) {
    return props.theme.colors.secondary.light;
  }
  if (props.isActive) {
    return props.theme.colors.secondary.lighter;
  }
}
