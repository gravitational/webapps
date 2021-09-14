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
import Expander, { ExpanderHeader, ExpanderContent } from './../Expander';
import { Item } from './../useNavigator';
import NavItem from './../NavItem';
import StatusIndicator from './StatusIndicator';

const ExpanderGateways: React.FC<Props> = props => {
  const $items = props.items.map(i => <GateWayItem key={i.id} item={i} />);

  return (
    <Expander>
      <ExpanderHeader>
        <Flex justifyContent="space-between" flex="1" width="100%">
          <Text typography="h4">Gateways</Text>
          <ButtonIcon color="text.placeholder">
            <Icons.Add />
          </ButtonIcon>
        </Flex>
      </ExpanderHeader>
      <ExpanderContent>{$items}</ExpanderContent>
    </Expander>
  );
};

const GateWayItem: React.FC<GatewayItemProps> = props => {
  return (
    <NavItem pl={5}>
      <StatusIndicator ml={-1} mr={3} status="connected" />
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flex="1"
        width="100%"
      >
        {props.item.title}
        <ButtonIcon color="text.placeholder">
          <Icons.VideoGame />
        </ButtonIcon>
      </Flex>
    </NavItem>
  );
};

type Props = {
  items: Item[];
};

type GatewayItemProps = {
  item: Item;
};

export default ExpanderGateways;
