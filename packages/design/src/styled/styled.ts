/* eslint-disable @typescript-eslint/ban-types */ // so we can match `O extends obj = {}` from styled components
/* eslint-disable no-restricted-imports */ // so we can import styled-components
import React from 'react';

import actualStyled, {
  css,
  createGlobalStyle,
  keyframes,
  useTheme,
  StyleSheetManager,
  ThemeContext,
  ThemeProvider,
} from 'styled-components';

import { domElements } from 'design/styled/domElements';

import type { Theme } from '../theme';

import type {
  AnyStyledComponent,
  CSSObject,
  CSSProp,
  Interpolation,
  InterpolationFunction,
  StyledComponent,
  StyledComponentInnerAttrs,
  StyledComponentInnerComponent,
  StyledComponentInnerOtherProps,
  StyledComponentPropsWithRef,
  StyledConfig,
  ThemedStyledFunction,
  ThemedStyledProps,
} from 'styled-components';

import type { SystemRenderFunction, UnionToIntersection } from './enhancers';

type UnwrapSystemRenderFunction<T> = T extends SystemRenderFunction<infer U>
  ? U
  : T;

interface CustomThemedStyledFunctionBase<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  T extends object,
  O extends object = {},
  A extends keyof any = never
> {
  <
    SystemFunction extends SystemRenderFunction<any> = SystemRenderFunction<any>
  >(
    first: Iterable<SystemFunction>
  ): ThemedStyledFunction<
    C,
    T,
    O & UnionToIntersection<UnwrapSystemRenderFunction<SystemFunction>>,
    A
  >;

  <
    U extends object,
    SystemFunction extends SystemRenderFunction<any> = SystemRenderFunction<any>
  >(
    first: Iterable<SystemFunction>
  ): ThemedStyledFunction<
    C,
    T,
    O & U & UnionToIntersection<UnwrapSystemRenderFunction<SystemFunction>>,
    A
  >;

  <
    SystemFunction extends SystemRenderFunction<any> = SystemRenderFunction<any>
  >(
    first: Iterable<SystemFunction>,
    ...rest: Array<
      Interpolation<ThemedStyledProps<StyledComponentPropsWithRef<C> & O, T>>
    >
  ): ThemedStyledFunction<
    C,
    T,
    O & UnionToIntersection<UnwrapSystemRenderFunction<SystemFunction>>,
    A
  >;

  <
    U extends object,
    SystemFunction extends SystemRenderFunction<any> = SystemRenderFunction<any>
  >(
    first: Iterable<SystemFunction>,
    ...rest: Array<
      Interpolation<ThemedStyledProps<StyledComponentPropsWithRef<C> & O, T>>
    >
  ): ThemedStyledFunction<
    C,
    T,
    O & U & UnionToIntersection<UnwrapSystemRenderFunction<SystemFunction>>,
    A
  >;

  (first: TemplateStringsArray): StyledComponent<C, T, O, A>;

  (
    first:
      | TemplateStringsArray
      | CSSObject
      | InterpolationFunction<
          ThemedStyledProps<StyledComponentPropsWithRef<C> & O, T>
        >,
    ...rest: Array<
      Interpolation<ThemedStyledProps<StyledComponentPropsWithRef<C> & O, T>>
    >
  ): StyledComponent<C, T, O, A>;

  <U extends object>(
    first:
      | TemplateStringsArray
      | CSSObject
      | InterpolationFunction<
          ThemedStyledProps<StyledComponentPropsWithRef<C> & O & U, T>
        >,
    ...rest: Array<
      Interpolation<
        ThemedStyledProps<StyledComponentPropsWithRef<C> & O & U, T>
      >
    >
  ): StyledComponent<C, T, O & U, A>;

  (first: TemplateStringsArray): StyledComponent<C, T, O, A>;

  (
    first:
      | TemplateStringsArray
      | CSSObject
      | InterpolationFunction<
          ThemedStyledProps<StyledComponentPropsWithRef<C> & O, T>
        >,
    ...rest: Array<
      Interpolation<ThemedStyledProps<StyledComponentPropsWithRef<C> & O, T>>
    >
  ): StyledComponent<C, T, O, A>;

  <U extends object>(
    first:
      | TemplateStringsArray
      | CSSObject
      | InterpolationFunction<
          ThemedStyledProps<StyledComponentPropsWithRef<C> & O & U, T>
        >,
    ...rest: Array<
      Interpolation<
        ThemedStyledProps<StyledComponentPropsWithRef<C> & O & U, T>
      >
    >
  ): StyledComponent<C, T, O & U, A>;
}

type ThemedStyledComponentFactories<T extends object> = {
  [TTag in keyof JSX.IntrinsicElements]: CustomThemedStyledFunction<TTag, T>;
};

export interface CustomThemedStyledFunction<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  T extends object,
  O extends object = {},
  A extends keyof any = never
