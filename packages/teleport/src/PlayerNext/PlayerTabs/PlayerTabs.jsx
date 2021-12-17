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
import styled from 'styled-components';
import { NavLink } from 'teleport/components/Router';
import { typography } from 'design/system';
import { Flex, Box } from 'design';

const Tabs = props => {
  return (
    <StyledTabs
      height="40px"
      color="text.secondary"
      as="nav"
      bg="primary.dark"
      {...props}
    />
  );
};

export const TabItem = ({ to, title, exact }) => (
  <StyledTabItem as={NavLink} to={to} exact={exact}>
    {title}
  </StyledTabItem>
);

const StyledTabItem = styled(Box)`
  max-width: 200px;
  height: 100%;
  outline: none;
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
  align-items: center;
  display: flex;
  justify-content: center;
  flex: 1;

  &:hover,
  &.active,
  &:focus {
    color: ${props => props.theme.colors.primary.contrastText};
  }

  &.active {
    ${({ theme }) => ({
      backgroundColor: theme.colors.bgTerminal,
      color: theme.colors.primary.contrastText,
      fontWeight: 'bold',
      transition: 'none',
    })}
  }

  ${({ theme }) => {
    return {
      border: 'none',
      borderRight: `1px solid ${theme.colors.bgTerminal}`,
      '&:hover, &:focus': {
        color: theme.colors.primary.contrastText,
        transition: 'color .3s',
      },
    };
  }}
`;

const StyledTabs = styled(Flex)`
  min-height: 36px;
  ${typography}
`;

export default Tabs;
