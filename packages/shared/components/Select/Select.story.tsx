/*
Copyright 2019 Gravitational, Inc.

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
import { Flex, Box, LabelInput } from 'design';
import Select, { DarkStyledSelect } from '../Select';

export default {
  title: 'Shared/Select',
};

export const SelectTypes = () => {
  return (
    <Flex justifyContent="space-evenly">
      <SelectDefault {...props} />
      <SelectDark {...props} />
    </Flex>
  );
};

const props = {
  value: [
    { value: 'admin', label: 'admin' },
    { value: 'testrole', label: 'testrole' },
  ],
  onChange: () => null,
  options: [
    { value: 'Relupba', label: 'Relupba' },
    { value: 'B', label: 'B' },
    { value: 'Pilhibo', label: 'Pilhibo' },
  ],
};

function SelectDefault({ value, onChange, options }) {
  return (
    <Flex flexDirection="column" width="500px">
      <Box mb="8">
        <LabelInput>User Roles</LabelInput>
        <Select
          value={value}
          onChange={onChange}
          options={options}
          isMulti={true}
        />
      </Box>
      <Box>
        <LabelInput>User Roles</LabelInput>
        <Select
          value={[]}
          onChange={onChange}
          options={options}
          clearable={true}
          placeholder="Click to select a role"
        />
      </Box>
    </Flex>
  );
}

function SelectDark({ value, onChange, options }) {
  return (
    <Flex flexDirection="column" width="500px">
      <Box mb="8">
        <LabelInput>User Roles</LabelInput>
        <StyledSelect>
          <Select
            value={value}
            onChange={onChange}
            options={options}
            isMulti={true}
          />
        </StyledSelect>
      </Box>
      <Box>
        <LabelInput>User Roles</LabelInput>
        <StyledSelect>
          <Select
            value={[]}
            onChange={onChange}
            options={options}
            placeholder="Click to select a role"
          />
        </StyledSelect>
      </Box>
    </Flex>
  );
}

const StyledSelect = styled(DarkStyledSelect)`
  .react-select__control,
  .react-select__control--is-focused {
    min-height: 40px;
  }
`;
