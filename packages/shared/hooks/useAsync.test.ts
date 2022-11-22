import { renderHook } from '@testing-library/react-hooks';

import { useAsync, AbortedSignalError } from './useAsync';

test('run returns a promise which resolves with the attempt data', async () => {
  const returnValue = Symbol();
  const { result, waitForNextUpdate } = renderHook(() =>
    useAsync(() => Promise.resolve(returnValue))
  );

  let [, run] = result.current;
  const promise = run();
  await waitForNextUpdate();

  await expect(promise).resolves.toEqual([returnValue, null]);
});

test('run accepts an abort signal and returns a promise which resolves with the attempt data', async () => {
  const returnValue = Symbol();
  const abortController = new AbortController();
  const signal = abortController.signal;
  const { result, waitForNextUpdate } = renderHook(() =>
    useAsync(() => Promise.resolve(returnValue))
  );

  let [, run] = result.current;
  const promise = run(signal);
  await waitForNextUpdate();

  await expect(promise).resolves.toEqual([returnValue, null]);
});

test('run accepts an abort signal and returns a promise which resolves with an error state if the signal gets aborted', async () => {
  const returnValue = Symbol();
  const abortController = new AbortController();
  const signal = abortController.signal;
  const { result, waitForNextUpdate } = renderHook(() =>
    useAsync(() => Promise.resolve(returnValue))
  );

  let [, run] = result.current;
  const promise = run(signal);
  abortController.abort();
  await waitForNextUpdate();

  await expect(promise).resolves.toEqual([null, new AbortedSignalError()]);
});

test('run does not update attempt if the signal gets aborted', async () => {
  const returnValue = Symbol();
  const abortController = new AbortController();
  const signal = abortController.signal;
  const { result, waitForNextUpdate } = renderHook(() =>
    useAsync(() => Promise.resolve(returnValue))
  );

  let [, run] = result.current;
  run(signal);
  abortController.abort();
  await waitForNextUpdate();

  let [attempt] = result.current;
  expect(attempt.status).toBe('processing');
});

test('error path from run does not update attempt if the signal gets aborted', async () => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const { result, waitForNextUpdate } = renderHook(() =>
    useAsync(() => Promise.reject())
  );

  let [, run] = result.current;
  run(signal);
  abortController.abort();
  await waitForNextUpdate();

  let [attempt] = result.current;
  expect(attempt.status).toBe('processing');
});

test('type signature correctly resolves arguments to run when callback accepts no args', async () => {
  const returnValue = Symbol();
  const { result, waitForNextUpdate } = renderHook(() =>
    useAsync(() => Promise.resolve(returnValue))
  );
  const abortController = new AbortController();
  const signal = abortController.signal;

  let [, run] = result.current;
  run();
  await waitForNextUpdate();
  let [attempt] = result.current;
  expect(attempt.data).toBe(returnValue);

  [, run] = result.current;
  run(signal);
  await waitForNextUpdate();
  [attempt] = result.current;
  expect(attempt.data).toBe(returnValue);

  [, run] = result.current;
  // @ts-expect-error String is not assignable to AbortSignal.
  run('foo');
  // @ts-expect-error Expected 0-1 args but got 2.
  run('foo', 2);

  // @ts-expect-error Expected 0-1 args but got 2.
  run(signal, 'foo');
  // @ts-expect-error Expected 0-1 args but got 3.
  run(signal, 'foo', 2);

  // Need to await for the update, otherwise React will complain about `run` not being wrapped in
  // `act`.
  await waitForNextUpdate();
});

test('type signature correctly resolves arguments to run when callback accepts one arg', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useAsync((message: string) => Promise.resolve(message))
  );
  const abortController = new AbortController();
  const signal = abortController.signal;

  let [, run] = result.current;
  run('foo');
  await waitForNextUpdate();
  let [attempt] = result.current;
  expect(attempt.data).toBe('foo');

  [, run] = result.current;
  run(signal, 'foo');
  await waitForNextUpdate();
  [attempt] = result.current;
  expect(attempt.data).toBe('foo');

  [, run] = result.current;
  // @ts-expect-error Extra arg specified.
  run('foo', 2);
  // @ts-expect-error Wrong first arg.
  run(2);
  // @ts-expect-error Requires at least one arg.
  run();

  // @ts-expect-error Extra arg specified.
  run(signal, 'foo', 2);
  // @ts-expect-error Wrong second arg.
  run(signal, 2);
  // @ts-expect-error Expected 2 args.
  run(signal);

  // Need to await for the update, otherwise React will complain about `run` not being wrapped in
  // `act`.
  await waitForNextUpdate();
});

test('type signature correctly resolves arguments to run when callback accepts multiple args', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useAsync((message: string, count: number) =>
      Promise.resolve(message.repeat(count))
    )
  );
  const abortController = new AbortController();
  const signal = abortController.signal;

  let [, run] = result.current;
  run('foo', 2);
  await waitForNextUpdate();
  let [attempt] = result.current;
  expect(attempt.data).toBe('foofoo');

  [, run] = result.current;
  run(signal, 'foo', 2);
  await waitForNextUpdate();
  [attempt] = result.current;
  expect(attempt.data).toBe('foofoo');

  [, run] = result.current;
  // @ts-expect-error Extra arg specified.
  run('foo', 2, 'bar');
  // @ts-expect-error Wrong first arg.
  run(2, 'foo');
  // @ts-expect-error Wrong second arg.
  run('foo', 'bar');
  // @ts-expect-error Expected two args.
  run('foo');
  // @ts-expect-error Requires at least one arg.
  run();

  // @ts-expect-error Expected 3 args but got 4.
  run(signal, 'foo', 2, 'bar');
  // @ts-expect-error Wrong second arg.
  run(signal, 2, 'foo');
  // @ts-expect-error Wrong third arg.
  run(signal, 'foo', 'bar');
  // @ts-expect-error Expected 3 args but got 2.
  run(signal, 'foo');
  // @ts-expect-error Expected 3 args but got 1.
  run(signal);

  // Need to await for the update, otherwise React will complain about `run` not being wrapped in
  // `act`.
  await waitForNextUpdate();
});
