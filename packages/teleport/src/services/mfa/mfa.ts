import cfg from 'teleport/config';
import api from 'teleport/services/api';
import makeMfaDevice from './makeMfaDevice';
import { RemoveDeviceRequest } from './types';

class MfaService {
  fetchDevices(tokenId: string) {
    return api
      .get(cfg.getMfaDeviceListUrl(tokenId))
      .then(devices => devices.map(makeMfaDevice));
  }

  removeDevice(req: RemoveDeviceRequest) {
    return api.delete(cfg.api.mfaDevicePath, req);
  }
}

export default MfaService;
