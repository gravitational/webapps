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
import { ButtonBorder, Text } from 'design';
import Table, { Cell } from 'design/DataTableNext';
import { displayDate } from 'shared/services/loc';
import { MfaDevice } from 'teleport/services/mfa/types';

export default function MfaDeviceList({
  devices = [],
  remove,
  mostRecentDevice,
  mfaDisabled = false,
  isSearchable = false,
  style,
}: Props) {
  return (
    <StyledTable
      data={devices}
      style={style}
      columns={[
        {
          key: 'description',
          headerText: 'Type',
        },
        {
          key: 'name',
          headerText: 'Device Name',
          render: ({ name }) => <NameCell name={name} />,
        },
        {
          key: 'registeredDate',
          headerText: 'Registered',
          isSortable: true,
          render: ({ registeredDate }) => (
            <Cell>{displayDate(registeredDate)}</Cell>
          ),
        },
        {
          key: 'lastUsedDate',
          headerText: 'Last Used',
          isSortable: true,
          render: ({ lastUsedDate }) => (
            <Cell>{displayDate(lastUsedDate)}</Cell>
          ),
        },
        {
          altKey: 'remove-btn',
          render: ({ id, name }) => (
            <RemoveCell
              id={id}
              name={name}
              remove={remove}
              mostRecentDevice={mostRecentDevice}
              mfaDisabled={mfaDisabled}
            />
          ),
        },
      ]}
      emptyText="No Devices Found"
      isSearchable={isSearchable}
      initialSort={{
        key: 'registeredDate',
        dir: 'DESC',
      }}
    />
  );
}

const NameCell = ({ name }: { name: string }) => {
  return (
    <Cell title={name}>
      <Text
        style={{
          maxWidth: '96px',
          whiteSpace: 'nowrap',
        }}
      >
        {name}
      </Text>
    </Cell>
  );
};

const RemoveCell = ({
  id,
  name,
  remove,
  mostRecentDevice,
  mfaDisabled,
}: {
  id: string;
  name: string;
  remove: ({ id, name }) => void;
  mostRecentDevice: MfaDevice;
  mfaDisabled: boolean;
}) => {
  if (id === mostRecentDevice?.id) {
    return null;
  }

  return (
    <Cell align="right">
      <ButtonBorder
        size="small"
        onClick={() => remove({ id, name })}
        disabled={mfaDisabled}
        title={mfaDisabled ? 'Two-factor authentication is disabled' : ''}
      >
        Remove
      </ButtonBorder>
    </Cell>
  );
};

type Props = {
  devices: MfaDevice[];
  remove({ id, name }: { id: string; name: string }): void;
  mostRecentDevice?: MfaDevice;
  mfaDisabled?: boolean;
  isSearchable?: boolean;
  [key: string]: any;
};

const StyledTable = styled(Table)`
  & > tbody > tr {
    td {
      vertical-align: middle;
      height: 32px;
    }
  }
` as typeof Table;
