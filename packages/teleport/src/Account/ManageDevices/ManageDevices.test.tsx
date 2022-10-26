/*
Copyright 2021-2022 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    */

import React from 'react';
import { render, fireEvent, screen, waitFor } from 'design/utils/testing';
import { within } from '@testing-library/react';

import { Context, ContextProvider } from 'teleport';
import authService from 'teleport/services/auth';

import cfg from 'teleport/config';

import ManageDevices from './ManageDevices';

const privilegeToken = 'privilegeToken123';
const restrictedPrivilegeToken = 'restrictedPrivilegeToken123';

const twoDevices = [
  {
    id: '1',
    description: 'Authenticator App',
    name: 'iphone 12',
    registeredDate: new Date(1628799417000),
    lastUsedDate: new Date(1628799417000),
  },
  {
    id: '2',
    description: 'Hardware Key',
    name: 'yubikey',
    registeredDate: new Date(1623722252000),
    lastUsedDate: new Date(1623981452000),
  },
];

describe('mfa device dashboard testing', () => {
  const setup = ({ devices = twoDevices } = {}) => {
    const ctx = new Context();
    jest.spyOn(ctx.mfaService, 'fetchDevices').mockResolvedValue(devices);

    jest
      .spyOn(authService, 'createMfaRegistrationChallenge')
      .mockResolvedValue({
        qrCode: '123456',
        webauthnPublicKey: null,
      });

    jest.spyOn(ctx.mfaService, 'addNewTotpDevice').mockResolvedValue({});

    jest.spyOn(ctx.mfaService, 'addNewWebauthnDevice').mockResolvedValue({});

    jest.spyOn(ctx.mfaService, 'removeDevice').mockResolvedValue({});

    jest.spyOn(cfg, 'getAuth2faType').mockReturnValue('optional');

    jest.spyOn(authService, 'checkWebauthnSupport').mockResolvedValue();

    jest
      .spyOn(authService, 'createPrivilegeTokenWithTotp')
      .mockResolvedValue(privilegeToken);

    jest
      .spyOn(authService, 'createPrivilegeTokenWithWebauthn')
      .mockResolvedValue(privilegeToken);

    jest
      .spyOn(authService, 'createRestrictedPrivilegeToken')
      .mockResolvedValue(restrictedPrivilegeToken);

    render(
      <ContextProvider ctx={ctx}>
        <ManageDevices />
      </ContextProvider>
    );

    return { ctx };
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('re-authenticating with totp and adding a webauthn device', async () => {
    const { ctx } = setup();

    fireEvent.click(await screen.findByText(/add two-factor device/i));

    expect(screen.getByText('Verify your identity')).toBeInTheDocument();

    const reAuthMfaSelectEl = within(
      screen.getByTestId('mfa-select')
    ).getByRole('textbox');
    fireEvent.keyDown(reAuthMfaSelectEl, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.click(screen.getAllByText(/authenticator app/i)[1]);

    const tokenField = screen.getByPlaceholderText('123 456');
    fireEvent.change(tokenField, { target: { value: '321321' } });

    fireEvent.click(screen.getByText('Continue'));

    expect(authService.createPrivilegeTokenWithTotp).toHaveBeenCalledWith(
      '321321'
    );

    await screen.findByText('Add New Two-Factor Device');

    const deviceNameField = screen.getByPlaceholderText('Name');
    fireEvent.change(deviceNameField, { target: { value: 'yubikey' } });

    fireEvent.click(screen.getByText('Add device'));

    await waitFor(() => {
      expect(ctx.mfaService.addNewWebauthnDevice).toHaveBeenCalledWith(
        expect.objectContaining({
          tokenId: privilegeToken,
          deviceName: 'yubikey',
        })
      );
    });
  });

  test('re-authenticating with webauthn and adding a totp device', async () => {
    jest.spyOn(cfg, 'getPreferredMfaType').mockReturnValue('webauthn');
    const { ctx } = setup();

    fireEvent.click(await screen.findByText(/add two-factor device/i));

    expect(screen.getByText('Verify your identity')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Continue'));

    expect(authService.createPrivilegeTokenWithWebauthn).toHaveBeenCalled();

    await screen.findByText('Add New Two-Factor Device');

    const addDeviceMfaSelectEl = within(
      screen.getByTestId('mfa-select')
    ).getByRole('textbox');
    fireEvent.keyDown(addDeviceMfaSelectEl, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.click(screen.getAllByText(/authenticator app/i)[1]);

    const addDeviceTokenField = screen.getByPlaceholderText('123 456');
    fireEvent.change(addDeviceTokenField, { target: { value: '321321' } });

    const deviceNameField = screen.getByPlaceholderText('Name');
    fireEvent.change(deviceNameField, { target: { value: 'iphone 12' } });

    fireEvent.click(screen.getByText('Add device'));

    await waitFor(() => {
      expect(ctx.mfaService.addNewTotpDevice).toHaveBeenCalledWith(
        expect.objectContaining({
          tokenId: privilegeToken,
          deviceName: 'iphone 12',
          secondFactorToken: '321321',
        })
      );
    });
  });

  test('adding a first device', async () => {
    const { ctx } = setup({ devices: [] });

    fireEvent.click(screen.getByText(/add two-factor device/i));

    await screen.findByText('Add New Two-Factor Device');

    expect(authService.createRestrictedPrivilegeToken).toHaveBeenCalled();

    const deviceNameField = screen.getByPlaceholderText('Name');
    fireEvent.change(deviceNameField, { target: { value: 'yubikey' } });

    fireEvent.click(screen.getByText('Add device'));

    await waitFor(() => {
      expect(ctx.mfaService.addNewWebauthnDevice).toHaveBeenCalledWith(
        expect.objectContaining({
          tokenId: restrictedPrivilegeToken,
          deviceName: 'yubikey',
        })
      );
    });
  });

  test('removing a device', async () => {
    const { ctx } = setup();

    await waitFor(() => {
      expect(screen.getAllByText(/remove/i)).toHaveLength(2);
    });

    fireEvent.click(screen.getAllByText(/remove/i)[0]);

    expect(screen.getByText('Verify your identity')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Continue'));

    expect(authService.createPrivilegeTokenWithWebauthn).toHaveBeenCalled();

    await expect(
      screen.findByText(/Are you sure you want to remove device/i)
    ).resolves.toBeInTheDocument();

    fireEvent.click(screen.getAllByText('Remove')[2]);

    await waitFor(() => {
      expect(ctx.mfaService.removeDevice).toHaveBeenCalledWith(
        privilegeToken,
        'iphone 12'
      );
    });
  });
});
