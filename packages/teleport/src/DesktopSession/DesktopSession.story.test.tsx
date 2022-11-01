import React from 'react';
import 'jest-canvas-mock';
import { render } from 'design/utils/testing';
import {
  Processing,
  TdpProcessing,
  ConnectedSettingsFalse,
  ConnectedSettingsTrue,
  Disconnected,
  FetchError,
  ConnectionError,
  UnintendedDisconnect,
  WebAuthnPrompt,
  AnotherSessionActive,
} from './DesktopSession.story';

test('processing', () => {
  const { container } = render(<Processing />);
  expect(container).toMatchSnapshot();
});

test('tdp processing', () => {
  const { container } = render(<TdpProcessing />);
  expect(container).toMatchSnapshot();
});

test('connected settings false', () => {
  const { container } = render(<ConnectedSettingsFalse />);
  expect(container).toMatchSnapshot();
});

test('connected settings true', () => {
  const { container } = render(<ConnectedSettingsTrue />);
  expect(container).toMatchSnapshot();
});

test('disconnected', () => {
  const { container } = render(<Disconnected />);
  expect(container).toMatchSnapshot();
});

test('fetch error', () => {
  const { container } = render(<FetchError />);
  expect(container).toMatchSnapshot();
});

test('connection error', () => {
  const { container } = render(<ConnectionError />);
  expect(container).toMatchSnapshot();
});

test('unintended disconnect', () => {
  const { container } = render(<UnintendedDisconnect />);
  expect(container).toMatchSnapshot();
});

test('webauthn prompt', () => {
  const { container } = render(<WebAuthnPrompt />);
  expect(container).toMatchSnapshot();
});

test('another session active', () => {
  const { getByTestId } = render(<AnotherSessionActive />);
  expect(getByTestId('Modal')).toMatchSnapshot();
});
