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

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { typography } from 'design/system';
import { Box, ButtonIcon } from 'design';
import * as Icons from 'design/Icon';
import { Document } from 'teleterm/ui/services/workspacesService';
import { TabItem } from './TabItem';

export function Tabs(props: Props) {
  const {
    items,
    activeTab,
    onSelect,
    onClose,
    onNew,
    disableNew,
    onMoved,
    onContextMenu,
    ...styledProps
  } = props;

  const $items = items.map((item, index) => {
    const active = item.uri === activeTab;
    return (
      <Fragment key={item.uri}>
        <TabItem
          index={index}
          name={item.title}
          active={active}
          onClick={() => onSelect(item)}
          onClose={() => onClose(item)}
          onContextMenu={() => onContextMenu(item)}
          onMoved={onMoved}
          style={{
            flex: '1',
            flexBasis: '0',
            flexGrow: '1',
          }}
        />
        <Separator />
      </Fragment>
    );
  });

  return (
    <StyledTabs
      as="nav"
      typography="h5"
      color="text.placeholder"
      bold
      {...styledProps}
    >
      {$items}
      <ButtonIcon
        ml="2"
        size={0}
        color="light"
        disabled={disableNew}
        title="New Tab"
        onClick={onNew}
      >
        <Icons.Add fontSize="16px" />
      </ButtonIcon>
    </StyledTabs>
  );
}

type Props = {
  items: Document[];
  activeTab: string;
  disableNew: boolean;
  onNew: () => void;
  onSelect: (doc: Document) => void;
  onContextMenu: (doc: Document) => void;
  onMoved: (oldIndex: number, newIndex: number) => void;
  [index: string]: any;
};

const Separator = styled.div`
  height: 23px;
  width: 1px;
  margin: 0 1px;
  background: ${props => props.theme.colors.text.placeholder};
`;

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
