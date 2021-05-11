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
import ReactSelect from 'react-select';
import ReactSelectAsync from 'react-select/async';
import styled from 'styled-components';
import { Props, AsyncProps } from './types';

export default function Select(props: Props) {
  const { hasError = false, ...restOfProps } = props;
  return (
    <StyledSelect hasError={hasError}>
      <ReactSelect
        menuPlacement="auto"
        className="react-select-container"
        classNamePrefix="react-select"
        clearable={false}
        isMulti={false}
        isSearchable={true}
        placeholder="Select..."
        {...restOfProps}
      />
    </StyledSelect>
  );
}

export function SelectAsync(props: AsyncProps) {
  const { hasError = false, ...restOfProps } = props;
  return (
    <StyledSelect hasError={hasError}>
      <ReactSelectAsync
        className="react-select-container"
        classNamePrefix="react-select"
        clearable={false}
        isSearchable={true}
        defaultOptions={false}
        cacheOptions={false}
        defaultMenuIsOpen={false}
        placeholder="Select..."
        {...restOfProps}
      />
    </StyledSelect>
  );
}

const StyledSelect = styled.div`
  .react-select__control,
  .react-select__control--is-focused {
    border-color: #fff;
    height: 40px;
    min-height: 40px;
    ${({ hasError, theme }) => {
      if (hasError) {
        return {
          borderRadius: 'inherit !important',
          borderWidth: '2px !important',
          border: `2px solid ${theme.colors.error.main}  !important`,
        };
      }
    }}
  }

  .react-select__option {
    padding: 4px 12px;
  }

  .react-select__option--is-focused,
  .react-select__option--is-focused:active {
    background-color: ${({ theme }) => theme.colors.grey[100]};
  }

  .react-select-container {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.24);
    box-sizing: border-box;
    border: none;
    display: block;
    font-size: 14px;
    outline: none;
    width: 100%;
    color: rgba(0, 0, 0, 0.87);
    background-color: #ffffff;
    margin-bottom: 0px;
    border-radius: 4px;
  }

  .react-select__menu {
    margin-top: 0px;
    font-size: 14px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .react-select__indicator-separator {
    display: none;
  }

  .react-select__value-container {
    height: 30px;
    padding: 0 8px;
  }

  .react-select__option--is-selected {
    background-color: #cfd8dc;
    color: inherit;
  }

  .react-select__single-value {
    color: white;
    font-size: 14px;
    transform: none;
    position: absolute;
    left: 78px;
    top: 4px;
    width: 270px;
    text-overflow: ellipsis;
  }

  .react-select__dropdown-indicator {
    padding: 4px 8px;
  }

  .react-select__input {
    color: white;
    height: 20px;
    font-size: 14px;
    font-family: ${({ theme }) => theme.font};
  }

  .react-select__control {
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.text.secondary};

    &:hover {
      border-color: rgba(255, 255, 255, 0.24);
      cursor: pointer;
    }
  }

  .react-select__control--is-focused {
    background-color: ${({ theme }) => theme.colors.primary.lighter};
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-shadow: none;
    border-color: rgba(255, 255, 255, 0.24);
  }

  .react-select__loading-indicator {
    display: none;
  }
`;
