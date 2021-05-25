// Copyright 2021 Gravitational, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import styled from 'styled-components';
import { StyledSelect } from './Select';

const StyledDarkSelect = styled(StyledSelect)(
  ({ theme }) => `
  .react-select-container {
    background: transparent;
  }
  
  .react-select__control,
  .react-select__control--is-focused {
    border-color: #FFF;
    min-height: 34px;
  }

  .react-select__value-container {
    padding: 0 8px;
  }

  .react-select__single-value {
    color: ${theme.colors.text.primary}
  }

  .react-select__dropdown-indicator {
    padding: 4px 8px;
    color: ${theme.colors.text.secondary};
  }

  .react-select__control {
    border-color: rgba(255, 255, 255, 0.24);
    color: ${theme.colors.text.secondary};

    &:focus, &:active {
      background-color: ${theme.colors.primary.lighter};
    }

    &:hover {
      border-color: rgba(255, 255, 255, 0.24);
      background-color: ${theme.colors.primary.lighter};
      .react-select__dropdown-indicator {
        color: ${theme.colors.text.primary};
      }
    }
  }

  .react-select__control--is-focused {
    background-color: ${theme.colors.primary.lighter};
    border-color: transparent;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-shadow: none;
    border-color: rgba(255, 255, 255, 0.24);

    .react-select__dropdown-indicator {
      color: ${theme.colors.text.secondary};
    }
  }

  .react-select__option {
    padding: 4px 12px;
    &:hover {
      background-color: ${theme.colors.grey[100]};
    }
  }

  .react-select__option--is-focused {
    background-color: ${theme.colors.grey[100]};
  }  

  .react-select__option--is-focused:active {
    background-color: ${theme.colors.grey[50]};
  }

  .react-select__menu {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`
);

export default StyledDarkSelect;
