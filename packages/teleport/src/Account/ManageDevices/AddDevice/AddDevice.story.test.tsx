import React from 'react';
import { render, screen } from 'design/utils/testing';
import { Loaded, Failed, QrCodeFailed } from './AddDevice.story';

test('render dialog to add a new mfa device', () => {
  render(<Loaded />);

  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});

test('render failed state for dialog to add a new mfa device', () => {
  render(<Failed />);

  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});

test('render failed state for fetching QR Code for dialog to add a new mfa device', () => {
  render(<QrCodeFailed />);

  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});
