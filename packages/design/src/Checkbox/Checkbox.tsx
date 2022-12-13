/**
 * Copyright 2022 Gravitational, Inc.
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

import styled from 'styled-components';

import { Flex } from 'design';

export const CheckboxWrapper = styled(Flex)`
  padding: 8px;
  margin-bottom: 4px;
  width: 300px;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.primary.light};
  border-radius: 8px;

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

export const CheckboxInput = styled.input`
  margin-right: 10px;
  accent-color: ${props => props.theme.colors.secondary.main};

  &:hover {
    cursor: pointer;
  }
`;
