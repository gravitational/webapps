import React, { forwardRef } from 'react';
import { SortAsc, SortDesc } from 'design/Icon';
import styled from 'styled-components';
import { Box, Text } from 'design';

interface ClusterSelectorProps {
  clusterName?: string;
  isOpened: boolean;

  onClick(): void;
}

export const ClusterSelector = forwardRef<HTMLDivElement, ClusterSelectorProps>(
  (props, ref) => {
    const SortIcon = props.isOpened ? SortAsc : SortDesc;
    const text = props.clusterName || 'Select Resource';
    return (
      <StyledButton
        ref={ref}
        onClick={props.onClick}
        isOpened={props.isOpened}
        isClusterSelected={!!props.clusterName}
        m="auto"
        title={text}
      >
        <Text css={{ whiteSpace: 'nowrap' }}>{text}</Text>
        <SortIcon fontSize={12} ml={3} />
      </StyledButton>
    );
  }
);

const StyledButton = styled(Box)`
  width: 100%;
  height: 40px;
  border: 0.5px ${props => props.theme.colors.action.disabledBackground} solid;
  border-radius: 4px;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  opacity: ${props => props.isClusterSelected ? 1 : 0.6};
  cursor: pointer;

  &:hover,
  &:focus {
    opacity: 1;
    border-color: ${props => props.theme.colors.light};
  }

  ${props => {
    if (props.isOpened) {
      return {
        borderColor: props.theme.colors.secondary.main,
        opacity: 1,
      };
    }
  }}
`;
