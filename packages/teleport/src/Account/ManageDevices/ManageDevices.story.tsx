import React from 'react';
import { State } from './useManageDevices';
import { ManageDevices } from './ManageDevices';

export default {
  title: 'Teleport/Account/Manage Devices',
};

export const Loaded = () => <ManageDevices {...props} />;

export const Loaded2faOff = () => (
  <ManageDevices {...props} auth2faType="off" />
);

Loaded2faOff.storyName = 'Loaded 2FA Off';

export const Processing = () => (
  <ManageDevices
    {...props}
    fetchDevicesAttempt={{
      status: 'processing',
    }}
  />
);

export const Failed = () => (
  <ManageDevices
    {...props}
    fetchDevicesAttempt={{
      status: 'failed',
      statusText: 'failed to fetch devices',
    }}
  />
);

export const RemoveDialog = () => (
  <ManageDevices
    {...props}
    isDialogVisible={true}
    token="123"
    deviceToRemove={{ id: '1', name: 'iphone 12' }}
  />
);

export const RemoveDialogFailed = () => (
  <ManageDevices
    {...props}
    isDialogVisible={true}
    token="123"
    deviceToRemove={{ id: '1', name: 'iphone 12' }}
    removeDevice={() => Promise.reject(new Error('server error'))}
  />
);

export const RestrictedTokenCreateProcessing = () => (
  <ManageDevices
    {...props}
    createRestrictedTokenAttempt={{
      status: 'processing',
    }}
  />
);

export const RestrictedTokenCreateFailed = () => (
  <ManageDevices
    {...props}
    createRestrictedTokenAttempt={{
      status: 'failed',
      statusText: 'failed to create privilege token',
    }}
  />
);

const props: State = {
  token: '',
  setToken: () => null,
  onAddDevice: () => null,
  fetchDevices: () => null,
  fetchDevicesAttempt: { status: 'success' },
  createRestrictedTokenAttempt: { status: '' },
  deviceToRemove: null,
  setDeviceToRemove: () => null,
  removeDevice: () => null,
  isDialogVisible: false,
  showDialog: () => null,
  hideDialog: () => null,
  auth2faType: 'on',
  devices: [
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
      name: 'solokey',
      registeredDate: new Date(1623722252000),
      lastUsedDate: new Date(1623981452000),
    },
    {
      id: '3',
      description: 'Hardware Key',
      name: 'backup yubikey',
      registeredDate: new Date(1618711052000),
      lastUsedDate: new Date(1626472652000),
    },
    {
      id: '4',
      description: 'Hardware Key',
      name: 'yubikey',
      registeredDate: new Date(1612493852000),
      lastUsedDate: new Date(1614481052000),
    },
  ],
};
