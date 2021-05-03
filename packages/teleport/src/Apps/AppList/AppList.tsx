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
import {
  Column,
  SortHeaderCell,
  Cell,
  TextCell,
  SortTypes,
} from 'design/DataTable';
import { Label, Flex, ButtonBorder } from 'design';
import Table from 'design/DataTable/Paged';
import isMatch from 'design/utils/match';
import { App } from 'teleport/services/apps';
import InputSearch from 'teleport/components/InputSearch';

function AppListt(props: Props) {
  const { apps = [], pageSize = 20 } = props;
  // console.log('apps appListt: ', apps);

  const [sortDir, setSortDir] = useState<Record<string, string>>({
    name: SortTypes.DESC,
  });

  const [searchValue, setSearchValue] = useState('');

  function sortAndFilter(search) {
    const filtered = apps.filter(obj =>
      isMatch(obj, search, {
        searchableProps: ['name', 'publicAddr', 'labels'],
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
    <>
      <Flex flex="0 0 auto" mb={4}>
        <InputSearch
          mr="3"
          onChange={(e: React.SetStateAction<string>) => setSearchValue(e)}
        />
      </Flex>
      <StyledTable pageSize={pageSize} data={data}>
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
          cell={<TextCell />}
        />
        <Column header={<Cell>Labels</Cell>} cell={<LabelCell />} />
        <Column header={<Cell />} cell={<ActionCell />} />
      </StyledTable>
    </>
  );
}

export const ActionCell = props => {
  const { rowIndex, data } = props;
  const { launchUrl } = data[rowIndex];

  return (
    <Cell align="right">
      <ButtonBorder
        size="small"
        as="a"
        href={launchUrl}
        target="_blank"
        width="87px"
      >
        Open
      </ButtonBorder>
    </Cell>
  );
};

function LabelCell(props) {
  const { rowIndex, data } = props;
  const { labels } = data[rowIndex];
  const $labels = labels.map(tag => (
    <Label mb="1" mr="1" key={tag} kind="secondary">
      {tag}
    </Label>
  ));

  return <Cell>{$labels}</Cell>;
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

type Props = {
  apps: App[];
  pageSize?: number;
};

export default AppListt;
