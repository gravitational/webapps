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
} from 'design/DataTable';
import { Label } from 'design'
import Table from 'design/DataTable/Paged';
import { Kube } from 'teleport/services/kube';

type Props = {
    kubes: Kube[];
    pageSize?: number;
};

function KubeList(props: Props) {
  const { kubes = [], pageSize = 100 } = props;

  return (
    <StyledTable pageSize={pageSize} data={kubes}>
    <Column
      columnKey="name"
      header={
        <SortHeaderCell
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

export default KubeList;