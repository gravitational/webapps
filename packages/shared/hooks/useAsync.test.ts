import { renderHook, act } from '@testing-library/react-hooks';

import { useAsync, CanceledError } from './useAsync';

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

  await expect(promise).resolves.toEqual([null, new CanceledError()]);
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

  await expect(promise).resolves.toEqual([null, new CanceledError()]);
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

  await expect(firstRunPromise).resolves.toEqual([null, new CanceledError()]);
});

test('run does not update state after being re-run when the callback returns a resolved promise', async () => {
  let resolveFirstPromise, resolveSecondPromise;
  const firstPromise = new Promise(resolve => {
    resolveFirstPromise = resolve;
  });
  const secondPromise = new Promise(resolve => {
    resolveSecondPromise = resolve;
  });

  const { result } = renderHook(() =>
    // Passing a promise lets us control when the callback resolves.
    useAsync((promise: Promise<unknown>) => promise)
  );

  let [, run] = result.current;
  await act(async () => {
    // Start two runs, one after the other.
    const firstRunPromise = run(firstPromise);
    const secondRunPromise = run(secondPromise);

    // Once the first promise resolves, it should see that another one was started. The first
    // promise should return early with an error.
    resolveFirstPromise();
    await firstRunPromise;

    const attemptAfterFirstPromise = result.current[0];
    expect(attemptAfterFirstPromise.status).toBe('processing');

    resolveSecondPromise();
    await secondRunPromise;
  });
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

  await expect(firstRunPromise).resolves.toEqual([null, new CanceledError()]);
});

test('run does not update state after being re-run when the callback returns a rejected promise', async () => {
  let rejectFirstPromise, rejectSecondPromise;
  const firstPromise = new Promise((resolve, reject) => {
    rejectFirstPromise = reject;
  });
  const secondPromise = new Promise((resolve, reject) => {
    rejectSecondPromise = reject;
  });

  const { result } = renderHook(() =>
    // Passing a promise lets us control when the callback resolves.
    useAsync((promise: Promise<unknown>) => promise)
  );

  let [, run] = result.current;
  await act(async () => {
    // Start two runs, one after the other.
    const firstRunPromise = run(firstPromise);
    const secondRunPromise = run(secondPromise);

    // Once the first promise resolves, it should see that another one was started. The first
    // promise should return early with an error.
    rejectFirstPromise();
    await firstRunPromise;

    const attemptAfterFirstPromise = result.current[0];
    expect(attemptAfterFirstPromise.status).toBe('processing');

    rejectSecondPromise();
    await secondRunPromise;
  });
});
