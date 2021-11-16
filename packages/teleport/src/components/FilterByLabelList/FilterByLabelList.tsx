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

import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router';
import { Option } from 'shared/components/Select';
import SelectFilter from 'teleport/components/SelectFilter';
import history from 'teleport/services/history';

export default function FilterableList({
  data = [],
  TableComponent,
  ...tableProps
}: Props) {
  const { search, pathname } = useLocation();
  const labelsFromQuery = useMemo<Option[]>(() => {
    const searchParams = new URLSearchParams(search);
    const query = searchParams.get('labels');
    if (!query || query === 'null') {
      return [];
    }

    return decodeURIComponent(query)
      .split(',')
      .map(label => ({ value: label, label }));
  }, []);

  const labels = useMemo<Option[]>(() => makeLabelOptions(data), []);
  const [selectedLabels, setSelectedLabels] = useState<Option[]>(
    labelsFromQuery
  );
  const [filteredData, setFilteredData] = useState(() =>
    filterData(data, labelsFromQuery)
  );

  function onFilterApply(labels: Option[]) {
    const filtered = filterData(data, labels);

    setFilteredData(filtered);
    setSelectedLabels(labels);
    updateUrlQuery(labels, pathname);
  }

  function onLabelClick(label: string) {
    let copy = selectedLabels;
    const index = selectedLabels.findIndex(tag => tag.value === label);

    if (index > -1) {
      // remove the label
      copy.splice(index, 1);
    } else {
      copy = [...selectedLabels, { value: label, label }];
    }

    onFilterApply(copy);
  }

  return (
    <>
      <SelectFilter
        applyFilters={onFilterApply}
        appliedFilters={selectedLabels}
        filters={labels}
      />
      <TableComponent
        {...tableProps}
        data={filteredData}
        onLabelClick={onLabelClick}
      />
    </>
  );
}

function filterData(data = [], labels: Option[] = []) {
  if (labels.length === 0) {
    return data;
  }

  return data.filter(obj =>
    labels.every(label => obj.tags.toString().includes(label.value))
  );
}

function updateUrlQuery(filters: Option[], pathname = '') {
  if (filters.length === 0) {
    history.replace(pathname);
  }

  const labels = filters.map(f => f.value).join(',');
  history.replace(`${pathname}?labels=${encodeURIComponent(labels)}`);
}

function makeLabelOptions(data = []): Option[] {
  // Test a tags field exist.
  if (data.length === 0 || !data[0].tags) {
    return [];
  }

  const tagDict = {};
  data.forEach(({ tags }) => {
    tags.forEach(tag => {
      if (!tagDict[tag]) {
        tagDict[tag] = tag;
      }
    });
  });

  return Object.keys(tagDict)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map(t => ({ value: t, label: t }));
}

export type Props = {
  data: any[];
  TableComponent: React.ElementType;
  // Accepts anything else passed in props which
  // will be passed down to TableComponent.
  [key: string]: any;
};
