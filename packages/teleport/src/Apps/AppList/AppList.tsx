/*
Copyright 2021 Gravitational, Inc.

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

import React, { useState } from 'react';
import styled from 'styled-components';
import { sortBy } from 'lodash';
import { ButtonBorder, Flex, Text } from 'design';
import {
  pink,
  teal,
  cyan,
  blue,
  green,
  orange,
  brown,
  red,
  deepOrange,
  blueGrey,
} from 'design/theme/palette';
import {
  Column,
  SortHeaderCell,
  Cell,
  renderLabelCell,
  TextCell,
  SortTypes,
} from 'design/DataTable';
import Table from 'design/DataTable/Paged';
import isMatch from 'design/utils/match';
import { App } from 'teleport/services/apps';

function AppList(props: Props) {
  const { apps = [], pageSize = 100, searchValue } = props;

  const [sortDir, setSortDir] = useState<Record<string, string>>({
    name: SortTypes.DESC,
  });

  function sortAndFilter(search) {
    const filtered = apps.filter(obj =>
      isMatch(obj, search, {
        searchableProps: ['name', 'publicAddr', 'tags'],
        cb: searchAndFilterCb,
      })
    );

    const columnKey = Object.getOwnPropertyNames(sortDir)[0];
    const sorted = sortBy(filtered, columnKey);
    if (sortDir[columnKey] === SortTypes.ASC) {
      return sorted.reverse();
    }

    return sorted;
  }

  function onSortChange(columnKey: string, sortDir: string) {
    setSortDir({ [columnKey]: sortDir });
  }

  const data = sortAndFilter(searchValue);

  return (
    <StyledTable pageSize={pageSize} data={data}>
      <Column header={<Cell />} cell={<AppIconCell />} />
      <Column
        columnKey="name"
        header={
          <SortHeaderCell
            sortDir={sortDir.name}
            onSortChange={onSortChange}
            title="Name"
          />
        }
        cell={<TextCell />}
      />
      <Column
        columnKey="publicAddr"
        header={
          <SortHeaderCell
            sortDir={sortDir.publicAddr}
            onSortChange={onSortChange}
            title="Address"
          />
        }
        cell={<AddressCell />}
      />
      <Column header={<Cell>Labels</Cell>} cell={<LabelCell />} />
      <Column header={<Cell />} cell={<OpenButton />} />
    </StyledTable>
  );
}

function LabelCell(props) {
  const { rowIndex, data } = props;
  const { tags = [] } = data[rowIndex];
  return renderLabelCell(tags);
}

function AddressCell(props) {
  const { rowIndex, data } = props;
  const { publicAddr } = data[rowIndex];
  return <Cell>https://{publicAddr}</Cell>;
}

function OpenButton(props) {
  const { rowIndex, data } = props;
  const { launchUrl } = data[rowIndex];

  return (
    <Cell align="right">
      <ButtonBorder
        size="small"
        as="a"
        target="_blank"
        href={launchUrl}
        rel="noreferrer"
      >
        OPEN
      </ButtonBorder>
    </Cell>
  );
}

const StyledTable = styled(Table)`
  & > tbody > tr > td {
    vertical-align: baseline;
  }
`;

function searchAndFilterCb(
  targetValue: any[],
  searchValue: string,
  propName: string
) {
  if (propName === 'tags') {
    return targetValue.some(item => {
      return item.toLocaleUpperCase().indexOf(searchValue) !== -1;
    });
  }
}

function AppIconCell(props) {
  const { rowIndex, data } = props;
  const { name } = data[rowIndex];
  return (
    <Cell align="left" style={{ width: '32px' }}>
      <Flex
        height="24px"
        width="24px"
        bg={getIconColor(name)}
        borderRadius="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize={2} bold style={{ userSelect: 'none' }}>
          {name[0]?.toUpperCase()}
        </Text>
      </Flex>
    </Cell>
  );
}

function getIconColor(appName: string) {
  let stringValue = 0;
  for (let i = 0; i < appName.length; i++) {
    stringValue += appName.charCodeAt(i);
  }

  const colors = [
    pink[700],
    teal[700],
    cyan[700],
    blue[700],
    green[700],
    orange[700],
    brown[700],
    red[700],
    deepOrange[700],
    blueGrey[700],
  ];

  return colors[stringValue % 10];
}

type Props = {
  apps: App[];
  pageSize?: number;
  searchValue: string;
};

export default AppList;
