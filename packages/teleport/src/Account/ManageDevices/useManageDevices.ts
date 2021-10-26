import { useEffect, useState } from 'react';
import useAttempt from 'shared/hooks/useAttemptNext';
import Ctx from 'teleport/teleportContext';
import cfg from 'teleport/config';
import auth from 'teleport/services/auth';
import { MfaDevice } from 'teleport/services/mfa';

export default function useManageDevices(ctx: Ctx) {
  const [devices, setDevices] = useState<MfaDevice[]>();
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [deviceToRemove, setDeviceToRemove] = useState<DeviceToRemove>();
  const [token, setToken] = useState('');
  const fetchDevicesAttempt = useAttempt('');

  // This is a restricted privilege token that can only be used to add a device, in case
  // the user has no devices yet and thus can't authenticate using the ReAuthenticate dialog
  const createRestrictedTokenAttempt = useAttempt('');

  const mfaDisabled = cfg.getAuth2faType() === 'off';

  const isReAuthenticateVisible = !token && isDialogVisible;
  const isRemoveDeviceVisible = token && deviceToRemove && isDialogVisible;
  const isAddDeviceVisible = token && !deviceToRemove && isDialogVisible;

  function fetchDevices() {
    fetchDevicesAttempt.run(() =>
      ctx.mfaService.fetchDevices().then(setDevices)
    );
  }

  function removeDevice() {
    return ctx.mfaService.removeDevice(token, deviceToRemove.name).then(() => {
      fetchDevices();
      hideRemoveDevice();
    });
  }

  function onAddDevice() {
    if (devices.length === 0) {
      createRestrictedTokenAttempt.run(() =>
        auth.createRestrictedPrivilegeToken().then(token => {
          setToken(token);
          setIsDialogVisible(true);
        })
      );
    } else {
      setIsDialogVisible(true);
    }
  }

  function hideAddDevice() {
    setIsDialogVisible(false);
    setToken(null);
  }

  function onRemoveDevice(device: DeviceToRemove) {
    setDeviceToRemove(device);
    setIsDialogVisible(true);
  }

  function hideRemoveDevice() {
    setIsDialogVisible(false);
    setDeviceToRemove(null);
    setToken(null);
  }

  function hideReAuthenticate() {
    setIsDialogVisible(false);
  }

  useEffect(() => fetchDevices(), []);

  return {
    devices,
    token,
    setToken,
    onAddDevice,
    onRemoveDevice,
    deviceToRemove,
    fetchDevices,
    removeDevice,
    fetchDevicesAttempt: fetchDevicesAttempt.attempt,
    createRestrictedTokenAttempt: createRestrictedTokenAttempt.attempt,
    isReAuthenticateVisible,
    isAddDeviceVisible,
    isRemoveDeviceVisible,
    hideReAuthenticate,
    hideAddDevice,
    hideRemoveDevice,
    mfaDisabled,
  };
}

type DeviceToRemove = Pick<MfaDevice, 'id' | 'name'>;

export type State = ReturnType<typeof useManageDevices>;
