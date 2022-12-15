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

import type * as CSS from 'csstype';

import type { Theme, TypographyKey } from 'design/theme';

export interface TypographyProps {
  caps?: boolean;
  bold?: boolean;
  italic?: boolean;
  color?: string;
  theme?: Theme;
  typography?: TypographyKey;
}

export function typography(props: TypographyProps) {
  const { typography, theme } = props;

  return {
    ...theme.typography[typography],
    ...caps(props),
    ...breakAll(props),
    ...bold(props),
    ...mono(props),
  };
}

function caps(props): { textTransform: CSS.Property.TextTransform } {
  return props.caps ? { textTransform: 'uppercase' } : null;
}

function mono(props): { fontFamily: CSS.Property.FontFamily } {
  return props.mono ? { fontFamily: props.theme.fonts.mono } : null;
}

function breakAll(props): { wordBreak: CSS.Property.WordBreak } {
  return props.breakAll ? { wordBreak: 'break-all' } : null;
}

function bold(props): { fontWeight: CSS.Property.FontWeight } {
  return props.bold ? { fontWeight: props.theme.fontWeights.bold } : null;
}