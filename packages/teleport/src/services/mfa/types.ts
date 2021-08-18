export type MfaDevice = {
  id: string;
  name: string;
  typeText: 'Hardware Key' | 'Authenticator App';
  registeredDate: Date;
  lastUsedDate: Date;
};

export type RemoveDeviceRequest = {
  tokenId: string;
  deviceId: string;
  deviceName: string;
};
