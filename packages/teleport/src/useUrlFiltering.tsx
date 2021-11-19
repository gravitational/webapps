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

import { useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { Option as SelectOption } from 'shared/components/Select';
import { Label, LabelTag, makeResourceTag } from 'teleport/services/resources';
import history from 'teleport/services/history';

// PARAM_FILTER is a url query parameter for filters.
const PARAM_FILTER = '?filter=';

// FILTER_TYPE_LABEL defines a filter type for labels in a url query param.
const FILTER_TYPE_LABEL = 'label:';

export default function useUrlFiltering(data: Data[]) {
  const { search, pathname } = useLocation();
  const tagDict = useMemo<TagDict>(() => makeTagDictionary(data), [data]);
  const labels = useMemo<Option[]>(() => makeLabelOptions(tagDict), [data]);

  const [selectedLabels, setSelectedLabels] = useState<Option[]>(() =>
    getLabelOptionsFromUrl(search)
  );

  const filteredData = useMemo(() => filterData(data, selectedLabels), [
    data,
    selectedLabels,
  ]);

  function onFilterApply(labels: Option[]) {
    setSelectedLabels(labels);
    updateUrlQuery(labels, pathname);
  }

  function onLabelClick(tag: string) {
    let copy = [...selectedLabels];
    const index = selectedLabels.findIndex(l => l.label === tag);

    if (index > -1) {
      // remove the label
      copy.splice(index, 1);
    } else {
      copy = [...selectedLabels, { label: tag, value: tagDict[tag] }];
    }

    onFilterApply(copy);
  }

  return {
    labels,
    selectedLabels,
    filteredData,
    onFilterApply,
    onLabelClick,
  };
}

function getLabelOptionsFromUrl(search: string): Option[] {
  if (!search.startsWith(PARAM_FILTER)) {
    return [];
  }

  const query = search.substring(PARAM_FILTER.length);
  if (!query) {
    return [];
  }

  const filters = query.split('+');
  const options: Option[] = [];

  for (let i = 0; i < filters.length; i++) {
    const filter = filters[i];
    if (!filter) {
      continue;
    }

    if (filter.startsWith(FILTER_TYPE_LABEL)) {
      const encodedLabel = filter.substring(FILTER_TYPE_LABEL.length);
      const [encodedName, encodedValue, more] = encodedLabel.split(',');

      // Abort if more than two values were split (malformed label).
      if (more) {
        return [];
      }

      const label: Label = {
        name: decodeURIComponent(encodedName ?? ''),
        value: decodeURIComponent(encodedValue ?? ''),
      };

      if (!label.name && !label.value) {
        continue;
      }

      options.push({
        label: makeResourceTag(label),
        value: label,
      });

      continue;
    }

    // Abort if undefined filter types found among query.
    return [];
  }

  return options;
}

// filterData returns new list of data that contains the selected labels.
// Return type is relaxed here so it can be passed down to components with
// stricter types.
function filterData(data: Data[] = [], labels: Option[] = []): any[] {
  if (!labels.length) {
    return data;
  }

  return data.filter(obj =>
    labels.every(l => obj.tags.toString().includes(l.label))
  );
}

// updateUrlQuery formats and encodes the selected labels into a
// query format we expect in the URL and updates the URL in place.
//
// Unencoded seperators used in URL:
//  - plus (+): seperates different filters
//  - comma (,): seperates name value pair of a label
//  - colon (:) with name of filter type (ie label:): identifies the filter as a label type
//
// Format of the query:
// <path>?filter=label:<encodedName1>,<encodedValue1>+label:<encodedName2>,<encodedValue2>
function updateUrlQuery(labels: Option[], pathname = '') {
  if (!labels.length) {
    history.replace(pathname);
  }

  const labelFilters = labels
    .map(o => {
      const { name, value } = o.value;
      const encodedName = encodeURIComponent(name);
      const encodedValue = encodeURIComponent(value);
      return `${FILTER_TYPE_LABEL}${encodedName},${encodedValue}`;
    })
    .join('+');

  history.replace(`${pathname}${PARAM_FILTER}${labelFilters}`);
}

// makeTagDictionary makes a dictionary of unique label tags.
// Used as a lookup table when making label options and when
// clicking on the tags from the table.
function makeTagDictionary(data: Data[] = []): TagDict {
  // Test a tags and labels field exist.
  if (!data.length || !data[0].tags || !data[0].labels) {
    return {};
  }

  const tagDict = {};
  data.forEach(({ tags, labels }) => {
    tags.forEach((tag, i) => {
      if (!tagDict[tag]) {
        tagDict[tag] = labels[i];
      }
    });
  });

  return tagDict;
}

function makeLabelOptions(tagDict: TagDict = {}): Option[] {
  const tags = Object.keys(tagDict);
  if (!tags.length) {
    return [];
  }

  return tags
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map(tag => ({ label: tag, value: tagDict[tag] }));
}

type Option = SelectOption<Label>;
type TagDict = Record<LabelTag, Label>;

export type Data = {
  labels: Label[];
  // tags is just the combined string version of a label.
  tags: LabelTag[];
  // Could contain other fields, but does not matter what.
  [key: string]: any;
};

export type State = ReturnType<typeof useUrlFiltering>;
