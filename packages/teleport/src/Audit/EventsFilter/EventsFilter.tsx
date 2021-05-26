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
import { Flex, Text } from 'design';
import Select, { Option, DarkStyledSelect } from 'shared/components/Select';
import { eventTypes, groupedEventNames } from 'teleport/services/audit';

export default function EventsFilter({ onFilterChange }) {
  const [filterOptions] = useState(getEventFilterOptions());
  const [filterOption, setFilterOption] = useState<Option>();

  function handleOnChange(opt: Option) {
    setFilterOption(opt);

    const eventType = opt ? opt.value : undefined;
    onFilterChange(eventType);
  }

  return (
    <StyledSelect>
      <Select
        components={{ ValueContainer }}
        isSearchable={true}
        isClearable={true}
        options={filterOptions}
        onChange={handleOnChange}
        value={filterOption}
        placeholder="Select a filter to get search results by event type"
      />
    </StyledSelect>
  );
}

const ValueContainer = ({ children, ...props }) => {
  if (!props.hasValue) {
    return (
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    );
  }
  return (
    <components.ValueContainer {...props}>
      <Flex alignItems="center" color="text.primary">
        <Text typography="h6" fontWeight="regular" width="200px">
          Event Type:
        </Text>
        {children}
      </Flex>
    </components.ValueContainer>
  );
};

function getEventFilterOptions() {
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

const StyledSelect = styled(DarkStyledSelect)`
  .react-select__single-value {
    transform: none;
    position: absolute;
    left: 86px;
    top: 4px;
    text-overflow: ellipsis;
  }

  width: 385px;
`;
