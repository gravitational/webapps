import { useState, useEffect } from 'react';
import useAttempt from 'shared/hooks/useAttemptNext';
import Ctx from 'teleport/teleportContext';
import cfg from 'teleport/config';

export default function useAddDevice(
  ctx: Ctx,
  { token, fetchDevices, close }: Props
) {
  const [qrCode, setQrCode] = useState('');
  const addDeviceAttempt = useAttempt('');
  const fetchQrCodeAttempt = useAttempt('');

  useEffect(() => {
    fetchQrCodeAttempt.run(() =>
      ctx.mfaService
        .createRegisterChallenge(token, 'totp')
        .then(res => setQrCode(res.qrCode))
    );
  }, []);

  function addTotpDevice(secondFactorToken: string, deviceName: string) {
    addDeviceAttempt.setAttempt({ status: 'processing' });
    ctx.mfaService
      .addNewTotpDevice({
        tokenId: token,
        secondFactorToken,
        deviceName,
      })
      .then(() => {
        close();
        fetchDevices();
      })
      .catch(addDeviceAttempt.handleError);
  }

  function addU2fDevice(deviceName: string) {
    addDeviceAttempt.setAttempt({ status: 'processing' });
    ctx.mfaService
      .addNewU2fDevice({
        tokenId: token,
        deviceName,
      })
      .then(() => {
        close();
        fetchDevices();
      })
      .catch(addDeviceAttempt.handleError);
  }

  function clearAttempt() {
    addDeviceAttempt.setAttempt({ status: '' });
  }

  return {
    addDeviceAttempt: addDeviceAttempt.attempt,
    fetchQrCodeAttempt: fetchQrCodeAttempt.attempt,
    addTotpDevice,
    addU2fDevice,
    close,
    clearAttempt,
    qrCode,
    auth2faType: cfg.getAuth2faType(),
  };
}

export type State = ReturnType<typeof useAddDevice>;

export type Props = {
  token: string;
  fetchDevices: () => void;
  close: () => void;
};
