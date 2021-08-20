import cfg from 'teleport/config';
import api from 'teleport/services/api';
import makeMfaDevice from './makeMfaDevice';
import { MfaDevice, RemoveDeviceRequest } from './types';

class MfaService {
  fetchDevicesWithToken(tokenId: string): Promise<MfaDevice[]> {
    return api
      .get(cfg.getMfaDeviceListUrl(tokenId))
      .then(devices => devices.map(makeMfaDevice));
  }

  removeDevice(req: RemoveDeviceRequest) {
    return api.delete(cfg.api.mfaDevicePath, req);
  }
}

export default MfaService;
