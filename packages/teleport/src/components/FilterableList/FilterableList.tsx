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
import SelectFilter from 'teleport/components/SelectFilter';
import { Option } from 'shared/components/Select';

export default function FilterableList({
  data = [],
  TableComponent,
  ...tableProps
}: Props) {
  const { search, pathname } = useLocation();
  const queryTagOptions = useMemo<Option[]>(() => {
    const searchParams = new URLSearchParams(search);
    const query = searchParams.get('labels');
    if (!query || query === 'null') {
      return [];
    }

    return decodeURIComponent(query)
      .split(',')
      .map(tag => ({ value: tag, label: tag }));
  }, []);

  const tagOptions = useMemo<Option[]>(() => makeTagOptions(data), []);
  const [selectedTags, setSelectedTags] = useState<Option[]>(queryTagOptions);
  const [filteredData, setFilteredData] = useState(() => {
    if (queryTagOptions.length > 0) {
      return filterData(data, queryTagOptions);
    }
    return data;
  });

  function onFilterApply(tags: Option[]) {
    const filtered = filterData(data, tags);

    setFilteredData(filtered);
    setSelectedTags(tags);
    updateUrlQuery(tags, pathname);
  }

  function onLabelClick(label: string) {
    let tagsCopy = selectedTags;
    const foundTagIndex = selectedTags.findIndex(tag => tag.value === label);

    if (foundTagIndex > -1) {
      // remove existing tag
      tagsCopy.splice(foundTagIndex, 1);
    } else {
      tagsCopy = [...selectedTags, { value: label, label }];
    }

    onFilterApply(tagsCopy);
  }

  return (
    <>
      <SelectFilter
        options={tagOptions}
        onFilterApply={onFilterApply}
        currFilters={selectedTags}
      />
      <TableComponent
        {...tableProps}
        data={filteredData}
        onLabelClick={onLabelClick}
      />
    </>
  );
}

function filterData(data = [], tags: Option[] = []) {
  return data.filter(obj =>
    tags.every(tag => obj.tags.toString().includes(tag.value))
  );
}

function updateUrlQuery(filters: Option[], pathname = '') {
  if (filters.length === 0) {
    window.history.replaceState(null, null, `${pathname}`);
  }

  const labels = filters.map(f => f.value).join(',');
  window.history.replaceState(
    null,
    null,
    `${pathname}?labels=${encodeURIComponent(labels)}`
  );
}

function makeTagOptions(data = []): Option[] {
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
    .sort()
    .map(t => ({ value: t, label: t }));
}

type Props = {
  data: any[];
  TableComponent: React.ElementType;
  // Accepts anything else passed in props.
  [key: string]: any;
};
