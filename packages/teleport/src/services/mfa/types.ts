export type MfaDevice = {
  id: string;
  name: string;
  description: string;
  registeredDate: Date;
  lastUsedDate: Date;
};

export type RemoveDeviceRequest = {
  tokenId: string;
  deviceId: string;
  deviceName: string;
};
