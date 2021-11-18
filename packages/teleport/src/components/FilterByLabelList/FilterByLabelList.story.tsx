/**
 * Copyright 2021 Gravitational, Inc.
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

import React from 'react';
import { MemoryRouter } from 'react-router';
import { Column, Cell, TextCell, renderLabelCell } from 'design/DataTable';
import Table from 'design/DataTable/Paged';
import FilterableList from './FilterByLabelList';

export default {
  title: 'Teleport/FilterByLabelList',
};

export const Sample0 = () => (
  <MemoryRouter initialEntries={['']}>
    <FilterableList data={list} TableComponent={SampleList} />
  </MemoryRouter>
);

export const Sample1 = () => (
  <MemoryRouter initialEntries={[`nodes?labels=env%3A%20prod`]}>
    <FilterableList data={list} TableComponent={SampleList} />
  </MemoryRouter>
);

export const Sample2 = () => (
  <MemoryRouter
    initialEntries={[`nodes?labels=env%3A%20prod,country%3A%20France`]}
  >
    <FilterableList data={list} TableComponent={SampleList} />
  </MemoryRouter>
);

const SampleList = props => {
  const tableProps = { data: props.data };
  return (
    <Table {...tableProps}>
      <Column columnKey="name" header={<Cell>Name</Cell>} cell={<TextCell />} />
      <Column header={<Cell>Labels</Cell>} cell={<LabelCell />} />
    </Table>
  );
};

function LabelCell(props) {
  const { rowIndex, data } = props;
  const { tags = [] } = data[rowIndex];
  return renderLabelCell(tags);
}

const list = [
  {
    name: 'Randall Hines',
    tags: ['country: Italy', 'owner: username05', 'env: prod'],
  },
  {
    name: 'Fanny Bryant',
    tags: ['country: South Korea', 'owner: username10', 'env: dev'],
  },
  {
    name: 'Max Williams',
    tags: ['country: France', 'owner: username07', 'env: prod'],
  },
  {
    name: 'Sophia Lloyd',
    tags: ['country: USA', 'owner: username03', 'env: dev'],
  },
];
