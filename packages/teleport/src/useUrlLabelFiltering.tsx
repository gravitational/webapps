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

import { useMemo } from 'react';
import { useLocation, useHistory } from 'react-router';
import { Label, LabelTag, makeLabelTag } from 'teleport/services/resources';

// QUERY_PARAM_FILTER is the url query parameter name for filters.
const QUERY_PARAM_FILTER = '?q=';

// FILTER_TYPE_LABEL is the filter identifier name for a label in a filter query.
const FILTER_TYPE_LABEL = 'l=';

export default function useUrlLabelFiltering<T extends Filterable>(data: T[]) {
  const history = useHistory();
  const { search, pathname } = useLocation();
  const labels = useMemo<Label[]>(() => getLabelsFromUrl(search), [search]);
  const result = useMemo(() => filterData(data, labels), [data, labels]);

  function apply(labels: Label[]) {
    history.replace(getEncodedUrl(labels, pathname));
  }

  return {
    labels,
    result,
    apply,
  };
}

// getLabelsFromUrl parses the query string
// and returns extracted labels.
function getLabelsFromUrl(search: string): Label[] {
  if (!search.startsWith(QUERY_PARAM_FILTER)) {
    return [];
  }

  const query = search.substring(QUERY_PARAM_FILTER.length);
  if (!query) {
    return [];
  }

  const filters = query.split('+');
  const labels: Label[] = [];

  for (let i = 0; i < filters.length; i++) {
    const filter = filters[i];
    if (!filter) {
      continue;
    }

    if (filter.startsWith(FILTER_TYPE_LABEL)) {
      const encodedLabel = filter.substring(FILTER_TYPE_LABEL.length);
      const [encodedName, encodedValue, more] = encodedLabel.split(':');

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

      labels.push(label);

      continue;
    }

    // Abort if undefined filter types found among query.
    return [];
  }

  return labels;
}

// filterData returns new list of data that contains the selected labels.
function filterData<T extends Filterable>(
  data: T[] = [],
  labels: Label[] = []
): T[] {
  if (!labels.length) {
    return data;
  }

  return data.filter(obj =>
    labels.every(l => obj.tags.toString().includes(makeLabelTag(l)))
  );
}

// getEncodedUrl formats and encodes the labels into a
// query format we expect in the URL.
//
// Unencoded delimiters used in query string:
//  - plus (+): used as filter separator, interpreted as AND (&&) operator
//  - colon (:): separates name value pair of a label (ie: country:Spain)
//  - equal (=): used with a filter identifier (ie: `l=`), defines a filter
//
// Format of the query:
// <path>?q=l=<encodedName1>:<encodedValue1>+l=<encodedName2>:<encodedValue2>
function getEncodedUrl(labels: Label[], pathname = '') {
  if (!labels.length) {
    return pathname;
  }

  const labelFilters = labels
    .map(label => {
      const encodedName = encodeURIComponent(label.name);
      const encodedValue = encodeURIComponent(label.value);
      return `${FILTER_TYPE_LABEL}${encodedName}:${encodedValue}`;
    })
    .join('+');

  return `${pathname}${QUERY_PARAM_FILTER}${labelFilters}`;
}

export type Filterable = {
  tags: LabelTag[];
};

export type State = ReturnType<typeof useUrlLabelFiltering>;
