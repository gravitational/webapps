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

import React from 'react';
import { act, fireEvent, render } from 'design/utils/testing';
import { CopyURLDialog } from 'teleport/Player/ProgressBar/CopyURLDialog/CopyURLDialog';
import { defaultProps } from 'teleport/Player/ProgressBar/CopyURLDialog/CopyURLDialog.story';

test('closed component', () => {
  const { queryAllByText } = render(
    <CopyURLDialog {...defaultProps} open={false} />
  );

  expect(queryAllByText(defaultProps.url)).toHaveLength(0);
});

describe('open CopyURLDialog', () => {
  let cb;
  let rendered;
  beforeEach(() => {
    cb = jest.fn();
    rendered = render(<CopyURLDialog {...defaultProps} onClose={cb} />);
  });

  test('component callbacks on close', () => {
    fireEvent.click(rendered.getByText(/close/i));

    expect(cb).toHaveBeenCalled();
  });

  // eslint-disable-next-line jest/expect-expect
  test('component shows descriptions', () => {
    expectText(rendered, defaultProps.dialogTitle as string);
    expectText(rendered, defaultProps.contentText as string);
    expectText(rendered, defaultProps.url);
  });

  test('open in new tab', () => {
    const mock = withMockWindowOpen(() =>
      fireEvent.click(rendered.getByText(/open/i))
    );

    expect(mock).toHaveBeenCalledWith(defaultProps.url);
  });

  test('copy to clipboard', async () => {
    const mock = await withMockClipboard(() =>
      fireEvent.click(rendered.getByText(/copy/i))
    );

    expect(mock).toHaveBeenCalledWith(defaultProps.url);
  });
});

function expectText(rendered: any, text: string) {
  expect(rendered.queryAllByText(text).length).toBeGreaterThanOrEqual(1);
}

async function withMockClipboard(operaton: () => void) {
  const exec = document.execCommand;
  document.execCommand = () => false; // fall to testable implementation

  const promise = Promise.resolve();
  const mock = jest.fn(() => promise);

  const clipboard = navigator.clipboard;

  // unfortunately not mockable by jest.spyOn, I'm forced to cheat type check
  const nav: any = navigator;
  nav.clipboard = {
    writeText: mock,
  };

  operaton();

  // reset globals
  document.execCommand = exec;

  nav.clipboard = clipboard;

  await act(() => promise);
  return mock;
}

function withMockWindowOpen(operation: () => void) {
  const mockedOpen = jest.fn();
  const open = window.open;
  window.open = mockedOpen;

  operation();

  window.open = open;
  return mockedOpen;
}
