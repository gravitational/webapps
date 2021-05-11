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

import styled from 'styled-components';
import React from 'react';
import { Box, LabelInput } from 'design';
import { SelectAsync } from 'shared/components/Select';
import { useConsoleContext } from 'teleport/Console/consoleContextProvider';

export default function ClusterSelector({
  value,
  onChange,
  defaultMenuIsOpen = false,
  ...styles
}) {
  const consoleCtx = useConsoleContext();
  const [errorMessage, setError] = React.useState(null);
  const [options, setOptions] = React.useState<Option[]>([]);

  const selectedOption = {
    value,
    label: value,
  };

  function onChangeOption(option) {
    onChange(option.value);
  }

  function onLoadOptions(inputValue: string) {
    let promise = Promise.resolve(options);
    if (options.length === 0) {
      promise = consoleCtx
        .fetchClusters()
        .then(clusters =>
          clusters.map(o => ({
            value: o.clusterId,
            label: o.clusterId,
          }))
        )
        .then(options => {
          setOptions(options);
          return options;
        });
    }

    return promise
      .then(options => filterOptions(inputValue, options))
      .catch((err: Error) => {
        setError(err.message);
      });
  }

  function getNoOptionsMessage() {
    if (errorMessage) {
      return `Error: ${errorMessage}`;
    }

    return 'No leaf clusters found';
  }

  return (
    <Box {...styles}>
      <LabelInput> Clusters </LabelInput>
      <StyledSelect>
        <SelectAsync
          noOptionsMessage={getNoOptionsMessage}
          value={selectedOption}
          onChange={onChangeOption}
          loadOptions={onLoadOptions}
          defaultMenuIsOpen={defaultMenuIsOpen}
          hasError={false}
          width={400}
          maxMenuHeight={400}
          isSearchable
          isSimpleValue={false}
          clearable={false}
          defaultOptions
          cacheOptions
        />
      </StyledSelect>
    </Box>
  );
}

function filterOptions(value = '', options: Option[] = []) {
  value = value.toLocaleLowerCase();
  return options.filter(o => {
    return o.value.toLocaleLowerCase().indexOf(value) !== -1;
  });
}

type Option = { value: string; label: string };

const StyledSelect = styled(Box)(
  ({ theme }) => `
  .react-select__control {    
    background-color: ${theme.colors.primary.light};
    border-color: rgba(255, 255, 255, 0.24);
    
    &:focus,
    &:active {
      background-color: '${theme.colors.primary.lighter}';
    }

    &:hover {
      background-color: ${theme.colors.primary.lighter};
      .react-select__dropdown-indicator {
        color: ${theme.colors.text.primary};
      }
    }
  }

  .react-select__option--is-selected {
    background-color: inherit;
  }

  .react-select__option--is-focused {
    background-color: ${theme.colors.grey[100]};
  }

  .react-select__dropdown-indicator {
    color: ${theme.colors.text.secondary};
  }

  .react-select__single-value {
    padding: 0 4px !important;
    margin: 0 !important;
    left: auto;
    top: auto;
  }

  .react-select__control--is-focused {
    background-color: ${theme.colors.primary.lighter};
    .react-select__dropdown-indicator {
      color: ${theme.colors.text.secondary};
    }
  } 
`
);
