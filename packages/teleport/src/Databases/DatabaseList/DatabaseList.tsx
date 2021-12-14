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
import { ButtonBorder } from 'design';
import {
  Column,
  SortHeaderCell,
  Cell,
  TextCell,
  SortTypes,
} from 'design/DataTable';
import Table from 'design/DataTable/Paged';
import isMatch from 'design/utils/match';
import { AuthType } from 'teleport/services/user';
import { Database, DbProtocol } from 'teleport/services/databases';
import { makeLabelTag } from 'teleport/components/formatters';
import LabelFilterCell from 'teleport/components/LabelFilterCell';
import { Filter } from 'teleport/types';
import ConnectDialog from 'teleport/Databases/ConnectDialog';

function DatabaseList(props: Props) {
  const {
    databases = [],
    pageSize = 100,
    username,
    clusterId,
    authType,
    search,
    onSearchChange,
    onLabelClick,
  } = props;

  const [sortDir, setSortDir] = useState<Record<string, string>>({
    name: SortTypes.DESC,
  });

  const [dbConnectInfo, setDbConnectInfo] = useState<{
    name: string;
    protocol: DbProtocol;
  }>(null);

  function sortAndFilter(search) {
    const filtered = databases.filter(obj =>
      isMatch(obj, search, {
        searchableProps: ['name', 'desc', 'title', 'labels'],
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

  const data = sortAndFilter(search);

  return (
    <>
      <StyledTable
        pageSize={pageSize}
        data={data}
        search={search}
        onSearchChange={onSearchChange}
      >
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
        <Column
          header={<Cell>Labels</Cell>}
          cell={<LabelCell onLabelClick={onLabelClick} />}
        />
        <Column
          header={<Cell />}
          cell={<ConnectButton setDbConnectInfo={setDbConnectInfo} />}
        />
      </StyledTable>
      {dbConnectInfo && (
        <ConnectDialog
          username={username}
          clusterId={clusterId}
          dbName={dbConnectInfo.name}
          dbProtocol={dbConnectInfo.protocol}
          onClose={() => setDbConnectInfo(null)}
          authType={authType}
        />
      )}
    </>
  );
}

function LabelCell(props) {
  const { rowIndex, data, onLabelClick } = props;
  const { labels = [] } = data[rowIndex];
  return <LabelFilterCell labels={labels} onLabelClick={onLabelClick} />;
}

function ConnectButton(props) {
  const { setDbConnectInfo, rowIndex, data } = props;
  const { name, protocol } = data[rowIndex];

  return (
    <Cell align="right">
      <ButtonBorder
        size="small"
        onClick={() => {
          setDbConnectInfo({ name, protocol });
        }}
      >
        Connect
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
  if (propName === 'labels') {
    return targetValue.some(label => {
      return (
        makeLabelTag(label).toLocaleUpperCase().indexOf(searchValue) !== -1
      );
    });
  }
}

type Props = {
  databases: Database[];
  pageSize?: number;
  username: string;
  clusterId: string;
  authType: AuthType;
  search: string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
  onLabelClick(filter: Filter): void;
};

export default DatabaseList;
