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

type State<T> = {
  data?: T;
  status: 'processing' | 'success' | 'error' | '';
  statusText: string;
};

type IsValidArg<T> = T extends object
  ? keyof T extends never
    ? false
    : true
  : true;

type Promisified<R, T extends Function> = T extends (
  ...args: any[]
) => Promise<any>
  ? T
  : T extends (
      a: infer A,
      b: infer B,
      c: infer C,
      d: infer D,
      e: infer E,
      f: infer F,
      g: infer G,
      h: infer H,
      i: infer I,
      j: infer J
    ) => Promise<R>
  ? IsValidArg<J> extends true
    ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => Promise<R>
    : IsValidArg<I> extends true
    ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => Promise<R>
    : IsValidArg<H> extends true
    ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => Promise<R>
    : IsValidArg<G> extends true
    ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => Promise<R>
    : IsValidArg<F> extends true
    ? (a: A, b: B, c: C, d: D, e: E, f: F) => Promise<R>
    : IsValidArg<E> extends true
    ? (a: A, b: B, c: C, d: D, e: E) => Promise<R>
    : IsValidArg<D> extends true
    ? (a: A, b: B, c: C, d: D) => Promise<R>
    : IsValidArg<C> extends true
    ? (a: A, b: B, c: C) => Promise<R>
    : IsValidArg<B> extends true
    ? (a: A, b: B) => Promise<R>
    : IsValidArg<A> extends true
    ? (a: A) => Promise<R>
    : () => Promise<R>
  : never;

export default function useAsync<R, T extends Function>(
  cb?: Promisified<R, T>
) {
  const [state, setState] = React.useState<State<R>>(() => ({
    data: null,
    status: '',
    statusText: '',
  }));

  const execute = async (...p: Parameters<Promisified<R, T>>) => {
    try {
      setState({
        ...state,
        status: 'processing',
      });

      const data = await cb.call(null, ...p);

      setState({
        ...state,
        status: 'success',
        data,
      });
    } catch (err) {
      setState({
        ...state,
        status: 'error',
        statusText: err.message,
        data: null,
      });
    }
  };

  return [state, execute, setState] as const;
}
