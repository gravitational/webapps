import * as system from 'styled-system';

import { CSSProperties } from 'react';

import { PropsWithTheme } from 'design/theme';

import { typography as typographyStyleFn, TypographyProps } from './typography';

import { gap as gapStyleFn } from './gap';

import type {
  AlignItemsProps,
  AlignSelfProps,
  BorderColorProps,
  BorderProps,
  BordersProps,
  ColorProps as ColorBaseProps,
  FlexDirectionProps,
  FlexProps,
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
  TextAlignProps,
  TextColorProps,
  WidthProps as WidthBaseProps,
} from 'styled-system';

import type { GapProps } from './gap';

export interface ColorProps extends ColorBaseProps {
  // ColorProps and React.HTMLAttributes[color] collide, so we extend ColorProps and set `as` to
  // prevent that behavior
  // https://stackoverflow.com/a/72455581P
  as?: React.ElementType;
}

export interface WidthProps extends WidthBaseProps {
  // ColorProps and React.HTMLAttributes[color] collide, so we extend ColorProps and set `as` to
  // prevent that behavior
  // https://stackoverflow.com/a/72455581
  as?: React.ElementType;
}

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export interface SystemRenderFunction<P> {
  (props: UnionToIntersection<PropsWithTheme<P>>): CSSProperties;
}

export const alignItems: SystemRenderFunction<AlignItemsProps> =
  system.alignItems;
export const alignSelf: SystemRenderFunction<AlignSelfProps> = system.alignSelf;
export const border: SystemRenderFunction<BorderProps> = system.border;
export const borderColor: SystemRenderFunction<BorderColorProps> =
  system.borderColor;
export const borders: SystemRenderFunction<BordersProps> = system.borders;
export const color: SystemRenderFunction<ColorProps> = system.color;
export const flex: SystemRenderFunction<FlexProps> = system.flex;
export const flexDirection: SystemRenderFunction<FlexDirectionProps> =
  system.flexDirection;
export const flexWrap: SystemRenderFunction<FlexWrapProps> = system.flexWrap;
export const fontSize: SystemRenderFunction<FontSizeProps> = system.fontSize;
export const fontWeight: SystemRenderFunction<FontWeightProps> =
  system.fontWeight;
export const gap: SystemRenderFunction<GapProps> = gapStyleFn;
export const height: SystemRenderFunction<HeightProps> = system.height;
export const justifyContent: SystemRenderFunction<JustifyContentProps> =
  system.justifyContent;
export const justifySelf: SystemRenderFunction<JustifySelfProps> =
  system.justifySelf;
export const lineHeight: SystemRenderFunction<LineHeightProps> =
  system.lineHeight;
export const margin: SystemRenderFunction<MarginProps> = system.margin;
export const maxHeight: SystemRenderFunction<MaxHeightProps> = system.maxHeight;
export const maxWidth: SystemRenderFunction<MaxWidthProps> = system.maxWidth;
export const minHeight: SystemRenderFunction<MinHeightProps> = system.minHeight;
export const minWidth: SystemRenderFunction<MinWidthProps> = system.minWidth;
export const overflow: SystemRenderFunction<OverflowProps> = system.overflow;
export const padding: SystemRenderFunction<PaddingProps> = system.padding;
export const textColor: SystemRenderFunction<TextColorProps> = system.color;
export const typography: SystemRenderFunction<TypographyProps> =
  typographyStyleFn;
export const textAlign: SystemRenderFunction<TextAlignProps> = system.textAlign;
export const width: SystemRenderFunction<WidthProps> = system.width;
