import React from 'react';
import { render, screen } from 'design/utils/testing';
import {
  LoadedU2f,
  LoadedWebAuthn,
  Failed,
  QrCodeFailed,
} from './AddDevice.story';

test('render dialog to add a new mfa device with u2f as preferred type', () => {
  render(<LoadedU2f />);

  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});

test('render dialog to add a new mfa device with webauthn as preferred type', () => {
  render(<LoadedWebAuthn />);

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
