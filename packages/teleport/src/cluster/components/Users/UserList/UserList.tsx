/**
 * Copyright 2020 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from 'react';
import { sortBy } from 'lodash';

import { Flex, Label } from 'design';
import {
  Cell,
  Column,
  TextCell,
  SortHeaderCell,
  SortTypes,
} from 'design/DataTable';
import PagedTable from 'design/DataTable/Paged';
import isMatch from 'design/utils/match';

import { MenuButton, MenuItem } from 'shared/components/MenuAction';
import { displayDateTime } from 'shared/services/loc';
import InputSearch from 'teleport/components/InputSearch';
import { StoredUser } from 'teleport/services/user';

/**
 * UserList renders the table portions and display columns
 * with user information.
 */
const UserList = ({ users, pageSize, onView }: Props) => {
  const [searchValue, setSearchValue] = useState('');

  // Sort by recently created users.
  // We use ascend here first, which will then reverse it on first run.
  // Ideally we should change the root direction (Table) but that may
  // cause regression bugs.
  const [sort, setSort] = useState<Record<string, string>>({
    key: 'created',
    dir: SortTypes.ASC,
  });

  function onSortChange(key: string, dir: string) {
    setSort({ key, dir });
  }

  function onSearchChange(value: string) {
    setSearchValue(value);
  }

  function sortAndFilter(searchValue: string) {
    // Filter by search value.
    const searchableProps = ['name', 'roles', 'created'];
    const filtered = users.filter(user =>
      isMatch(user, searchValue, { searchableProps, cb: filterCB })
    );

    // Apply sorting to filtered list.
    const sorted = sortBy(filtered, sort.key);
    if (sort.dir === SortTypes.ASC) {
      return sorted.reverse();
    }

    return sorted;
  }

  function filterCB(target: any[], searchValue: string, prop: string) {
    // Allow searching by date how users sees it on table.
    if (prop === 'created') {
      const date = displayDateTime(target);
      return date.indexOf(searchValue) !== -1;
    }
  }

  const data = sortAndFilter(searchValue);
  const tableProps = { pageSize, data };

  return (
    <div>
      <Flex mb={4}>
        <InputSearch height="30px" mr="3" onChange={onSearchChange} />
      </Flex>
      <PagedTable {...tableProps}>
        <Column
          columnKey="name"
          cell={<TextCell />}
          header={
            <SortHeaderCell
              sortDir={sort.key === 'name' ? sort.dir : null}
              onSortChange={onSortChange}
              title="Username"
            />
          }
        />
        <Column
          columnKey="roles"
          cell={<RolesCell />}
          header={
            <SortHeaderCell
              sortDir={sort.key === 'roles' ? sort.dir : null}
              onSortChange={onSortChange}
              title="Roles"
            />
          }
        />
        <Column
          columnKey="created"
          cell={<CreatedCell />}
          header={
            <SortHeaderCell
              sortDir={sort.key === 'created' ? sort.dir : null}
              onSortChange={onSortChange}
              title="Created"
            />
          }
        />
        <Column header={<Cell />} cell={<ActionCell onView={onView} />} />
      </PagedTable>
    </div>
  );
};
export default UserList;

const ActionCell = props => {
  const { rowIndex, data, onView } = props;
  return (
    <Cell align="right">
      <MenuButton>
        <MenuItem onClick={() => onView(data[rowIndex])}>View</MenuItem>
      </MenuButton>
    </Cell>
  );
};

const CreatedCell = props => {
  const { rowIndex, data } = props;
  const { created } = data[rowIndex];

  return <Cell>{displayDateTime(created)}</Cell>;
};

const RolesCell = props => {
  const { rowIndex, data } = props;
  const { roles } = data[rowIndex];
  const $roles = roles.sort().map(role => (
    <Label mb="1" mr="1" key={role} kind="secondary">
      {role}
    </Label>
  ));

  return <Cell>{$roles}</Cell>;
};

type Props = {
  users: StoredUser[];
  pageSize: number;
  onView: (user: StoredUser) => void;
};