> extends CustomThemedStyledFunctionBase<C, T, O, A> {
  // Fun thing: 'attrs' can also provide a polymorphic 'as' prop
  // My head already hurts enough so maybe later...
  attrs<
    U,
    NewA extends Partial<StyledComponentPropsWithRef<C> & U> & {
      [others: string]: any;
    } = any
  >(
    attrs: Attrs<StyledComponentPropsWithRef<C> & U, NewA, T>
  ): CustomThemedStyledFunction<C, T, O & NewA, A | keyof NewA>;

  withConfig: <Props extends O = O>(
    config: StyledConfig<StyledComponentPropsWithRef<C> & Props>
  ) => CustomThemedStyledFunction<C, T, Props, A>;
}

interface ThemedBaseStyledInterface<T extends object>
  extends ThemedStyledComponentFactories<T> {
  <C extends AnyStyledComponent>(component: C): ThemedStyledFunction<
    StyledComponentInnerComponent<C>,
    T,
    StyledComponentInnerOtherProps<C>,
    StyledComponentInnerAttrs<C>
  >;

  <
    Props extends object,
    Element extends AnyStyledComponent,
    SystemFunction extends SystemRenderFunction<any> = SystemRenderFunction<any>
  >(
    component: Element,
    enhancers: Iterable<SystemFunction>
  ): ThemedStyledFunction<
    StyledComponentInnerComponent<Element>,
    T,
    StyledComponentInnerOtherProps<Element> &
      Props &
      UnionToIntersection<UnwrapSystemRenderFunction<SystemFunction>>
  >;

  <
    Props extends object,
    Element extends keyof JSX.IntrinsicElements | React.ComponentType<any> = any
  >(
    component: Element
  ): ThemedStyledFunction<Element, T, Props>;

  <
    Props extends object,
    Element extends
      | keyof JSX.IntrinsicElements
      | React.ComponentType<any> = any,
    SystemFunction extends SystemRenderFunction<any> = SystemRenderFunction<any>
  >(
    component: Element,
    enhancers: Iterable<SystemFunction>
  ): ThemedStyledFunction<
    Element,
    T,
    Props & UnionToIntersection<UnwrapSystemRenderFunction<SystemFunction>>
  >;
}

type Attrs<P, A extends Partial<P>, T> =
  | ((props: ThemedStyledProps<P, T>) => A)
  | A;

export type ThemedStyledInterface<T extends object> =
  ThemedBaseStyledInterface<T>;
export type StyledInterface = ThemedStyledInterface<Theme>;

function createStyledFunction<
  Props extends object,
  Element extends keyof JSX.IntrinsicElements | React.ComponentType<any> = any,
  T extends SystemRenderFunction<any> = SystemRenderFunction<any>
>(
  element: Element,
  enhancers: Iterable<T> = [],
  options: {
    attrs?: Attrs<StyledComponentPropsWithRef<Element>, any, Theme>;
    config?: StyledConfig<StyledComponentPropsWithRef<Element> & Props>;
  } = {}
) {
  function styledFunction<Props>(
    first:
      | TemplateStringsArray
      | CSSObject
      | InterpolationFunction<
          ThemedStyledProps<StyledComponentPropsWithRef<Element> & Props, T>
        >,
    ...rest: Array<
      Interpolation<
        ThemedStyledProps<StyledComponentPropsWithRef<Element> & Props, T>
      >
    >
  ) {
    rest.push(function (props) {
      const result = {};

      for (const enhancer of enhancers) {
        Object.assign(result, enhancer(props));
      }

      return result;
    });

    return actualStyled(element)
      .attrs(options.attrs)
      .withConfig(options.config)(first, ...rest);
  }

  styledFunction.attrs = function attrs<
    U,
    NewA extends Partial<StyledComponentPropsWithRef<Element> & U> & {
      [others: string]: any;
    } = any
  >(attrs: Attrs<StyledComponentPropsWithRef<Element> & U, NewA, T>) {
    return createStyledFunction(element, enhancers, { attrs });
  };

  styledFunction.withConfig = function withConfig<
    NewProps extends Props = Props
  >(config: StyledConfig<StyledComponentPropsWithRef<Element> & NewProps>) {
    return createStyledFunction(element, enhancers, { config });
  };

  return styledFunction;
}

function customStyled<
  Props extends object,
  Element extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  T extends SystemRenderFunction<any> = SystemRenderFunction<any>
>(element: Element, enhancers: Iterable<T> = []) {
  return createStyledFunction<
    Props & UnionToIntersection<UnwrapSystemRenderFunction<T>>,
    Element
  >(element, enhancers);
}

export const styled = customStyled as StyledInterface;

function isEnhancers<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  T extends object,
  O extends object = {},
  SystemFunction extends SystemRenderFunction<any> = SystemRenderFunction<any>
>(
  first:
    | Iterable<SystemFunction>
    | TemplateStringsArray
    | CSSObject
    | InterpolationFunction<
        ThemedStyledProps<StyledComponentPropsWithRef<C> & O, T>
      >
): first is Iterable<SystemFunction> {
  return (
    Array.isArray(first) && first.every(item => typeof item === 'function')
  );
}

function customStyledElement<
  Props extends object,
  Element extends keyof JSX.IntrinsicElements | React.ComponentType<any>
