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
import { Label } from 'design';
import { Cell } from 'design/DataTable';
import { makeLabelTag } from 'teleport/components/formatters';
import { Label as LabelType, Filter } from 'teleport/types';

export default function LabelFilterCell({ labels, onLabelClick }: Props) {
  const $labels = labels.map(label => {
    const labelTxt = makeLabelTag(label);
    const filter: Filter = {
      name: label.name,
      value: label.value,
      kind: 'label',
    };

    return (
      <Label
        mb="1"
        mr="1"
        key={labelTxt}
        kind="secondary"
        onClick={onLabelClick ? () => onLabelClick(filter) : null}
        style={onLabelClick ? { cursor: 'pointer' } : null}
      >
        {labelTxt}
      </Label>
    );
  });

  return <Cell>{$labels}</Cell>;
}

type Props = {
  labels: LabelType[];
  onLabelClick(filter: Filter): void;
};
