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

import React from 'react';
import styled, { margin, padding } from 'design/styled';

import { Close as CloseIcon } from 'design/Icon';
import { Flex, Text } from 'design';

import JoinedUsers from './JoinedUsers';

export default function TabItem(props: Props) {
  const { name, users, active, onClick, onClose, style } = props;
  return (
    <StyledTabItem alignItems="center" active={active} style={style}>
      <StyledTabButton onClick={onClick}>
        <JoinedUsers mr="1" users={users} active={active} />
        <Text mx="auto" title={name}>
          {name}
        </Text>
      </StyledTabButton>
      <StyledCloseButton title="Close" onClick={onClose}>
        <CloseIcon />
      </StyledCloseButton>
    </StyledTabItem>
  );
}

type Props = {
  name: string;
  users: { user: string }[];
  active: boolean;
  onClick: () => void;
  onClose: () => void;
  style: any;
};

interface StyledTabItemProps {
  active: boolean;
}

const StyledTabItem = styled(Flex)<StyledTabItemProps>`
  max-width: 200px;
  height: 100%;
  border: none;
  border-right: 1px solid ${p => p.theme.colors.bgTerminal};
  background-color: ${p => (p.active ? p.theme.colors.bgTerminal : 'none')};
  font-weight: ${p => (p.active ? 'bold' : 'normal')};

  &:hover,
  &:focus {
    color: ${p => p.theme.colors.primary.contrastText};
    transition: ${p => (p.active ? 'none' : 'color .3s')};
  }
`;

const StyledTabButton = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  margin: 0;
  color: inherit;
  line-height: 32px;
  background-color: transparent;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 16px;
  text-overflow: ellipsis;
  border: none;
`;

const StyledCloseButton = styled.button([margin, padding])`
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
`;
