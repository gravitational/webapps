import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { sortBy } from 'lodash';
import { ButtonBorder, Text } from 'design';
import {
  Column,
  SortHeaderCell,
  Cell,
  TextCell,
  SortTypes,
  Table,
} from 'design/DataTable';
import { MfaDevice } from 'teleport/services/mfa/types';

export default function MfaDeviceList({
  devices = [],
  onDelete,
  isRecoveryFlow,
}: Props) {
  const [sortDir, setSortDir] = useState<Record<string, string>>({
    registeredDate: SortTypes.ASC,
  });

  const mostRecentDevice = useMemo(() => sort(devices)[0], []);

  function sort(data) {
    const columnKey = Object.getOwnPropertyNames(sortDir)[0];
    const sorted = sortBy(data, columnKey);
    if (sortDir[columnKey] === SortTypes.ASC) {
      return sorted.reverse();
    }

    return sorted;
  }

  function onSortChange(columnKey: string, sortDir: string) {
    setSortDir({ [columnKey]: sortDir });
  }

  const data = sort(devices);

  return (
    <StyledTable
      data={data}
      style={isRecoveryFlow ? { overflow: 'hidden', borderRadius: '8px' } : {}}
    >
      <Column columnKey="type" cell={<TextCell />} header={<Cell>Type</Cell>} />
      <Column
        columnKey="name"
        cell={<NameCell />}
        header={<Cell>Device Name</Cell>}
      />
      <Column
        columnKey="registeredDate"
        header={
          <SortHeaderCell
            sortDir={sortDir.registeredDate}
            onSortChange={onSortChange}
            title="Registered"
          />
        }
        cell={<DateCell />}
      />
      <Column
        columnKey="lastUsedDate"
        header={
          <SortHeaderCell
            sortDir={sortDir.lastUsedDate}
            onSortChange={onSortChange}
            title="Last Used"
          />
        }
        cell={<DateCell />}
      />
      <Column
        header={<Cell />}
        cell={
          <DeleteDeviceBtn
            onDelete={onDelete}
            mostRecentDevice={mostRecentDevice}
            isRecoveryFlow={isRecoveryFlow}
          />
        }
      />
    </StyledTable>
  );
}

const NameCell = props => {
  const { data, rowIndex } = props;
  const { name } = data[rowIndex];

  return (
    <Cell>
      <Text style={{ maxWidth: '12ch' }} title={name}>
        {name}
      </Text>
    </Cell>
  );
};

const DateCell = props => {
  const { data, rowIndex, columnKey } = props;
  const dateText = data[rowIndex][`${columnKey}Text`];

  return <Cell>{dateText}</Cell>;
};

const DeleteDeviceBtn = props => {
  const { data, rowIndex, onDelete, mostRecentDevice, isRecoveryFlow } = props;
  const { id, name } = data[rowIndex];

  if (id === mostRecentDevice.id && isRecoveryFlow) {
    return null;
  }

  return (
    <Cell align="right">
      <ButtonBorder size="small" onClick={() => onDelete({ id, name })}>
        Remove
      </ButtonBorder>
    </Cell>
  );
};

type Props = {
  devices: MfaDevice[];
  onDelete({ id, name }: { id: string; name: string }): void;
  // Whether this list is being shown in the recovery flow as opposed to in the account dashboard
  isRecoveryFlow: boolean;
};

const StyledTable = styled(Table)`
  & > tbody > tr {
    td {
      vertical-align: middle;
      height: 32px;
    }
  }
`;
