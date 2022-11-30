import { renderHook, act } from '@testing-library/react-hooks';

import { useAsync, AbortedSignalError } from './useAsync';

test('run returns a promise which resolves with the attempt data', async () => {
  const returnValue = Symbol();
  const { result, waitForNextUpdate } = renderHook(() =>
    useAsync(() => Promise.resolve(returnValue))
  );

  let [, run] = result.current;
  let promise: Promise<[symbol, Error]>;
  act(() => {
    promise = run();
  });
  await waitForNextUpdate();

  await expect(promise).resolves.toEqual([returnValue, null]);
});

test('run resolves the promise to an error and does not update the state on unmount when the callback returns a resolved promise', async () => {
  const { result, unmount } = renderHook(() =>
    useAsync(() => Promise.resolve(Symbol()))
  );

  let [, run] = result.current;
  let promise: Promise<[symbol, Error]>;
  act(() => {
    promise = run();
  });
  unmount();

  await expect(promise).resolves.toEqual([null, new AbortedSignalError()]);
  const [attempt] = result.current;
  expect(attempt.status).toBe('processing');
});

test('run resolves the promise to an error and does not update the state on unmount when the callback returns a rejected promise', async () => {
  const { result, unmount } = renderHook(() =>
    useAsync(() => Promise.reject(new Error('oops')))
  );

  let [, run] = result.current;
  let promise: Promise<[symbol, Error]>;
  act(() => {
    promise = run();
  });
  unmount();

  await expect(promise).resolves.toEqual([null, new AbortedSignalError()]);
  const [attempt] = result.current;
  expect(attempt.status).toBe('processing');
});

test('run resolves the promise to an error after being re-run when the callback returns a resolved promise', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useAsync((count: number) => Promise.resolve(count))
  );

  let [, run] = result.current;
  let firstRunPromise: Promise<[number, Error]>;
  act(() => {
    firstRunPromise = run(1);
  });

  act(() => {
    run(2);
  });
  await waitForNextUpdate();

  await expect(firstRunPromise).resolves.toEqual([
    null,
    new AbortedSignalError(),
  ]);
});

test('run does not update state after being re-run when the callback returns a resolved promise', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useAsync((count: number) => Promise.resolve(count))
  );

  let [, run] = result.current;
  act(() => {
    run(1);
  });
  const attemptAfterFirstRun = result.current[0];

  act(() => {
    run(2);
  });
  await waitForNextUpdate();

  expect(attemptAfterFirstRun.status).toBe('processing');
});

test('run resolves the promise to an error after being re-run when the callback returns a rejected promise', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useAsync((count: number) => Promise.reject(new Error(`oops ${count}`)))
  );

  let [, run] = result.current;
  let firstRunPromise: Promise<[number, Error]>;
  act(() => {
    firstRunPromise = run(1);
  });

  act(() => {
    run(2);
  });
  await waitForNextUpdate();

  await expect(firstRunPromise).resolves.toEqual([
    null,
    new AbortedSignalError(),
  ]);
});

test('run does not update state after being re-run when the callback returns a rejected promise', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useAsync((count: number) => Promise.reject(new Error(`oops ${count}`)))
  );

  let [, run] = result.current;
  act(() => {
    run(1);
  });
  const attemptAfterFirstRun = result.current[0];

  act(() => {
    run(2);
  });
  await waitForNextUpdate();

  expect(attemptAfterFirstRun.status).toBe('processing');
});
