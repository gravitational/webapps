import React from 'react';
import { Initial, Processing, Failed } from './UserDialogDelete.story';
import { render } from 'design/utils/testing';

test('initial state', () => {
  const { getByTestId } = render(<Initial />);
  expect(getByTestId('Modal')).toMatchSnapshot();
});

test('processing state', () => {
  const { getByTestId } = render(<Processing />);
  expect(getByTestId('Modal')).toMatchSnapshot();
});

test('failed state', () => {
  const { getByTestId } = render(<Failed />);
  expect(getByTestId('Modal')).toMatchSnapshot();
});
