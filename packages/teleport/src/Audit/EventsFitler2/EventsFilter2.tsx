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

import React, { useState } from 'react';
import { components } from 'react-select';
import 'react-day-picker/lib/style.css';
import styled from 'styled-components';
import { Flex, Text, ButtonBorder, Box } from 'design';
import { Add } from 'design/Icon';
import Select, {
  Option as SelectOption,
  DarkStyledSelect,
} from 'shared/components/Select';
import { eventTypes, groupedEventNames } from 'teleport/services/audit';
import FilterLabel from './FilterLabel';

export default function EventsFilter({ onFilterChange }) {
  const [filterOptions] = useState(() => getEventFilterOptions());
  const [selectedFilters, setSelectedFilters] = useState<SelectOption[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  function handleOnClick() {
    if (selectedFilters.length === 0) {
      setShowSelector(false);
      return;
    }

    const filters = selectedFilters.map(f => f.value);
    onFilterChange(filters);
    setShowSelector(false);
  }

  function deleteFilter(filterName: string) {
    const updatedFilters = selectedFilters.filter(o => o.value !== filterName);
    let filters = updatedFilters.map(f => f.value);

    setSelectedFilters(updatedFilters);
    onFilterChange(filters);
  }

  const $tags = selectedFilters.map((o, key) => (
    <FilterLabel
      key={key}
      name={o.label}
      onClick={() => deleteFilter(o.value)}
    />
  ));

  return (
    <Box>
      <Flex flexWrap="wrap">{$tags}</Flex>
      <ButtonBorder
        style={{ lineHeight: 'normal' }}
        px={3}
        onClick={() => setShowSelector(!showSelector)}
        mt={2}
      >
        <Add fontSize={4} mr={1} ml={-1} /> Add Filters
      </ButtonBorder>
      {showSelector && (
        <Box
          mt={2}
          bg="white"
          p={3}
          borderRadius={2}
          style={{ position: 'absolute', zIndex: 1 }}
        >
          <Text color="black" typography="h5" mb={3} bold>
            Select filters to fine tune your search results:
          </Text>
          <StyledSelect>
            <Select
              components={{ Option, MultiValue }}
              isSearchable={true}
              isClearable={false}
              options={filterOptions}
              value={selectedFilters}
              onChange={o => setSelectedFilters(o)}
              // value={selectedFilters}
              placeholder="Search filters..."
              menuIsOpen={true}
              isMulti={true}
              hideSelectedOptions={false}
              controlShouldRenderValue={false}
            />
          </StyledSelect>

          <ButtonBorder
            style={{ lineHeight: 'normal' }}
            px={3}
            mt={2}
            mr={3}
            onClick={handleOnClick}
          >
            Apply
          </ButtonBorder>
          <ButtonBorder
            style={{ lineHeight: 'normal' }}
            px={3}
            mt={2}
            onClick={() => setSelectedFilters([])}
          >
            Deselect All
          </ButtonBorder>
        </Box>
      )}
    </Box>
  );
}

// Option customizes how react-select options appear.
const Option = props => {
  return (
    <components.Option {...props} className="react-select__selected">
      <Flex alignItems="center">
        <input type="checkbox" checked={props.isSelected} readOnly />{' '}
        <Text ml={1}>{props.label}</Text>
      </Flex>
    </components.Option>
  );
};

const MultiValue = props => {
  return (
    <components.MultiValue {...props}>
      <span>{props.data.label}</span>
    </components.MultiValue>
  );
};

function getEventFilterOptions() {
  console.log('--- just once');
  const usedNames = {};

  return Object.keys(eventTypes)
    .sort()
    .filter(key => {
      const name = eventTypes[key].name;
      if (usedNames[name]) {
        return false;
      }

      usedNames[name] = key;
      return true;
    })
    .map(key => {
      const value = eventTypes[key].name;

      // Use default desc or modified desc for grouped event names.
      const label = groupedEventNames[value]
        ? groupedEventNames[value]
        : eventTypes[key].desc;

      return { value, label };
    });
}

const StyledSelect = styled.div`
  width: 385px;

  input[type='checkbox'] {
    cursor: pointer;
  }

  .react-select__option--is-selected {
    background-color: inherit;
  }

  .react-select__option--is-focused {
    background-color: ${props => props.theme.colors.grey[100]};
  }

  .react-select__indicators {
    display: none;
  }

  .react-select__control:hover {
    cursor: text;
  }

  .react-select__menu {
    position: relative;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;
