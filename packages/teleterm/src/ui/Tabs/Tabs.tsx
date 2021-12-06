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
import { typography } from 'design/system';
import TabItem from './TabItem';
import * as Icons from 'design/Icon';
import { Box, ButtonIcon, Flex } from 'design';
import { Document } from '../types';

export default function TabsContainer(props: Props) {
  return <Tabs {...props} />;
}

export function Tabs(props: Props) {
  const {
    items,
    activeTab,
    onSelect,
    onClose,
    onNew,
    disableNew,
    onMoved,
    ...styledProps
  } = props;

  const $items = items
    .map((item, index) => ({ item, index }))
    .filter(i => i.item.kind !== 'blank')
    .map(({ item, index }) => {
      const active = item.uri === activeTab;
      return (
        <TabItem
          index={index}
          name={item.title}
          key={item.uri}
          users={[]}
          active={active}
          onClick={() => onSelect(item)}
          onClose={() => onClose(item)}
          onMoved={onMoved}
          style={{
            flex: '1',
            flexBasis: '0',
            flexGrow: '1',
          }}
        />
      );
    });

  return (
    <StyledTabs
      as="nav"
      typography="h5"
      color="text.secondary"
      bold
      {...styledProps}
    >
      <Flex flex="1">{$items}</Flex>
      {$items.length > 0 && (
        <ButtonIcon
          ml="2"
          size={0}
          disabled={disableNew}
          title="New Tab"
          onClick={onNew}
        >
          <Icons.Add fontSize="16px" />
        </ButtonIcon>
      )}
    </StyledTabs>
  );
}

type Props = {
  items: Document[];
  activeTab: string;
  disableNew: boolean;
  onNew: () => void;
  onSelect: (doc: Document) => void;
  onMoved: (oldIndex: number, newIndex: number) => void;
  [index: string]: any;
};

const StyledTabs = styled(Box)`
  min-height: 32px;
  border-radius: 4px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  flex-shrink: 0;
  overflow: hidden;
  ${typography}
`;
