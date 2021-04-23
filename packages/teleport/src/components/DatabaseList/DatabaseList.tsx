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

import React from 'react';
import styled from 'styled-components';
import {
  Column,
  SortHeaderCell,
  Cell,
  LabelCell,
  TextCell,
  SortTypes,
} from 'design/DataTable';
import Table from 'design/DataTable/Paged';
import isMatch from 'design/utils/match';
import { sortBy } from 'lodash';
import { Database } from 'teleport/services/database';

function DatabaseList(props: Props) {
  const { databases = [], searchValue = '', pageSize = 100 } = props;

  console.log(databases);

  const [sortDir, setSortDir] = React.useState<Record<string, string>>({
    name: SortTypes.DESC,
  });

  function sortAndFilter(search) {
    const filtered = databases.filter(obj =>
      isMatch(obj, search, {
        searchableProps: ['name', 'desc', 'protocol', 'type', 'uri', 'tags'],
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
    <div>
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
          columnKey="desc"
          header={
            <SortHeaderCell
              sortDir={sortDir.desc}
              onSortChange={onSortChange}
              title="Description"
            />
          }
          cell={<TextCell />}
        />
        <Column
          columnKey="protocol"
          header={
            <SortHeaderCell
              sortDir={sortDir.protocol}
              onSortChange={onSortChange}
              title="Protocol"
            />
          }
          cell={<TextCell />}
        />
        <Column
          columnKey="type"
          header={
            <SortHeaderCell
              sortDir={sortDir.type}
              onSortChange={onSortChange}
              title="Type"
            />
          }
          cell={<TextCell />}
        />
        <Column
          columnKey="uri"
          header={
            <SortHeaderCell
              sortDir={sortDir.uri}
              onSortChange={onSortChange}
              title="URI"
            />
          }
          cell={<TextCell />}
        />
        <Column header={<Cell>Labels</Cell>} cell={<LabelCell />} />
      </StyledTable>
    </div>
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
  if (propName === 'tunnel') {
    return 'TUNNEL'.indexOf(searchValue) !== -1;
  }
}

type Props = {
  databases: Database[];
  pageSize?: number;
  searchValue: string;
};

export default DatabaseList;
