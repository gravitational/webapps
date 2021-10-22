import React, { useState, useMemo } from 'react';
import {
  Text,
  Flex,
  Image,
  ButtonPrimary,
  ButtonSecondary,
  Link,
  Indicator,
} from 'design';
import Dialog, {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from 'design/Dialog';
import { Danger } from 'design/Alert';
import FieldInput from 'shared/components/FieldInput';
import Validation, { Validator } from 'shared/components/Validation';
import {
  requiredToken,
  requiredField,
} from 'shared/components/Validation/rules';
import FieldSelect from 'shared/components/FieldSelect';
import useTeleport from 'teleport/useTeleport';
import { getMfaOptions, MfaOption } from 'teleport/services/mfa/utils';
import useAddDevice, { State, Props } from './useAddDevice';

const u2fGraphic = require('design/assets/images/u2f-graphic.svg');

export default function Container(props: Props) {
  const ctx = useTeleport();
  const state = useAddDevice(ctx, props);
  return <AddDevice {...state} />;
}

export function AddDevice({
  addDeviceAttempt,
  fetchQrCodeAttempt,
  addTotpDevice,
  addU2fDevice,
  addWebauthnDevice,
  clearAttempt,
  close,
  qrCode,
  auth2faType,
  preferredMfaType,
}: State) {
  const [otpToken, setOtpToken] = useState('');
  const [deviceName, setDeviceName] = useState('');

  const mfaOptions = useMemo<MfaOption[]>(
    () => getMfaOptions(auth2faType, preferredMfaType, true),
    []
  );

  const [mfaOption, setMfaOption] = useState<MfaOption>(mfaOptions[0]);

  function onSetMfaOption(option: MfaOption, validator: Validator) {
    setOtpToken('');
    validator.reset();
    clearAttempt();
    setMfaOption(option);
  }

  function onSubmit(
    e: React.MouseEvent<HTMLButtonElement>,
    validator: Validator
  ) {
    e.preventDefault();
    if (!validator.validate()) {
      return;
    }

    if (mfaOption.value === 'u2f') {
      addU2fDevice(deviceName);
    }
    if (mfaOption.value === 'webauthn') {
      addWebauthnDevice(deviceName);
    }
    if (mfaOption.value === 'otp') {
      addTotpDevice(otpToken, deviceName);
    }
  }

  let hardwareInstructions = 'Enter a name for your hardware key.';
  if (addDeviceAttempt.status === 'processing') {
    hardwareInstructions =
      mfaOption.value === 'u2f'
        ? 'Insert your new hardware key and press the button on the key.'
        : 'Follow the prompts from your browser.';
  }

  return (
    <Validation>
      {({ validator }) => (
        <Dialog
          dialogCss={() => ({
            width: '484px',
          })}
          onClose={close}
          open={true}
        >
          <DialogHeader style={{ flexDirection: 'column' }}>
            <DialogTitle>Add New Two-Factor Device</DialogTitle>
          </DialogHeader>
          {addDeviceAttempt.status === 'failed' && (
            <Danger mt={2} width="100%">
              {addDeviceAttempt.statusText}
            </Danger>
          )}
          {fetchQrCodeAttempt.status === 'failed' && (
            <Danger mt={2} width="100%">
              {fetchQrCodeAttempt.statusText}
            </Danger>
          )}
          <DialogContent>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bg="primary.light"
              borderRadius={8}
              height="256px"
              p={3}
              mb={4}
            >
              {mfaOption.value === 'otp' && (
                <>
                  <Flex
                    height="168px"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {fetchQrCodeAttempt.status === 'processing' && (
                      <Indicator />
                    )}
                    {fetchQrCodeAttempt.status === 'success' && (
                      <Image
                        src={`data:image/png;base64,${qrCode}`}
                        height="100%"
                        style={{
                          boxSizing: 'border-box',
                          border: '8px solid white',
                        }}
                      />
                    )}
                  </Flex>
                  <Text fontSize={1} textAlign="center" mt={2}>
                    Scan the QR Code with any authenticator app and enter the
                    generated code.{' '}
                    <Text color="text.secondary">
                      We recommend{' '}
                      <Link href="https://authy.com/download/" target="_blank">
                        Authy
                      </Link>
                      .
                    </Text>
                  </Text>
                </>
              )}
              {mfaOption.value === 'u2f' ||
                (mfaOption.value === 'webauthn' && (
                  <>
                    <Image src={u2fGraphic} height="168px" />
                    <Text mt={3}>{hardwareInstructions}</Text>
                  </>
                ))}
            </Flex>
            <Flex alignItems="center">
              <FieldSelect
                maxWidth="50%"
                width="100%"
                label="Two-factor type"
                data-testid="mfa-select"
                value={mfaOption}
                options={mfaOptions}
                onChange={(o: MfaOption) => onSetMfaOption(o, validator)}
                mr={3}
                isDisabled={addDeviceAttempt.status === 'processing'}
              />
              {mfaOption.value === 'otp' && (
                <FieldInput
                  width="50%"
                  label="Authenticator code"
                  rule={requiredToken}
                  autoComplete="off"
                  value={otpToken}
                  onChange={e => setOtpToken(e.target.value)}
                  placeholder="123 456"
                  readonly={addDeviceAttempt.status === 'processing'}
                />
              )}
            </Flex>
            <FieldInput
              rule={requiredField('Device name is required')}
              label="Device name"
              placeholder="Name"
              width="100%"
              autoFocus
              value={deviceName}
              type="text"
              onChange={e => setDeviceName(e.target.value)}
              readonly={addDeviceAttempt.status === 'processing'}
              mb={1}
            />
          </DialogContent>
          <DialogFooter>
            <ButtonPrimary
              size="large"
              width="45%"
              type="submit"
              onClick={e => onSubmit(e, validator)}
              disabled={addDeviceAttempt.status === 'processing'}
              mr={3}
            >
              Add device
            </ButtonPrimary>
            <ButtonSecondary size="large" width="30%" onClick={close}>
              Cancel
            </ButtonSecondary>
          </DialogFooter>
        </Dialog>
      )}
    </Validation>
  );
}
