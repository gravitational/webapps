import React from 'react';
import { render } from 'design/utils/testing';
import {
  Loaded,
  Failed,
  RestrictedTokenCreateFailed,
} from './ManageDevices.story';

test('render device dashboard', () => {
  const { container } = render(<Loaded />);

  expect(container.firstChild).toMatchSnapshot();
});

test('render failed state for fetching devices', () => {
  const { container } = render(<Failed />);

  expect(container.firstChild).toMatchSnapshot();
});

test('render failed state for creating restricted privilege token', () => {
  const { container } = render(<RestrictedTokenCreateFailed />);

  expect(container.firstChild).toMatchSnapshot();
});
