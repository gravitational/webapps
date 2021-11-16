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
import { Box, ButtonIcon } from 'design';
import { Document } from '../types';

export default function TabsContainer(props: Props) {
  return <Tabs {...props} />;
}

export function Tabs(props: Props) {
  const {
    items,
    parties,
    activeTab,
    onSelect,
    onClose,
    onNew,
    disableNew,
    ...styledProps
  } = props;

  const $items = items
    .filter(i => i.kind !== 'blank')
    .map(i => {
      const active = i.uri === activeTab;
      return (
        <TabItem
          name={i.title}
          key={i.uri}
          users={[]}
          active={active}
          onClick={() => onSelect(i)}
          onClose={() => onClose(i)}
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
      {$items}
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
  [index: string]: any;
};

const StyledTabs = styled(Box)`
  min-height: 32px;
  border-radius: 4px;
  display: flex;
  flex-wrap: no-wrap;
  align-items: center;
  flex-shrink: 0;
  overflow: hidden;
  ${typography}
`;
