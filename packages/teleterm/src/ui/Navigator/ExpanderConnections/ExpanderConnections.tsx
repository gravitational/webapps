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
import { Flex, Text, ButtonIcon } from 'design';
import { Trash } from 'design/Icon';

import Expander, {
  ExpanderHeader,
  ExpanderContent,
} from 'teleterm/ui/Navigator/Expander';
import NavItem from 'teleterm/ui/Navigator/NavItem';
import StatusIndicator from './StatusIndicator';
import useExpanderConnections, {
  State,
  ConnectionItem,
} from './useExpanderConnections';

export default function Container() {
  const state = useExpanderConnections();
  return <ExpanderConnections {...state} />;
}

export const ExpanderConnections: React.FC<State> = props => {
  return (
    <Expander>
      <ExpanderHeader>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flex="1"
          width="100%"
        >
          <Text typography="body1">Connections</Text>
        </Flex>
      </ExpanderHeader>
      <ExpanderContent>
        {props.items.map(i => (
          <ConnItem key={i.uri} item={i} />
        ))}
      </ExpanderContent>
    </Expander>
  );
};

const ConnItem: React.FC<ConnItemProps> = props => {
  const offline = props.item.status === 'disconnected';
  const color = !offline ? 'text.primary' : 'text.placeholder';

  return (
    <NavItem pl={5} item={props.item}>
      <StatusIndicator mr={3} status={props.item.status} />
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flex="1"
        width="100%"
      >
        <Text typography="body1" color={color}>
          {props.item.title}
        </Text>
        {offline && (
          <ButtonIcon color="text.placeholder">
            <Trash />
          </ButtonIcon>
        )}
      </Flex>
    </NavItem>
  );
};

type ConnItemProps = {
  item: ConnectionItem;
};
