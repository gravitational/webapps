import React from 'react';
import {
  Initial,
  Processing,
  Failed,
  Success,
} from './UserDialogResetPassword.story';
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

test('success state', () => {
  const { getByTestId } = render(<Success />);
  expect(getByTestId('Modal')).toMatchSnapshot();
});
