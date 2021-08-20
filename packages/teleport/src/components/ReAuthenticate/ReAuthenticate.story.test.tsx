import React from 'react';
import { render, screen } from 'design/utils/testing';
import { Loaded, Failed } from './ReAuthenticate.story';

test('render re-authentication dialog', () => {
  render(<Loaded />);

  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});

test('render failed state for re-authentication dialog', () => {
  render(<Failed />);

  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});
