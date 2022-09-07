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

import styled, { margin, padding, width, color, height } from 'design/styled';

function error({ hasError, theme }) {
  if (!hasError) {
    return;
  }

  return {
    border: `2px solid ${theme.colors.error.main}`,
    padding: '10px 14px',
  };
}

export interface InputProps {
  hasError?: boolean;
  placeholder?: string;
}

export const Input = styled.input([
  color,
  margin,
  padding,
  width,
  height,
])<InputProps>`
  appearance: none;
  border: none;
  border-radius: 4px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.24);
  box-sizing: border-box;
  display: block;
  height: 40px;
  font-size: 16px;
  padding: 0 16px;
  outline: none;
  width: 100%;

  ::-ms-clear {
    display: none;
  }

  ::placeholder {
    opacity: 0.4;
  }

  :read-only {
    cursor: not-allowed;
  }

  ${error};
`;

Input.defaultProps = {
  bg: 'light',
  color: 'text.onLight',
};
