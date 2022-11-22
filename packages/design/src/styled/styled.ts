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

/*
  This file is mostly copied from `@types/styled-components` but modified to allow for the composition of
  enhancers from `styled-system`.

  There are comments as to what bits are ours, and what they're doing, as well as comments about what has
  directly come from `@types/styled-components`.
 */

// This is ours, for our custom `SystemRenderFunction` type. This extracts the props from the generic
// SystemRenderFunction<P> (we get `P`)
type UnwrapSystemRenderFunction<T> = T extends SystemRenderFunction<infer U>
  ? U
  : T;

// This is based off of styled-components `ThemedStyledFunctionBase`, to allow us to add a different constructor signature.
interface CustomThemedStyledFunctionBase<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  T extends object,
  O extends object = {},
  A extends keyof any = never
> {
  // We've added this to the type, to allow for the construction of `styled([enhancer1, enhancer2])`
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

  // We've added this to the type, to allow for the construction of `styled([enhancer1, enhancer2])<CustomTypes>`
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

  // We've added this to the type, to allow for the construction of `styled([enhancer1, enhancer2])`
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

  // We've added this to the type, to allow for the construction of `styled([enhancer1, enhancer2])<CustomTypes>`
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

  // This is from styled-components
  (first: TemplateStringsArray): StyledComponent<C, T, O, A>;

  // This is from styled-components
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

  // This is from styled-components
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

  // This is from styled-components
  (first: TemplateStringsArray): StyledComponent<C, T, O, A>;

  // This is from styled-components
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

  // This is from styled-components
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

// This is copied from styled-components, but adapted to return our `CustomThemedStyledFunction` above
// instead of the usual `ThemedStyledFunction`.
// This is for typing `styled.div`, `styled.h1`, etc.
type ThemedStyledComponentFactories<T extends object> = {
  [TTag in keyof JSX.IntrinsicElements]: CustomThemedStyledFunction<TTag, T>;
};

// This is copied from styled-components, but we've changed the return type to `CustomThemedStyledFunction` above,
// instead of `ThemedStyledFunction`.
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

// This is copied from styled-components, but adapted to allow us to add enhancers to the constructor signatures.
interface ThemedBaseStyledInterface<T extends object>
  extends ThemedStyledComponentFactories<T> {
  // This is copied from styled-components
  <C extends AnyStyledComponent>(component: C): ThemedStyledFunction<
    StyledComponentInnerComponent<C>,
    T,
    StyledComponentInnerOtherProps<C>,
    StyledComponentInnerAttrs<C>
  >;

  // We've added this to allow for styled(StyledComponent, [enhancer1, enhancer2]).
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

  // This is copied from styled-components
  <
    Element extends keyof JSX.IntrinsicElements | React.ComponentType<any> = any
  >(
    component: Element
  ): ThemedStyledFunction<Element, T>;

  // We've added this to allow for styled('div', [enhancer1, enhancer2]).
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

// This is copied from styled-components as they do not export it.
type Attrs<P, A extends Partial<P>, T> =
  | ((props: ThemedStyledProps<P, T>) => A)
  | A;

// This is copied from styled-components as we need it to return our custom types above
// instead of the default styled-components types
export type ThemedStyledInterface<T extends object> =
  ThemedBaseStyledInterface<T>;
export type StyledInterface = ThemedStyledInterface<Theme>;

// This is pretty much the same way that styled-components will create `styled` under the hood.
// We have just modified it to allow for enhancers to be passed in.
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

// This is a wrapper around `createStyledFunction` that allows `styled` to be typed with
// the ability of adding enhancers.
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

// This follows a similar pattern to styled-components, but adds enhancers before the styles.
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
    // this allows for enhancers to be passed in
    if (isEnhancers(first)) {
      return createStyledFunction<
        Props & UnionToIntersection<UnwrapSystemRenderFunction<T>>,
        Element
      >(element, first, options);
    }

    // this will just return as if you're using styled-components without enhancers
    return createStyledFunction<Props, Element>(element, [], options).call(
      null,
      first,
      ...rest
    );
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

// This is copied from styled-components but adapted to allow for enhancers to be passed in the constructor
interface ThemeStyledFunctionWrapper<
  T extends object,
  Props extends object,
  Element extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  S extends SystemRenderFunction<any> = SystemRenderFunction<any>
> {
  // We've added this to allow for styled.element([enhancer1, enhancer2])
  (first: Iterable<S>): ThemedStyledFunction<
    Element,
    T,
    Props & UnionToIntersection<UnwrapSystemRenderFunction<S>>
  >;

  // We've added this to allow for styled.element([enhancer1, enhancer2])
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

  // This is from styled-components
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

  // This is from styled-components
  (first: TemplateStringsArray): StyledComponent<Element, T, Props>;

  // This is from styled-components
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

  // This is from styled-components
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

// This is copied from styled-components but changed to return our custom types above
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

// This is created to allow us to have styled.element and have them themed and typed correctly.
// It's based off of `ThemedStyledInterface` from styled-components, just using the types
// we have in this file instead of the default styled-components types.
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
