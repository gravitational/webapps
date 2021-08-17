import 'u2f-api-polyfill';
import cfg from 'teleport/config';
import api from 'teleport/services/api';
import makeMfaDevice from './makeMfaDevice';
import { DeleteMfaDeviceRequest } from './types';

class MfaService {
  fetchMfaDevices(tokenId: string) {
    return api
      .get(cfg.getMfaDeviceListUrl(tokenId))
      .then(devices => devices.map(makeMfaDevice));
  }

  deleteMfaDevice(data: DeleteMfaDeviceRequest) {
    return api.delete(cfg.api.mfaDeleteDevicePath, { ...data });
  }
}

export default MfaService;
