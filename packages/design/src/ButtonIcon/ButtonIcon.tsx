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

import styled, { margin, padding, color } from 'design/styled';

import { Icon } from '../Icon';

import type { SystemRenderFunction } from 'design/styled';

import type { CSSProperties } from 'react';

type Size = Pick<CSSProperties, 'fontSize' | 'height' | 'width'>;

const sizeMap: Record<number, Size> = {
  0: {
    fontSize: '12px',
    height: '24px',
    width: '24px',
  },
  1: {
    fontSize: '16px',
    height: '32px',
    width: '32px',
  },
  2: {
    fontSize: '24px',
    height: '48px',
    width: '48px',
  },
};

export interface ButtonIconProps {
  size?: 0 | 1 | 2;
}

const size: SystemRenderFunction<{ size?: number }> = props =>
  sizeMap[props.size] || sizeMap[1];

export const ButtonIcon = styled.button([
  margin,
  padding,
  color,
  size,
])<ButtonIconProps>`
  align-items: center;
  border: none;
  cursor: pointer;
  display: flex;
  outline: none;
  border-radius: 50%;
  overflow: visible;
  justify-content: center;
  text-align: center;
  flex: 0 0 auto;
  background: transparent;
  color: inherit;
  transition: all 0.3s;
  -webkit-font-smoothing: antialiased;

  ${Icon} {
    color: inherit;
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.action.disabled};
  }

  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.action.hover};
  }
`;
