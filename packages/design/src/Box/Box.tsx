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

import styled from 'styled-components';

import {
  overflow,
  borders,
  borderRadius,
  borderColor,
  flex,
  height,
  maxWidth,
  minHeight,
  maxHeight,
  minWidth,
  alignSelf,
  justifySelf,
  space,
  width,
  color,
  textAlign,
} from 'design/system';

import type {
  MaxWidthProps,
  MinWidthProps,
  SpaceProps,
  HeightProps,
  MinHeightProps,
  MaxHeightProps,
  WidthProps,
  ColorProps,
  TextAlignProps,
  FlexProps,
  AlignSelfProps,
  JustifySelfProps,
  BordersProps,
  BorderRadiusProps,
  OverflowProps,
  BorderColorProps,
} from 'design/system';

type BoxProps = MaxWidthProps &
  MinWidthProps &
  SpaceProps &
  HeightProps &
  MinHeightProps &
  MaxHeightProps &
  WidthProps &
  ColorProps &
  TextAlignProps &
  FlexProps &
  AlignSelfProps &
  JustifySelfProps &
  BordersProps &
  BorderRadiusProps &
  OverflowProps &
  BorderColorProps;

export const Box = styled.div<BoxProps>`
  box-sizing: border-box;

  ${maxWidth}
  ${minWidth}
  ${space}
  ${height}
  ${minHeight}
  ${maxHeight}
  ${width}
  ${color}
  ${textAlign}
  ${flex}
  ${alignSelf}
  ${justifySelf}
  ${borders}
  ${borderRadius}
  ${overflow}
  ${borderColor}
`;
