/*
Copyright 2019 Gravitational, Inc.

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

import React, { useRef } from 'react';
import styled from 'styled-components';
import { Close as CloseIcon } from 'design/Icon';
import { space } from 'design/system';
import { Flex, Text } from 'design';
import { useTabDnD } from './useTabDnD';

export default function TabItem(props: Props) {
  const { name, active, onClick, onClose, style, index, onMoved } = props;
  const ref = useRef<HTMLDivElement>(null);
  const { isDragging } = useTabDnD({ index, onDrop: onMoved, ref });

  const handleClose = (event: MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  const opacity = isDragging ? 0 : 1;

  return (
    <StyledTabItem
      onClick={onClick}
      ref={ref}
      alignItems="center"
      active={active}
      title={name}
      style={{ ...style, opacity }}
    >
      <StyledTabButton>
        <Text css={{ direction: 'rtl' }} mx="auto">
          {name}
        </Text>
      </StyledTabButton>
      <StyledCloseButton title="Close" onClick={handleClose}>
        <CloseIcon />
      </StyledCloseButton>
    </StyledTabItem>
  );
}

type Props = {
  index: number;
  name: string;
  users: { user: string }[];
  active: boolean;
  onClick: () => void;
  onClose: () => void;
  onMoved: (oldIndex: number, newIndex: number) => void;
  style: any;
};

function fromProps({ theme, active }) {
  let styles: Record<any, any> = {
    border: 'none',
    borderRight: `1px solid ${theme.colors.bgTerminal}`,
    '&:hover, &:focus': {
      color: theme.colors.primary.contrastText,
      transition: 'color .3s',
    },
  };

  if (active) {
    styles = {
      ...styles,
      backgroundColor: theme.colors.bgTerminal,
      color: theme.colors.primary.contrastText,
      fontWeight: 'bold',
      transition: 'none',
    };
  }

  return styles;
}

const StyledTabItem = styled(Flex)`
  min-width: 0;
  height: 100%;
  cursor: pointer;

  ${fromProps}
  &:hover {
    background: ${props => props.theme.colors.primary.light};
  }
`;

const StyledTabButton = styled.button`
  display: flex;
  cursor: pointer;
  outline: none;
  color: inherit;
  line-height: 32px;
  background-color: transparent;
  white-space: nowrap;
  padding: 0 8px;
  border: none;
  min-width: 0;
  width: 100%;
`;

const StyledCloseButton = styled.button`
  background: transparent;
  border-radius: 2px;
  border: none;
  cursor: pointer;
  height: 16px;
  width: 16px;
  outline: none;
  padding: 0;
  margin: 0 8px 0 0;
  transition: all 0.3s;

  &:hover {
    background: ${props => props.theme.colors.danger};
  }

  ${space}
`;
