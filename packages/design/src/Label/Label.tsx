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

import styled, { margin, padding } from 'design/styled';

import type { PropsWithTheme } from 'design/theme';

const kind = ({ kind, theme }: PropsWithTheme<LabelProps>) => {
  if (kind === 'secondary') {
    return {
      backgroundColor: theme.colors.primary.dark,
      color: theme.colors.text.primary,
    };
  }

  if (kind === 'warning') {
    return {
      backgroundColor: theme.colors.warning,
      color: theme.colors.primary.contrastText,
    };
  }

  if (kind === 'danger') {
    return {
      backgroundColor: theme.colors.danger,
      color: theme.colors.primary.contrastText,
    };
  }

  if (kind === 'success') {
    return {
      backgroundColor: theme.colors.success,
      color: theme.colors.primary.contrastText,
    };
  }

  // default is primary
  return {
    backgroundColor: theme.colors.secondary.main,
    color: theme.colors.secondary.contrastText,
  };
};

export interface LabelProps {
  kind: 'primary' | 'secondary' | 'warning' | 'danger' | 'success';
  invert?: boolean;
  children?: React.ReactNode;
}

export const Label = styled.div([margin, padding])<LabelProps>`
  box-sizing: border-box;
  border-radius: 100px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 16px;
  line-height: 1.4;
  font-size: 10px;
  font-weight: 500;
  padding: 0 8px;

  ${kind}
`;

export const Primary = styled(Label).attrs({ kind: 'primary' } as LabelProps)``;
export const Secondary = styled(Label).attrs({
  kind: 'secondary',
} as LabelProps)``;
export const Warning = styled(Label).attrs({ kind: 'warning' } as LabelProps)``;
export const Danger = styled(Label).attrs({ kind: 'danger' } as LabelProps)``;
