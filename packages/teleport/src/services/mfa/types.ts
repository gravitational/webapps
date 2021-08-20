export type MfaDevice = {
  id: string;
  name: string;
  description: string;
  registeredDate: Date;
  lastUsedDate: Date;
};

export type AddNewTotpDeviceRequest = {
  tokenId: string;
  deviceName: string;
  secondFactorToken: string;
};

export type AddNewU2fDeviceRequest = {
  tokenId: string;
  deviceName: string;
};

export type U2fRegisterRequest = {
  version: string;
  challenge: string;
  appId: string;
};

export type MfaRegisterChallenge = {
  qrCode: string;
  u2f: U2fRegisterRequest;
};

export type DeviceType = 'u2f' | 'totp';
