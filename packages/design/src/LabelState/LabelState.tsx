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

import { fontSize, color, width, space } from 'design/system';
import { fade } from 'design/theme/utils/colorManipulator';

import type {
  ColorProps,
  FontSizeProps,
  SpaceProps,
  WidthProps,
} from 'design/system';

import type { PropsWithTheme } from 'design/theme';

const kinds = ({ theme, kind, shadow }: PropsWithTheme<LabelStateProps>) => {
  // default is primary
  const styles = {
    background: theme.colors.secondary.main,
    color: theme.colors.secondary.contrastText,
    boxShadow: null,
  };

  if (kind === 'secondary') {
    styles.background = theme.colors.primary.dark;
    styles.color = theme.colors.text.primary;
  }

  if (kind === 'warning') {
    styles.background = theme.colors.warning;
    styles.color = theme.colors.primary.contrastText;
  }

  if (kind === 'danger') {
    styles.background = theme.colors.danger;
    styles.color = theme.colors.primary.contrastText;
  }

  if (kind === 'success') {
    styles.background = theme.colors.success;
    styles.color = theme.colors.primary.contrastText;
  }

  if (shadow) {
    styles.boxShadow = `
    0 0 8px ${fade(styles.background, 0.24)},
    0 4px 16px ${fade(styles.background, 0.56)}
    `;
  }

  return styles;
};

export type LabelStateKind = 'secondary' | 'warning' | 'danger' | 'success';

interface LabelStateBaseProps {
  kind?: LabelStateKind;
  shadow?: boolean;
}

type LabelStateProps = LabelStateBaseProps &
  SpaceProps &
  WidthProps &
  ColorProps &
  FontSizeProps;

export const LabelState = styled.span<LabelStateProps>`
  box-sizing: border-box;
  border-radius: 100px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 16px;
  line-height: 1.4;
  padding: 0 8px;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;

  ${space}
  ${kinds}
  ${width}
  ${color}
  ${fontSize}
`;

export const StateDanger = (props: Omit<LabelStateProps, 'kind'>) => (
  <LabelState kind="danger" {...props} />
);
export const StateInfo = (props: Omit<LabelStateProps, 'kind'>) => (
  <LabelState kind="secondary" {...props} />
);
export const StateWarning = (props: Omit<LabelStateProps, 'kind'>) => (
  <LabelState kind="warning" {...props} />
);
export const StateSuccess = (props: Omit<LabelStateProps, 'kind'>) => (
  <LabelState kind="success" {...props} />
);
