/**
 * Copyright 2020 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import renderHook from 'design/utils/renderHook';
import ConsoleContext from './consoleContext';
import useOnExitConfirmation from './useOnExitConfirmation';

afterEach(() => {
  jest.clearAllMocks();
});

test('blank and nodes docs', () => {
  const ctx = new ConsoleContext();
  ctx.storeDocs.add({
    kind: 'nodes',
  });

  const docs = ctx.getDocuments();
  const { current } = renderHook(() => useOnExitConfirmation(ctx));

  // test blank doc
  jest.spyOn(window, 'confirm').mockReturnValue(false);
  let retVal = current.verifyAndConfirm(docs[0]);
  expect(retVal).toBe(true);
  expect(window.confirm).not.toHaveBeenCalled();

  // test nodes doc
  retVal = current.verifyAndConfirm(docs[1]);
  expect(retVal).toBe(true);
  expect(window.confirm).not.toHaveBeenCalled();

  // test beforeUnload
  const event = new Event('beforeunload');
  jest.spyOn(event, 'preventDefault');
  window.dispatchEvent(event);
  expect(event.preventDefault).not.toHaveBeenCalled();
});

test('just created (new) terminal doc', () => {
  const ctx = new ConsoleContext();
  ctx.storeDocs.add({
    kind: 'terminal',
    status: 'connected',
    created: new Date(),
  });

  const docs = ctx.getDocuments();
  const { current } = renderHook(() => useOnExitConfirmation(ctx));

  // test maxTimeOpened
  let retVal = current.maxTimeOpened(docs[1].created);
  expect(retVal).toBe(false);

  // test verifyAndConfirm
  jest.spyOn(window, 'confirm').mockReturnValue(false);
  retVal = current.verifyAndConfirm(docs[1]);
  expect(retVal).toBe(true);
  expect(window.confirm).not.toHaveBeenCalled();

  // test beforeUnload
  const event = new Event('beforeunload');
  jest.spyOn(event, 'preventDefault');
  window.dispatchEvent(event);
  expect(event.preventDefault).not.toHaveBeenCalled();
});

test('old (active) terminal doc', () => {
  const ctx = new ConsoleContext();
  ctx.storeDocs.add({
    kind: 'terminal',
    status: 'connected',
    created: new Date('2019-04-01'),
  });

  const docs = ctx.getDocuments();
  const { current } = renderHook(() => useOnExitConfirmation(ctx));

  // test maxTimeOpened
  let retVal = current.maxTimeOpened(docs[1].created);
  expect(retVal).toBe(true);

  // test verifyAndConfirm
  jest.spyOn(window, 'confirm').mockReturnValue(false);
  retVal = current.verifyAndConfirm(docs[1]);
  expect(retVal).toBe(false);
  expect(window.confirm).toHaveReturnedWith(false);

  // test beforeUnload
  const event = new Event('beforeunload');
  jest.spyOn(event, 'preventDefault');
  window.dispatchEvent(event);
  expect(event.preventDefault).toHaveBeenCalledTimes(1);
});
