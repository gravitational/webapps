/**
 Copyright 2022 Gravitational, Inc.

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

import styled, { margin, padding, width, color, height } from 'design/styled';

import type { SystemRenderFunction } from 'design/styled';

export interface TextAreaProps extends React.ComponentPropsWithRef<'textarea'> {
  hasError?: boolean;
  resizable?: boolean;

  [key: string]: any;
}

const error: SystemRenderFunction<{ hasError?: boolean }> = ({
  hasError,
  theme,
}) =>
  hasError && {
    border: `2px solid ${theme.colors.error.main}`,
    padding: '10px 14px',
  };

const resize: SystemRenderFunction<{ resizable?: boolean }> = ({
  resizable,
}) => ({
  resize: resizable ? 'vertical' : 'none',
});

export const TextArea = styled.textarea([
  color,
  margin,
  padding,
  width,
  height,
  resize,
  error,
])<TextAreaProps>`
  appearance: none;
  border: none;
  border-radius: 4px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.24);
  box-sizing: border-box;
  min-height: 50px;
  height: 80px;
  font-size: 16px;
  padding: 16px;
  outline: none;
  width: 100%;

  ::placeholder {
    opacity: 0.4;
  }

  :read-only {
    cursor: not-allowed;
  }
`;
