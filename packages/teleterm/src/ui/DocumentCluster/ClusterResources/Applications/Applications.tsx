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

import React, { useState } from 'react';
import styled from 'styled-components';
import { sortBy } from 'lodash';
import { Box, Flex, Text, ButtonBorder } from 'design';
import { Danger } from 'design/Alert';
import Table from 'design/DataTable/Paged';
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
import * as types from 'teleterm/ui/services/clusters/types';
import useApps from './useApps';

export default function Container() {
  const { apps, syncStatus } = useApps();
  return <Applications apps={apps} syncStatus={syncStatus} />;
}

function Applications(props: Props) {
  const { apps = [], syncStatus, pageSize = 100 } = props;
  const [sortDir, setSortDir] = useState<Record<string, string>>({
    name: SortTypes.DESC,
  });

  function sortApps() {
    const columnKey = Object.getOwnPropertyNames(sortDir)[0];
    const sorted = sortBy(apps, columnKey);
    if (sortDir[columnKey] === SortTypes.ASC) {
      return sorted.reverse();
    }

    return sorted;
  }

  function onSortChange(columnKey: string, sortDir: string) {
    setSortDir({ [columnKey]: sortDir });
  }

  const data = sortApps();

  return (
    <StyledApps>
      {syncStatus.status === 'failed' && (
        <Danger>{syncStatus.statusText}</Danger>
      )}
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
          columnKey="description"
          header={
            <SortHeaderCell
              sortDir={sortDir.description}
              onSortChange={onSortChange}
              title="Description"
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
        <Column header={<Cell />} cell={<LaunchButtonCell />} />
      </StyledTable>
    </StyledApps>
  );
}

export const ActionCell = props => {
  const { rowIndex, onViewConnect, data } = props;
  const { name } = data[rowIndex];
  return (
    <Cell align="right">
      <ButtonBorder size="small" onClick={() => onViewConnect(name)}>
        Connect
      </ButtonBorder>
    </Cell>
  );
};

function AppIconCell(props) {
  const { rowIndex, data } = props;
  const { name } = data[rowIndex];
  return (
    <Cell style={{ userSelect: 'none' }}>
      <Flex
        height="32px"
        width="32px"
        bg={getIconColor(name)}
        borderRadius="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize={3} bold caps>
          {name[0]}
        </Text>
      </Flex>
    </Cell>
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

function LaunchButtonCell(props) {
  const { rowIndex, data } = props;
  const { launchUrl } = data[rowIndex];
  return (
    <Cell align="right">
      <ButtonBorder
        as="a"
        width="88px"
        size="small"
        target="_blank"
        href={launchUrl}
        rel="noreferrer"
      >
        LAUNCH
      </ButtonBorder>
    </Cell>
  );
}

type Props = {
  apps: types.tsh.Application[];
  pageSize?: number;
  syncStatus: types.SyncStatus;
};

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

const StyledTable = styled(Table)`
  & > tbody > tr > td {
    vertical-align: baseline;
  }
`;

const StyledApps = styled(Box)`
  flex-direction: column;
  display: flex;
  flex: 1;
  max-width: 1024px;
  ::after {
    content: ' ';
    padding-bottom: 24px;
  }
`;
