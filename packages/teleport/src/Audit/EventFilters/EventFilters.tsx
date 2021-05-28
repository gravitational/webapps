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
import {
  eventCodes,
  eventGroupTypes,
  formatters,
} from 'teleport/services/audit';

export default function EventFilters({ onFilterChange }) {
  const [filterOptions] = useState(() => getEventFilterOptions());
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
        placeholder="Show All"
        maxMenuHeight={400}
      />
    </StyledSelect>
  );
}

const ValueContainer = ({ children, ...props }) => {
  return (
    <components.ValueContainer {...props}>
      <Flex alignItems="center" color="text.primary">
        <Text typography="h6" fontWeight="regular" mr="1">
          Event Type:
        </Text>
        {children}
      </Flex>
    </components.ValueContainer>
  );
};

function getEventFilterOptions() {
  const usedTypes = {};
  const filters = [];

  Object.keys(eventCodes).forEach(key => {
    const event = formatters[eventCodes[key]];

    if (usedTypes[event.type]) {
      return;
    }

    usedTypes[event.type] = key;

    // Use default desc or modified desc for grouped event names.
    const label = eventGroupTypes[event.type]
      ? eventGroupTypes[event.type]
      : event.desc;

    filters.push({ value: event.type, label });
  });

  return filters.sort((a, b) => {
    if (a.label < b.label) {
      return -1;
    }

    if (a.label > b.label) {
      return 1;
    }

    return 0;
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

  .react-select__placeholder {
    color: ${props => props.theme.colors.text.primary};
    margin-left: 80px;
  }

  width: 385px;
`;
