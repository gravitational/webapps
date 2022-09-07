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
import styled, { margin, padding, width } from 'design/styled';

import {
  useClusterContext,
  NavLocation,
} from 'teleterm/ui/DocumentCluster/clusterContext';

export default function NavButton(props: NavButtonProps) {
  const { title, ...rest } = props;
  const clusterCtx = useClusterContext();
  const active = clusterCtx.isLocationActive(props.to);

  function handleNavClick() {
    clusterCtx.changeLocation(props.to);
  }

  return (
    <StyledNavButton mr={6} active={active} onClick={handleNavClick} {...rest}>
      {title}
    </StyledNavButton>
  );
}

export type NavButtonProps = {
  title: string;
  to: NavLocation;
  [key: string]: any;
};

interface StyledNavButtonProps {
  active: boolean;
}

const StyledNavButton = styled.button([
  margin,
  padding,
  width,
])<StyledNavButtonProps>`
  color: ${p =>
    p.active ? p.theme.colors.light : p.theme.colors.text.secondary};
  cursor: pointer;
  display: inline-flex;
  font-size: 14px;
  position: relative;
  padding: 0;
  margin-right: 24px;
  text-decoration: none;
  font-weight: ${p => (p.active ? 700 : 400)};
  outline: inherit;
  border: none;
  background-color: inherit;
  flex-shrink: 0;
  border-radius: 4px;

  &:hover, &:focus {
    background: ${p => p.theme.colors.primary.main};
  }
`;
