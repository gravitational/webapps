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
  TextCell,
  Cell,
  SortTypes,
} from 'design/DataTable';
import Table from 'design/DataTable/Paged';
import isMatch from 'design/utils/match';
import { AuthType } from 'teleport/services/user';
import { Desktop } from 'teleport/services/desktops';
import MenuSshLogin, { LoginItem } from 'shared/components/MenuSshLogin';
import cfg from 'teleport/config';
import { getHostName, getAccessToken } from 'teleport/services/api';

function DesktopList(props: Props) {
  const { desktops = [], pageSize = 100, searchValue, clusterId } = props;

  const [sortDir, setSortDir] = useState<Record<string, string>>({
    name: SortTypes.DESC,
  });

  // TODO(isaiah) socket stuff will be moved
  const socket = React.useRef<WebSocket>();

  function sortAndFilter(search) {
    const filtered = desktops.filter(obj =>
      isMatch(obj, search, {
        searchableProps: ['os', 'addr'],
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

  // This function is inside the component for now in order to access the socket ref.
  function onLoginSelect(
    e: React.MouseEvent,
    login: string,
    desktopUUID: string
  ) {
    const username = login; // TODO: not yet implemented on the backend
    const desktopWsURL = cfg.api.desktopsWsAddr
      .replace(':fqdm', getHostName())
      .replace(':desktopUUID', desktopUUID)
      .replace(':token', getAccessToken())
      .replace(':clusterId', clusterId);

    console.log(desktopWsURL);

    socket.current = new WebSocket(desktopWsURL);
    socket.current.onopen = () => {
      console.log('websocket opened');
      // eslint-disable-next-line no-constant-condition
      // while (true) {
      //   sendScreenSize();
      // }
      sendUsernameAdministrator();
      sendScreenSize();
      // socket.current.close();
    };
    socket.current.onmessage = ev => {
      // console.log('websocket message received!!!!');
      console.log('websocket message recieved: ' + ev.data);
    };
    socket.current.onclose = () => {
      console.log('websocket closed');
    };

    e.preventDefault();
  }

  function sendScreenSize() {
    if (socket.current === undefined) {
      return;
    }
    const w = 1600;
    const h = 1200;
    const buffer = new ArrayBuffer(9);
    const view = new DataView(buffer);
    view.setUint8(0, 1);
    view.setUint32(1, w);
    view.setUint32(5, h);
    console.log('canvas size: ', w, h);
    socket.current.send(buffer);
  }

  function sendUsernameAdministrator() {
    if (socket.current === undefined) {
      return;
    }

    // Encode username to utf8
    let encoder = new TextEncoder();
    const usernameUtf8array = encoder.encode('Administrator');

    const bufLen = 1 + 4 + usernameUtf8array.length;
    const buffer = new ArrayBuffer(bufLen);
    const view = new DataView(buffer);
    let offset = 0;

    // set data
    view.setUint8(offset++, 7);
    view.setUint32(offset, usernameUtf8array.length);
    offset += 4; // 4 bytes to offset 32-bit uint
    usernameUtf8array.forEach(byte => {
      view.setUint8(offset++, byte);
    });

    socket.current.send(buffer);
  }

  return (
    <StyledTable pageSize={pageSize} data={data}>
      <Column
        columnKey="addr"
        header={
          <SortHeaderCell
            sortDir={sortDir.name}
            onSortChange={onSortChange}
            title="Domain"
          />
        }
        cell={<TextCell />}
      />
      <Column
        columnKey="os"
        header={
          <SortHeaderCell
            sortDir={sortDir.desc}
            onSortChange={onSortChange}
            title="Operating System"
          />
        }
        cell={<OSCell />}
      />
      <Column
        header={<Cell />}
        cell={<LoginCell onOpen={onOpen} onSelect={onLoginSelect} />}
      />
    </StyledTable>
  );
}

const OSCell = props => {
  const { rowIndex, data, columnKey, ...rest } = props;
  var osText =
    data[rowIndex][columnKey] === 'windows' ? 'Windows' : 'Unknown OS';
  return <Cell {...rest}>{osText}</Cell>;
};

const StyledTable = styled(Table)`
  & > tbody > tr > td {
    vertical-align: baseline;
  }
`;

// TODO: may be able to be abstracted out from here/NodeList.tsx
const LoginCell: React.FC<Required<{
  onSelect?: (e: React.SyntheticEvent, login: string, serverId: string) => void;
  onOpen: (serverUuid: string) => LoginItem[];
  [key: string]: any;
}>> = props => {
  const { rowIndex, data, onOpen, onSelect } = props;
  const { name } = data[rowIndex] as Desktop;
  const serverUuid = name;
  function handleOnOpen() {
    return onOpen(serverUuid);
  }

  function handleOnSelect(e: React.SyntheticEvent, login: string) {
    if (!onSelect) {
      return [];
    }

    return onSelect(e, login, serverUuid);
  }

  return (
    <Cell align="right">
      <MenuSshLogin
        onOpen={handleOnOpen}
        onSelect={handleOnSelect}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      />
    </Cell>
  );
};

// TODO may need to come from state, for now user can just type
// anything in and hit enter
function onOpen(serverUuid: string): LoginItem[] {
  return [];
}

// TODO(isaiah): not sure how this works, copied from databases.
// Probably is correct once we add labels (tags).
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
  desktops: Desktop[];
  pageSize?: number;
  username: string;
  clusterId: string;
  authType: AuthType;
  searchValue: string;
};

export default DesktopList;
