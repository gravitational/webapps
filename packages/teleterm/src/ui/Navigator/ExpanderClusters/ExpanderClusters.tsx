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
import { Flex, Box, Text, ButtonIcon } from 'design';
import * as Icons from 'design/Icon';
import Expander, { ExpanderHeader, ExpanderContent } from './../Expander';
import NavItem from 'teleterm/ui/Navigator/NavItem';
import useExpanderClusters, {
  State,
  ClusterNavItem,
} from './useExpanderClusters';

import * as palette from 'design/theme/palette';

export default function Container() {
  const state = useExpanderClusters();
  return <ExpanderClusters {...state} />;
}

export const ExpanderClusters: React.FC<State> = props => {
  const {
    clusterItems,
    login,
    syncClusters,
    addCluster,
    logout,
    remove,
    openContextMenu,
  } = props;

  const handleSyncClick = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    syncClusters();
  };

  const handleAddClick = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    addCluster();
  };

  const $clustersItems = clusterItems.map(i => (
    <ClusterItem
      key={i.uri}
      item={i}
      onLogin={login}
      onRemove={remove}
      onLogout={logout}
      onContextMenu={openContextMenu(i)}
    />
  ));

  return (
    <Expander>
      <ExpanderHeader>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flex="1"
          width="100%"
        >
          <Text typography="body1">Clusters</Text>
          <Flex>
            <ButtonIcon
              p={3}
              color="text.placeholder"
              onClick={handleSyncClick}
            >
              <Icons.Restore />
            </ButtonIcon>
            <ButtonIcon color="text.placeholder" onClick={handleAddClick}>
              <Icons.Add />
            </ButtonIcon>
          </Flex>
        </Flex>
      </ExpanderHeader>
      <ExpanderContent>{$clustersItems}</ExpanderContent>
    </Expander>
  );
};

type ClusterItemProps = {
  item: ClusterNavItem;
  onLogout(string): void;
  onLogin(string): void;
  onRemove(string): void;
  onContextMenu(): void;
};

const ClusterItem: React.FC<ClusterItemProps> = props => {
  const { item, onContextMenu } = props;
  const { title, connected } = item;

  function handleLogout(e: React.SyntheticEvent) {
    e.stopPropagation();
    props.onLogout(props.item.uri);
  }

  function handleLogin(e: React.SyntheticEvent) {
    e.stopPropagation();
    props.onLogin(props.item.uri);
  }

  function handleRemove(e: React.SyntheticEvent) {
    e.stopPropagation();
    props.onRemove(props.item.uri);
  }

  const color = connected ? 'text.primary' : 'text.placeholder';

  return (
    <NavItem pl={5} item={props.item}>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flex="1"
        width="100%"
        onContextMenu={onContextMenu}
      >
        <Flex justifyContent="center" alignItems="center" color={color}>
          <ClusterIcon mr={2} name={title} />
          <Text typography="body1" style={{ position: 'relative' }}>
            {title}
          </Text>
        </Flex>
        <Flex>
          {connected && (
            <ButtonIcon color="text.placeholder" onClick={handleLogout}>
              <Icons.EmailSolid />
            </ButtonIcon>
          )}
          {!connected && (
            <ButtonIcon color="text.placeholder" onClick={handleLogin}>
              <Icons.Restore />
            </ButtonIcon>
          )}
          <ButtonIcon color="text.placeholder" onClick={handleRemove}>
            <Icons.Trash />
          </ButtonIcon>
        </Flex>
      </Flex>
    </NavItem>
  );
};

const ClusterIcon = ({
  name,
  ...rest
}: {
  name: string;
  [key: string]: any;
}) => (
  <Flex
    height="10px"
    width="10px"
    borderRadius="100%"
    justifyContent="center"
    alignItems="center"
    bg={getIconColor(name)}
    {...rest}
  />
);

function getIconColor(appName: string) {
  let stringValue = 0;
  for (let i = 0; i < appName.length; i++) {
    stringValue += appName.charCodeAt(i);
  }

  const colors = [
    palette.pink[700],
    palette.teal[700],
    palette.cyan[700],
    palette.blue[700],
    palette.green[700],
    palette.orange[700],
    palette.brown[700],
    palette.red[700],
    palette.deepOrange[700],
  ];

  return colors[stringValue % 9];
}
