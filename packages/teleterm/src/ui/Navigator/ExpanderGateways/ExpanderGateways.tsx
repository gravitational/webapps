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
import * as Icons from 'design/Icon';
import Expander, {
  ExpanderHeader,
  ExpanderContent,
} from 'teleterm/ui/Navigator/Expander';
import * as types from 'teleterm/ui/Navigator/types';
import NavItem from 'teleterm/ui/Navigator/NavItem';
import StatusIndicator from './StatusIndicator';
import useExpanderGateways, { State } from './useExpanderGateways';

export default function Container() {
  const state = useExpanderGateways();
  return <ExpanderGateways {...state} />;
}

export const ExpanderGateways: React.FC<State> = props => {
  return (
    <Expander>
      <ExpanderHeader>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flex="1"
          width="100%"
        >
          <Text typography="body1">Gateways</Text>
        </Flex>
      </ExpanderHeader>
      <ExpanderContent>
        {props.gatewayItems.map(i => (
          <GateWayItem key={i.uri} item={i} />
        ))}
      </ExpanderContent>
    </Expander>
  );
};

const GateWayItem: React.FC<GatewayItemProps> = props => {
  return (
    <NavItem pl={5} item={props.item}>
      <StatusIndicator ml={-1} mr={3} status="connected" />
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flex="1"
        width="100%"
      >
        {props.item.title}
        <ButtonIcon color="text.placeholder">
          <Icons.Trash />
        </ButtonIcon>
      </Flex>
    </NavItem>
  );
};

type GatewayItemProps = {
  item: types.NavItem;
};
