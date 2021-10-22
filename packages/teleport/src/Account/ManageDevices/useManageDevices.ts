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

  const showReAuthenticate = !token && isDialogVisible;
  const showRemoveDevice = token && deviceToRemove && isDialogVisible;
  const showAddDevice = token && !deviceToRemove && isDialogVisible;

  function fetchDevices() {
    fetchDevicesAttempt.run(() =>
      ctx.mfaService.fetchDevices().then(setDevices)
    );
  }

  function onAddDevice() {
    if (devices.length === 0) {
      createRestrictedTokenAttempt.run(() =>
        auth.createRestrictedPrivilegeToken().then(token => {
          setToken(token);
          showDialog();
        })
      );
    } else {
      showDialog();
    }
  }

  function removeDevice() {
    return ctx.mfaService.removeDevice(token, deviceToRemove.name).then(() => {
      fetchDevices();
      hideDialog();
    });
  }

  function showDialog() {
    setIsDialogVisible(true);
  }

  function hideDialog() {
    setIsDialogVisible(false);
    setToken(null);
    setDeviceToRemove(null);
  }

  useEffect(() => fetchDevices(), []);

  return {
    token,
    setToken,
    devices,
    onAddDevice,
    fetchDevices,
    fetchDevicesAttempt: fetchDevicesAttempt.attempt,
    createRestrictedTokenAttempt: createRestrictedTokenAttempt.attempt,
    setDeviceToRemove,
    removeDevice,
    deviceToRemove,
    showDialog,
    hideDialog,
    showReAuthenticate,
    showAddDevice,
    showRemoveDevice,
    mfaDisabled,
  };
}

type DeviceToRemove = Pick<MfaDevice, 'id' | 'name'>;

export type State = ReturnType<typeof useManageDevices>;
