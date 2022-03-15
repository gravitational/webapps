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
import { ButtonIcon, Text } from 'design';
import { useTabDnD } from './useTabDnD';

export function TabItem(props: Props) {
  const {
    name,
    active,
    onClick,
    onClose,
    style,
    index,
    onMoved,
    onContextMenu,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const { isDragging } = useTabDnD({ index, onDrop: onMoved, ref });

  const handleClose = (event: MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <>
      <StyledTabItem
        onClick={onClick}
        onContextMenu={onContextMenu}
        ref={ref}
        active={active}
        dragging={isDragging}
        title={name}
        style={{ ...style }}
      >
        <StyledTabButton>
          <Text color="inherit" fontWeight={700} fontSize="12px">
            {name}
          </Text>
        </StyledTabButton>
        <ButtonIcon size={0} mr={1} title="Close" onClick={handleClose}>
          <CloseIcon fontSize="16px" />
        </ButtonIcon>
      </StyledTabItem>
    </>
  );
}

type Props = {
  index: number;
  name: string;
  active: boolean;
  onClick: () => void;
  onClose: () => void;
  onMoved: (oldIndex: number, newIndex: number) => void;
  onContextMenu: () => void;
  style: any;
};

const StyledTabItem = styled.div(({ theme, active, dragging }) => {
  const styles: any = {
    display: 'flex',
    opacity: '1',
    alignItems: 'center',
    minWidth: '0',
    height: '100%',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '8px 8px 0 0',
    '&:hover, &:focus': {
      color: theme.colors.primary.contrastText,
      transition: 'color .3s',
    },
  };

  if (active) {
    styles['backgroundColor'] = theme.colors.terminalDark;
    styles['color'] = theme.colors.secondary.contrastText;
    styles['transition'] = 'none';
  }

  if (dragging) {
    styles['opacity'] = 0;
  }

  return styles;
});

const StyledTabButton = styled.button`
  display: flex;
  cursor: pointer;
  outline: none;
  color: inherit;
  font-family: inherit;
  line-height: 32px;
  background-color: transparent;
  white-space: nowrap;
  padding: 0 12px;
  border: none;
  min-width: 0;
  width: 100%;
`;
