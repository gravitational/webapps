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

import styled, { color, margin, padding, width } from 'design/styled';

import type { PropsWithTheme } from 'design/theme';

const kind = (props: PropsWithTheme<AlertProps>) => {
  const { kind, theme } = props;

  if (!theme.colors) {
    return {};
  }

  switch (kind) {
    case 'danger':
      return {
        background: theme.colors.danger,
        color: theme.colors.primary.contrastText,
      };
    case 'info':
      return {
        background: theme.colors.info,
        color: theme.colors.primary.contrastText,
      };
    case 'warning':
      return {
        background: theme.colors.warning,
        color: theme.colors.primary.contrastText,
      };
    case 'success':
      return {
        background: theme.colors.success,
        color: theme.colors.primary.contrastText,
      };
    default:
      return {
        background: theme.colors.danger,
        color: theme.colors.primary.contrastText,
      };
  }
};

export interface AlertProps {
  kind?: 'danger' | 'info' | 'warning' | 'success';
}

export const Alert = styled.div([color, margin, padding, width])<AlertProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.24);
  margin: 0 0 24px 0;
  min-height: 40px;
  padding: 8px 16px;
  overflow: auto;
  word-break: break-word;
  line-height: 1.5;

  ${kind}
  a {
    color: ${p => p.theme.colors.light};
  }
`;

export const Danger = styled(Alert).attrs({ kind: 'danger' } as AlertProps)``;
export const Info = styled(Alert).attrs({ kind: 'info' } as AlertProps)``;
export const Warning = styled(Alert).attrs({ kind: 'warning' } as AlertProps)``;
export const Success = styled(Alert).attrs({ kind: 'success' } as AlertProps)``;
