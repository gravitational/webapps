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

import React from 'react';
import { ButtonBorder } from 'design';
import Table, { Cell, TextCell } from 'design/DataTableNext';
import { displayDateTime } from 'shared/services/loc';
import cfg from 'teleport/config';
import { Recording } from 'teleport/services/recordings';
import { State } from './useRecordings';

export default function RecordingsList(props: Props) {
  const {
    recordings = [],
    clusterId,
    pageSize = 50,
    fetchMore,
    fetchStatus,
  } = props;

  return (
    <Table
      data={recordings}
      columns={[
        {
          key: 'hostname',
          headerText: 'Node',
        },
        {
          key: 'users',
          headerText: 'User(s)',
          render: ({ users }) => (
            <Cell style={{ wordBreak: 'break-word' }}>{users}</Cell>
          ),
        },
        {
          key: 'duration',
          headerText: 'Duration',
          isSortable: true,
          render: ({ durationText }) => <TextCell data={durationText} />,
        },
        {
          key: 'createdDate',
          headerText: 'Created',
          isSortable: true,
          render: ({ createdDate }) => (
            <Cell>{displayDateTime(createdDate)}</Cell>
          ),
        },
        {
          key: 'sid',
          headerText: 'Session ID',
        },
        {
          altKey: 'play-btn',
          render: recording => renderPlayCell(recording, clusterId),
        },
      ]}
      emptyText="No Recordings Found"
      pagination={{ pageSize }}
      fetching={{ onFetchMore: fetchMore, fetchStatus }}
      initialSort={{
        key: 'createdDate',
        dir: 'DESC',
      }}
      isSearchable
    />
  );
}

const renderPlayCell = ({ description, sid }: Recording, clusterId: string) => {
  if (description !== 'play') {
    return (
      <Cell align="right" style={{ color: '#9F9F9F' }}>
        {description}
      </Cell>
    );
  }

  const url = cfg.getPlayerRoute({ clusterId, sid });
  return (
    <Cell align="right">
      <ButtonBorder
        kind="primary"
        as="a"
        href={url}
        width="80px"
        target="_blank"
        size="small"
      >
        Play
      </ButtonBorder>
    </Cell>
  );
};

type Props = {
  pageSize?: number;
  recordings: State['recordings'];
  clusterId: State['clusterId'];
  fetchMore: State['fetchMore'];
  fetchStatus: State['fetchStatus'];
};
