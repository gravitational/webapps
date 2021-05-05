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
import { Flex, ButtonPrimary } from 'design';
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
import InputSearch from 'teleport/components/InputSearch';
import { Database } from 'teleport/services/databases';
import ConnectDatabase from 'teleport/Databases/ConnectDatabase';

function DatabaseList(props: Props) {
  const { databases = [], pageSize = 20, user, clusterId } = props;

  const [sortDir, setSortDir] = useState<Record<string, string>>({
    name: SortTypes.DESC,
  });

  const [searchValue, setSearchValue] = useState<string>('');

  const [dbConnectInfo, setDbConnectInfo] = useState<DbInfo>(undefined);

  function sortAndFilter(search) {
    const filtered = databases.filter(obj =>
      isMatch(obj, search, {
        searchableProps: ['name', 'desc', 'title', 'tags'],
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
      <Flex
        mb={4}
        alignItems="center"
        flex="0 0 auto"
        justifyContent="space-between"
      >
        <InputSearch
          mr="3"
          onChange={e => {
            setSearchValue(e);
          }}
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
          columnKey="title"
          header={
            <SortHeaderCell
              sortDir={sortDir.title}
              onSortChange={onSortChange}
              title="Type"
            />
          }
          cell={<TextCell />}
        />
        <Column header={<Cell>Labels</Cell>} cell={<LabelCell />} />
        <Column
          header={<Cell />}
          cell={<ConnectDBButton setDbConnectInfo={setDbConnectInfo} />}
        />
      </StyledTable>
      {dbConnectInfo && (
        <ConnectDatabase
          user={user}
          clusterId={clusterId}
          dbConnectInfo={dbConnectInfo}
          onClose={() => setDbConnectInfo(undefined)}
        />
      )}
    </>
  );
}

function LabelCell(props) {
  const { rowIndex, data } = props;
  const { tags = [] } = data[rowIndex];
  return renderLabelCell(tags);
}

function ConnectDBButton(props) {
  const { setDbConnectInfo, rowIndex, data } = props;
  const { name, protocol } = data[rowIndex];

  return (
    <Cell align="right">
      <ButtonPrimary
        size="small"
        onClick={() => {
          setDbConnectInfo({ name, protocol });
        }}
      >
        Connect
      </ButtonPrimary>
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

type Props = {
  databases: Database[];
  pageSize?: number;
  user: string;
  clusterId: string;
};

export type DbInfo = {
  name: string;
  protocol: 'mysql' | 'postgres';
};

export default DatabaseList;
