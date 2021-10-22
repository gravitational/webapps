import 'u2f-api-polyfill';
import cfg from 'teleport/config';
import api from 'teleport/services/api';
import auth, {
  makeMfaRegistrationChallenge,
  makeWebauthnCreationResponse,
} from 'teleport/services/auth';
import {
  MfaDevice,
  AddNewTotpDeviceRequest,
  AddNewU2fDeviceRequest,
  DeviceType,
} from './types';
import makeMfaDevice from './makeMfaDevice';

class MfaService {
  fetchDevicesWithToken(tokenId: string): Promise<MfaDevice[]> {
    return api
      .get(cfg.getMfaDevicesWithTokenUrl(tokenId))
      .then(devices => devices.map(makeMfaDevice));
  }

  removeDevice(tokenId: string, deviceName: string) {
    return api.delete(cfg.getMfaDeviceUrl(tokenId, deviceName));
  }

  fetchDevices(): Promise<MfaDevice[]> {
    return api
      .get(cfg.api.mfaDevicesPath)
      .then(devices => devices.map(makeMfaDevice));
  }

  createMfaRegistrationChallenge(tokenId: string, deviceType: DeviceType) {
    return api
      .post(cfg.getMfaCreateRegistrationChallengeUrl(tokenId), {
        deviceType,
      })
      .then(makeMfaRegistrationChallenge);
  }

  addNewTotpDevice(req: AddNewTotpDeviceRequest) {
    return api.post(cfg.api.mfaDevicesPath, req);
  }

  addNewWebauthnDevice(req: AddNewU2fDeviceRequest) {
    return auth
      .checkWebauthnSupport()
      .then(() => auth.createMfaRegistrationChallenge(req.tokenId, 'webauthn'))
      .then(res =>
        navigator.credentials.create({
          publicKey: res.webauthnPublicKey,
        })
      )
      .then(res => {
        const request = {
          ...req,
          webauthnRegisterResponse: makeWebauthnCreationResponse(res),
        };

        return api.post(cfg.api.mfaDevicesPath, request);
      });
  }

  addNewU2fDevice(req: AddNewU2fDeviceRequest) {
    const err = auth.u2fBrowserSupported();
    if (err) {
      return Promise.reject(err);
    }

    return auth._getU2FRegisterRes(req.tokenId).then(u2fRegisterResponse => {
      return api.post(cfg.api.mfaDevicesPath, {
        ...req,
        u2fRegisterResponse,
      });
    });
  }
}

export default MfaService;
