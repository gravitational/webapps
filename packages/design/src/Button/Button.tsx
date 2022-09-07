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

import styled, { margin, padding, width, height } from 'design/styled';

import { PropsWithTheme } from 'design/theme';

interface ButtonProps {
  children?: React.ReactNode;
  kind?: 'primary' | 'secondary' | 'text' | 'warning' | 'border';
  size?: 'small' | 'medium' | 'large';
  block?: boolean;
  onClick?: React.MouseEventHandler;
  title?: string;
}

const size = (props: ButtonProps) => {
  switch (props.size) {
    case 'small':
      return {
        fontSize: '10px',
        minHeight: '24px',
        padding: '0px 16px',
      };
    case 'large':
      return {
        minHeight: '40px',
        fontSize: '12px',
        padding: '0px 40px',
      };
    default:
      // medium
      return {
        minHeight: '32px',
        fontSize: `12px`,
        padding: '0px 24px',
      };
  }
};

const themedStyles = (props: PropsWithTheme<ButtonProps>) => {
  const { colors } = props.theme;
  const { kind } = props;

  const style = {
    color: colors.text.primary,
    '&:disabled': {
      background: kind === 'text' ? 'none' : colors.action.disabledBackground,
      color: colors.action.disabled,
    },
  };

  return {
    ...kinds(props),
    ...style,
    ...size(props),
    ...block(props),
  };
};

const kinds = (props: PropsWithTheme<ButtonProps>) => {
  const { kind, theme } = props;
  switch (kind) {
    case 'secondary':
      return {
        background: theme.colors.primary.light,
        '&:hover, &:focus': {
          background: theme.colors.primary.lighter,
        },
      };
    case 'border':
      return {
        background: theme.colors.primary.lighter,
        border: '1px solid ' + theme.colors.primary.main,
        opacity: '.87',
        '&:hover, &:focus': {
          background: theme.colors.primary.lighter,
          border: '1px solid ' + theme.colors.action.hover,
          opacity: 1,
        },
        '&:active': {
          opacity: 0.24,
        },
      };
    case 'warning':
      return {
        background: theme.colors.error.dark,
        '&:hover, &:focus': {
          background: theme.colors.error.main,
        },
      };
    case 'text':
      return {
        background: 'none',
        'text-transform': 'none',
        '&:hover, &:focus': {
          background: 'none',
          'text-decoration': 'underline',
        },
      };
    case 'primary':
    default:
      return {
        background: theme.colors.secondary.main,
        '&:hover, &:focus': {
          background: theme.colors.secondary.light,
        },
        '&:active': {
          background: theme.colors.secondary.dark,
        },
      };
  }
};

const block = (props: ButtonProps) =>
  props.block
    ? {
        width: '100%',
      }
    : null;

export const Button = styled.button([
  margin,
  padding,
  width,
  height,
])<ButtonProps>`
  line-height: 1.5;
  margin: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  outline: none;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s;
  -webkit-font-smoothing: antialiased;

  &:active {
    opacity: 0.56;
  }

  ${themedStyles}
`;

export const ButtonPrimary = styled(Button).attrs({
  kind: 'primary',
} as ButtonProps)``;
export const ButtonSecondary = styled(Button).attrs({
  kind: 'secondary',
} as ButtonProps)``;
export const ButtonBorder = styled(Button).attrs({
  kind: 'border',
} as ButtonProps)``;
export const ButtonWarning = styled(Button).attrs({
  kind: 'warning',
} as ButtonProps)``;
export const ButtonText = styled(Button).attrs({
  kind: 'text',
} as ButtonProps)``;
