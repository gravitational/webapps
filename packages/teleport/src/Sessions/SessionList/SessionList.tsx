/*
Copyright 2019-2022 Gravitational, Inc.

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
import Table, { Cell } from 'design/DataTable';
import { MenuButton, MenuItem } from 'shared/components/MenuAction';
import cfg from 'teleport/config';
import { Session, Participant } from 'teleport/services/ssh';
import renderTypeCell from './TypeCell';

export default function SessionList(props: Props) {
  const { sessions, pageSize = 100 } = props;

  return (
    <StyledTable
      data={sessions}
      columns={[
        {
          key: 'kind',
          headerText: 'Session Type',
          render: renderTypeCell,
        },
        {
          key: 'sid',
          headerText: 'Session ID',
        },
        {
          altKey: 'users',
          headerText: 'Users',
          render: renderUsersCell,
        },
        {
          key: 'durationText',
          altSortKey: 'created',
          headerText: 'Duration',
          isSortable: true,
          onSort: (a, b) => b - a,
        },
        {
          altKey: 'options-btn',
          render: renderActionCell,
        },
      ]}
      emptyText="No Active Sessions Found"
      pagination={{ pageSize }}
      customSearchMatchers={[participantMatcher]}
      isSearchable
      searchableProps={[
        'addr',
        'sid',
        'clusterId',
        'serverId',
        'hostname',
        'parties',
        'durationText',
        'login',
        'created',
        'parties',
      ]}
    />
  );
}

function renderActionCell({ sid, clusterId, kind }: Session) {
  const url = cfg.getSshSessionRoute({ sid, clusterId });

  return (
    <Cell align="right" height="26px">
      {kind === 'ssh' ? (
        <MenuButton>
          <MenuItem as="a" href={url} target="_blank">
            Join Session
          </MenuItem>
        </MenuButton>
      ) : null}
    </Cell>
  );
}

function renderUsersCell({ parties }: Session) {
  const users = parties.map(({ user }) => `${user}`).join(', ');
  return <Cell>{users}</Cell>;
}

type Props = {
  sessions: Session[];
  pageSize?: number;
};

function participantMatcher(
  targetValue: any,
  searchValue: string,
  propName: keyof Session & string
) {
  if (propName === 'parties') {
    return targetValue.some((participant: Participant) => {
      return participant.user.toLocaleUpperCase().includes(searchValue);
    });
  }
}

const StyledTable = styled(Table)`
  tbody > tr > td {
    vertical-align: middle;
  }
` as typeof Table;