>(
  element: Element,
  options: {
    attrs?: Attrs<StyledComponentPropsWithRef<Element>, any, Theme>;
    config?: StyledConfig<StyledComponentPropsWithRef<Element> & Props>;
  } = {}
) {
  function styledFunction<
    T extends SystemRenderFunction<any> = SystemRenderFunction<any>
  >(
    first:
      | Iterable<T>
      | TemplateStringsArray
      | CSSObject
      | InterpolationFunction<
          ThemedStyledProps<StyledComponentPropsWithRef<Element> & Props, Theme>
        >,
    ...rest: Array<
      Interpolation<
        ThemedStyledProps<StyledComponentPropsWithRef<Element> & Props, Theme>
      >
    >
  ) {
    if (isEnhancers(first)) {
      return createStyledFunction<
        Props & UnionToIntersection<UnwrapSystemRenderFunction<T>>,
        Element
      >(element, first, options);
    }

    return createStyledFunction<
      Props & UnionToIntersection<UnwrapSystemRenderFunction<T>>,
      Element
    >(element, [], options).call(null, first, ...rest);
  }

  styledFunction.attrs = function attrs<
    U,
    NewA extends Partial<StyledComponentPropsWithRef<Element> & U> & {
      [others: string]: any;
    } = any
  >(attrs: Attrs<StyledComponentPropsWithRef<Element> & U, NewA, Theme>) {
    return customStyledElement(element, { attrs });
  };

  styledFunction.withConfig = function withConfig<
    NewProps extends Props = Props
  >(config: StyledConfig<StyledComponentPropsWithRef<Element> & NewProps>) {
    return customStyledElement(element, { config });
  };

  return styledFunction;
}

interface ThemeStyledFunctionWrapper<
  T extends object,
  Props extends object,
  Element extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  S extends SystemRenderFunction<any> = SystemRenderFunction<any>
> {
  (first: Iterable<S>): ThemedStyledFunction<
    Element,
    T,
    Props & UnionToIntersection<UnwrapSystemRenderFunction<S>>
  >;

  (
    first:
      | Iterable<S>
      | TemplateStringsArray
      | CSSObject
      | InterpolationFunction<
          ThemedStyledProps<StyledComponentPropsWithRef<Element> & Props, T>
        >,
    ...rest: Array<
      Interpolation<
        ThemedStyledProps<StyledComponentPropsWithRef<Element> & Props, T>
      >
    >
  ): ThemedStyledFunction<
    Element,
    T,
    Props & UnionToIntersection<UnwrapSystemRenderFunction<S>>
  >;

  <U extends object>(
    first:
      | TemplateStringsArray
      | CSSObject
      | InterpolationFunction<
          ThemedStyledProps<StyledComponentPropsWithRef<Element> & Props & U, T>
        >,
    ...rest: Array<
      Interpolation<
        ThemedStyledProps<StyledComponentPropsWithRef<Element> & Props & U, T>
      >
    >
  ): ThemedStyledFunction<
    Element,
    T,
    Props & U & UnionToIntersection<UnwrapSystemRenderFunction<S>>
  >;

  (first: TemplateStringsArray): StyledComponent<Element, T, Props>;

  (
    first:
      | TemplateStringsArray
      | CSSObject
      | InterpolationFunction<
          ThemedStyledProps<StyledComponentPropsWithRef<Element> & Props, T>
        >,
    ...rest: Array<
      Interpolation<
        ThemedStyledProps<StyledComponentPropsWithRef<Element> & Props, T>
      >
    >
  ): StyledComponent<Element, T, Props>;

  <U extends object>(
    first:
      | TemplateStringsArray
      | CSSObject
      | InterpolationFunction<
          ThemedStyledProps<StyledComponentPropsWithRef<Element> & Props & U, T>
        >,
    ...rest: Array<
      Interpolation<
        ThemedStyledProps<StyledComponentPropsWithRef<Element> & Props & U, T>
      >
    >
  ): StyledComponent<Element, T, Props & U>;
}

interface CustomThemedBaseStyledInterface<T extends object> {
  <C extends AnyStyledComponent>(component: C): ThemedStyledFunction<
    StyledComponentInnerComponent<C>,
    T,
    StyledComponentInnerOtherProps<C>,
    StyledComponentInnerAttrs<C>
  >;

  <
    Props extends object,
    Element extends keyof JSX.IntrinsicElements | React.ComponentType<any> = any
  >(
    component: Element
  ): ThemeStyledFunctionWrapper<T, Props, Element>;
}

export type CustomThemedStyledInterface<T extends object> =
  CustomThemedBaseStyledInterface<T>;
export type CustomStyledInterface = CustomThemedStyledInterface<Theme>;

const styledElement = customStyledElement as CustomStyledInterface;

for (const element of domElements) {
  styled[element] = styledElement(element);
}

export {
  css,
  keyframes,
  createGlobalStyle,
  useTheme,
  ThemeContext,
  ThemeProvider,
  StyleSheetManager,
};

export type { CSSProp };
