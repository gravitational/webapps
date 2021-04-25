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
import {
  Column,
  SortHeaderCell,
  Cell,
  TextCell,
  SortTypes,
} from 'design/DataTable';
import { Label } from 'design'
import Table from 'design/DataTable/Paged';
import isMatch from 'design/utils/match';
import { sortBy } from 'lodash';
import { Kube } from 'teleport/services/kube';

function KubeList(props: Props) {
  const { kubes = [], searchValue = '', pageSize = 100 } = props;

  const [sortDir, setSortDir] = React.useState<Record<string, string>>({
    name: SortTypes.DESC,
  });

  function sortAndFilter(search) {
    const filtered = kubes.filter(obj =>
      isMatch(obj, search, {
        searchableProps: ['name'],
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
        <Column header={<Cell>Labels</Cell>} cell={<LabelCell />} />
      </StyledTable>
  );
}

export function LabelCell(props) {
    const { rowIndex, data } = props;
    const { labels } = data[rowIndex];
    const $labels = labels.map(({ name, value }) => (
      <Label mb="1" mr="1" key={name} kind="secondary">
        {`${name}: ${value}`}
      </Label>
    ));

    return <Cell>{$labels}</Cell>;
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
  kubes: Kube[];
  pageSize?: number;
  searchValue: string;
};

export default KubeList;