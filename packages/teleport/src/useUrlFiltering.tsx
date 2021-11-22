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
import {
  Label,
  LabelTag,
  LabelOption as Option,
  makeLabelTag,
} from 'teleport/services/resources';

// PARAM_FILTER is a url query parameter for filters.
const PARAM_FILTER = '?filter=';

// FILTER_TYPE_LABEL defines a filter type for labels in a url query param.
const FILTER_TYPE_LABEL = 'label:';

export default function useUrlFiltering<T extends Filterable>(data: Array<T>) {
  const history = useHistory();
  const { search, pathname } = useLocation();
  const selectedLabels = useMemo<Option[]>(() => getLabelsFromUrl(search), [
    search,
  ]);

  const filteredData = useMemo(() => filterData(data, selectedLabels), [
    data,
    selectedLabels,
  ]);

  function apply(labels: Option[]) {
    history.replace(getEncodedUrl(labels, pathname));
  }

  // toggleLabel removes an existing label from the
  // selected labels list, else adds new label to list.
  function toggleLabel(label: Label) {
    const tag = makeLabelTag(label);
    let modifiedList = [...selectedLabels];
    const index = selectedLabels.findIndex(o => o.label === tag);

    if (index > -1) {
      // remove the label
      modifiedList.splice(index, 1);
    } else {
      modifiedList = [
        ...selectedLabels,
        { label: tag, value: tag, obj: label },
      ];
    }

    apply(modifiedList);
  }

  return {
    selectedLabels,
    filteredData,
    apply,
    toggleLabel,
  };
}

// getLabelsFromUrl parses the query param filter values.
function getLabelsFromUrl(search: string): Option[] {
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
      const [encodedName, encodedValue, more] = encodedLabel.split('=');

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

      const tag = makeLabelTag(label);
      options.push({
        label: tag,
        value: tag,
        obj: label,
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
function filterData(data: Filterable[] = [], labels: Option[] = []): any[] {
  if (!labels.length) {
    return data;
  }

  return data.filter(obj =>
    labels.every(l => obj.tags.toString().includes(l.label))
  );
}

// getEncodedUrl formats and encodes the selected labels into a
// query format we expect in the URL.
//
// Unencoded seperators used in URL:
//  - plus (+): seperates different filters
//  - equal (=): seperates name value pair of a label
//  - colon (:) with name of filter type (ie label:): identifies the filter as a label type
//
// Format of the query:
// <path>?filter=label:<encodedName1>,<encodedValue1>+label:<encodedName2>,<encodedValue2>
function getEncodedUrl(labels: Option[], pathname = '') {
  if (!labels.length) {
    return pathname;
  }

  const labelFilters = labels
    .map(o => {
      const { name, value } = o.obj;
      const encodedName = encodeURIComponent(name);
      const encodedValue = encodeURIComponent(value);
      return `${FILTER_TYPE_LABEL}${encodedName}=${encodedValue}`;
    })
    .join('+');

  return `${pathname}${PARAM_FILTER}${labelFilters}`;
}

export type Filterable = {
  labels: Label[];
  tags: LabelTag[];
};

export type State = ReturnType<typeof useUrlFiltering>;
