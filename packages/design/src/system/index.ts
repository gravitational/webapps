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

import type { ElementType } from 'react';
import type { ColorProps as ColorBaseProps } from 'styled-system';

export { typography } from './typography';
export type { TypographyProps } from './typography';

export { gap } from './gap';
export type { GapProps } from './gap';

export interface ColorProps extends ColorBaseProps {
  // ColorProps and React.HTMLAttributes[color] collide, so we extend ColorProps and set `as` to
  // prevent that behavior
  // https://stackoverflow.com/a/72455581P
  as?: ElementType;
}

export { borderRadius } from './borderRadius';

export {
  alignItems,
  alignSelf,
  border,
  borderColor,
  borders,
  color,
  flex,
  flexDirection,
  flexWrap,
  fontSize,
  fontWeight,
  height,
  justifyContent,
  justifySelf,
  lineHeight,
  margin,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  overflow,
  padding,
  size,
  space,
  textAlign,
  width,
} from 'styled-system';

export type {
  AlignItemsProps,
  AlignSelfProps,
  BorderProps,
  BorderColorProps,
  BordersProps,
  BorderRadiusProps,
  FlexProps,
  FlexDirectionProps,
  FlexWrapProps,
  FontSizeProps,
  FontWeightProps,
  HeightProps,
  JustifyContentProps,
  JustifySelfProps,
  LineHeightProps,
  MarginProps,
  MaxHeightProps,
  MaxWidthProps,
  MinHeightProps,
  MinWidthProps,
  OverflowProps,
  PaddingProps,
  SizeProps,
  SpaceProps,
  TextAlignProps,
  WidthProps,
} from 'styled-system';
