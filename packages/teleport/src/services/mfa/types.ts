export type MfaDevice = {
  id: string;
  type: 'Hardware Key' | 'Authenticator App';
  name: string;
  registeredDate: number;
  lastUsedDate: number;
  registeredDateText: string;
  lastUsedDateText: string;
};

export type DeleteMfaDeviceRequest = {
  tokenId: string;
  deviceId: string;
  deviceName: string;
};
