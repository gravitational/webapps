import React from 'react';
import { render, fireEvent, wait, screen } from 'design/utils/testing';
import { Context, ContextProvider } from 'teleport';
import AuthService from 'teleport/services/auth';
import ManageDevices from './ManageDevices';
import cfg from 'teleport/config';

const privilegeToken = 'privilegeToken123';
const restrictedPrivilegeToken = 'restrictedPrivilegeToken123';

describe('mfa device dashboard testing', () => {
  let renderManageDevices;
  let ctx: Context;

  beforeEach(() => {
    ctx = new Context();

    jest.spyOn(ctx.mfaService, 'fetchDevices').mockResolvedValue([
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
    ]);

    jest
      .spyOn(ctx.mfaService, 'createRegisterChallenge')
      .mockResolvedValue({ qrCode: '123456', u2f: null });

    jest.spyOn(ctx.mfaService, 'addNewU2fDevice').mockResolvedValue({});

    jest.spyOn(ctx.mfaService, 'addNewTotpDevice').mockResolvedValue({});

    jest.spyOn(ctx.mfaService, 'removeDevice').mockResolvedValue({});

    renderManageDevices = () =>
      render(
        <ContextProvider ctx={ctx}>
          <ManageDevices />
        </ContextProvider>
      );

    jest.spyOn(cfg, 'getAuth2faType').mockReturnValue('optional');

    jest
      .spyOn(AuthService, 'createPrivilegeTokenWithTotp')
      .mockResolvedValue(privilegeToken);

    jest
      .spyOn(AuthService, 'createPrivilegeTokenWithU2f')
      .mockResolvedValue(privilegeToken);

    jest
      .spyOn(AuthService, 'createRestrictedPrivilegeToken')
      .mockResolvedValue(restrictedPrivilegeToken);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('re-authenticating with totp and adding a u2f device', async () => {
    await wait(() => renderManageDevices());

    fireEvent.click(screen.getByText(/add two-factor device/i));

    expect(screen.getByText('Verify your identity')).toBeInTheDocument();

    const reAuthMfaSelectEl = screen
      .getByTestId('mfa-select')
      .querySelector('input');
    fireEvent.keyDown(reAuthMfaSelectEl, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.click(screen.getAllByText(/authenticator app/i)[1]);

    const tokenField = screen.getByPlaceholderText('123 456');
    fireEvent.change(tokenField, { target: { value: '321321' } });

    await wait(() => {
      fireEvent.click(screen.getByText('Continue'));
    });

    expect(AuthService.createPrivilegeTokenWithTotp).toHaveBeenCalledWith(
      '321321'
    );

    expect(screen.getByText('Add New Two-Factor Device')).toBeInTheDocument();

    const deviceNameField = screen.getByPlaceholderText('Name');
    fireEvent.change(deviceNameField, { target: { value: 'yubikey' } });

    await wait(() => {
      fireEvent.click(screen.getByText('Add device'));
    });

    expect(ctx.mfaService.addNewU2fDevice).toHaveBeenCalledWith(
      expect.objectContaining({
        tokenId: privilegeToken,
        deviceName: 'yubikey',
      })
    );
  });

  test('re-authenticating with u2f and adding a totp device', async () => {
    await wait(() => renderManageDevices());

    fireEvent.click(screen.getByText(/add two-factor device/i));

    expect(screen.getByText('Verify your identity')).toBeInTheDocument();

    await wait(() => {
      fireEvent.click(screen.getByText('Continue'));
    });

    expect(AuthService.createPrivilegeTokenWithU2f).toHaveBeenCalled();

    expect(screen.getByText('Add New Two-Factor Device')).toBeInTheDocument();

    const addDeviceMfaSelectEl = screen
      .getByTestId('mfa-select')
      .querySelector('input');
    fireEvent.keyDown(addDeviceMfaSelectEl, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.click(screen.getAllByText(/authenticator app/i)[1]);

    const addDeviceTokenField = screen.getByPlaceholderText('123 456');
    fireEvent.change(addDeviceTokenField, { target: { value: '321321' } });

    const deviceNameField = screen.getByPlaceholderText('Name');
    fireEvent.change(deviceNameField, { target: { value: 'iphone 12' } });

    await wait(() => {
      fireEvent.click(screen.getByText('Add device'));
    });

    expect(ctx.mfaService.addNewTotpDevice).toHaveBeenCalledWith(
      expect.objectContaining({
        tokenId: privilegeToken,
        deviceName: 'iphone 12',
        secondFactorToken: '321321',
      })
    );
  });

  test('adding a first device', async () => {
    jest.spyOn(ctx.mfaService, 'fetchDevices').mockResolvedValue([]);

    await wait(() => renderManageDevices());

    await wait(() =>
      fireEvent.click(screen.getByText(/add two-factor device/i))
    );

    expect(AuthService.createRestrictedPrivilegeToken).toHaveBeenCalled();

    expect(screen.getByText('Add New Two-Factor Device')).toBeInTheDocument();

    const deviceNameField = screen.getByPlaceholderText('Name');
    fireEvent.change(deviceNameField, { target: { value: 'yubikey' } });

    await wait(() => {
      fireEvent.click(screen.getByText('Add device'));
    });

    expect(ctx.mfaService.addNewU2fDevice).toHaveBeenCalledWith(
      expect.objectContaining({
        tokenId: restrictedPrivilegeToken,
        deviceName: 'yubikey',
      })
    );
  });

  test('removing a device', async () => {
    await wait(() => renderManageDevices());

    fireEvent.click(screen.getAllByText(/remove/i)[0]);

    expect(screen.getByText('Verify your identity')).toBeInTheDocument();

    await wait(() => {
      fireEvent.click(screen.getByText('Continue'));
    });

    expect(AuthService.createPrivilegeTokenWithU2f).toHaveBeenCalled();

    expect(
      screen.getByText(/Are you sure you want to remove device/i)
    ).toBeInTheDocument();

    await wait(() => {
      fireEvent.click(screen.getAllByText('Remove')[2]);
    });

    expect(ctx.mfaService.removeDevice).toHaveBeenCalledWith(
      privilegeToken,
      'iphone 12'
    );
  });
});
