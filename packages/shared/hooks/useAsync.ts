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

import { useCallback, useState } from 'react';

/**
 * `useAsync` lets you represent the state of an async operation as data. It accepts an async function
 * that you want to execute. Calling the hook returns an array of three elements:
 *
 * * The first element is the representation of the attempt to run that async function as data, the
 *   so called attempt object.
 * * The second element is a function which when called starts to execute the async function.
 * * The third element is a function that lets you directly update the attempt object if needed.
 *
 *
 * @example
 * export function useUserProfile(userId) {
 *   const [fetchUserProfileAttempt, fetchUserProfile] = useAsync(async () => {
 *     return await fetch(`/users/${userId}`);
 *   })
 *
 *   return { fetchUserProfileAttempt, fetchUserProfile };
 * }
 *
 *
 * @example In the view layer you can use it like this:
 * function UserProfile(props) {
 *   const { fetchUserProfileAttempt, fetchUserProfile } = useUserProfile(props.id);
 *
 *   useEffect(() => {
 *     if (!fetchUserProfileAttempt.status) {
 *       fetchUserProfile()
 *     }
 *   }, [fetchUserProfileAttempt])
 *
 *    switch (fetchUserProfileAttempt.status) {
 *      case '':
 *      case 'processing':
 *        return <Spinner />;
 *      case 'error':
 *        return <ErrorMessage text={fetchUserProfileAttempt.statusText} />;
 *      case 'success':
 *       return <UserAvatar url={fetchUserProfileAttempt.data.avatarUrl} />;
 *    }
 * }
 */
export function useAsync<Callback extends (...args: unknown[]) => unknown>(
  cb?: Callback
) {
  const [state, setState] =
    useState<Attempt<Awaited<ReturnType<Callback>>>>(makeEmptyAttempt);

  const run = useCallback(
    (...p: Parameters<Callback>) =>
      Promise.resolve()
        .then(() => {
          setState(prevState => ({
            ...prevState,
            status: 'processing',
          }));

          return cb.call(null, ...p) as Awaited<ReturnType<Callback>>;
        })
        .then(
          data => {
            setState(prevState => ({
              ...prevState,
              status: 'success',
              data,
            }));

            return [data, null] as [Awaited<ReturnType<Callback>>, Error];
          },
          err => {
            setState(prevState => ({
              ...prevState,
              status: 'error',
              statusText: err?.message,
              data: null,
            }));

            return [null, err] as [Awaited<ReturnType<Callback>>, Error];
          }
        ),
    [setState, cb]
  );

  const setAttempt = useCallback(
    (attempt: Attempt<Awaited<ReturnType<Callback>>>) => {
      setState(attempt);
    },
    [setState]
  );

  return [state, run, setAttempt] as const;
}

export type Attempt<T> = {
  data?: T;
  status: 'processing' | 'success' | 'error' | '';
  statusText: string;
};

export function makeEmptyAttempt<T>(): Attempt<T> {
  return {
    data: null,
    status: '',
    statusText: '',
  };
}

export function makeSuccessAttempt<T>(data: T): Attempt<T> {
  return {
    data,
    status: 'success',
    statusText: '',
  };
}

export function makeProcessingAttempt<T>(): Attempt<T> {
  return {
    data: null,
    status: 'processing',
    statusText: '',
  };
}

export function makeErrorAttempt<T>(statusText: string): Attempt<T> {
  return {
    data: null,
    status: 'error',
    statusText,
  };
}
