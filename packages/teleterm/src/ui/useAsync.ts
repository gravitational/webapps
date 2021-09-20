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

type Params<T> = () => Promise<T>;

export default function useAsync<T>(cb: Params<T>) {
  const [response, setResponse] = React.useState<State<T>>(() => ({
    data: null,
    status: '',
    statusText: '',
  }));

  const cbRef = React.useRef<Params<T>>();

  cbRef.current = cb;

  const execute = async () => {
    try {
      setResponse({
        ...response,
        status: 'processing',
      });

      const data = await cbRef.current();

      setResponse({
        ...response,
        status: 'success',
        data,
      });
    } catch (err) {
      setResponse({
        ...response,
        status: 'error',
        statusText: err.message,
        data: null,
      });
    }
  };

  return [response, execute] as const;
}
