import React, { useState, useMemo } from 'react';
import { Flex, Box, Text, ButtonPrimary, ButtonSecondary } from 'design';
import Dialog, {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from 'design/Dialog';
import { Danger } from 'design/Alert';
import Validation from 'shared/components/Validation';
import { requiredToken } from 'shared/components/Validation/rules';
import FieldInput from 'shared/components/FieldInput';
import FieldSelect from 'shared/components/FieldSelect';
import { getMfaOptions, MfaOption } from 'teleport/services/mfa/utils';
import useReAuthenticate, { State, Props } from './useReAuthenticate';

export default function Container(props: Props) {
  const state = useReAuthenticate(props);
  return <ReAuthenticate {...state} />;
}

export function ReAuthenticate({
  attempt,
  clearAttempt,
  submitWithU2f,
  submitWithTotp,
  close,
  auth2faType,
}: State) {
  const [otpToken, setOtpToken] = useState('');

  const mfaOptions = useMemo<MfaOption[]>(
    () => getMfaOptions(auth2faType, 'u2f', true),
    []
  );

  const [mfaOption, setMfaOption] = useState<MfaOption>(mfaOptions[0]);

  function onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (mfaOption.value === 'u2f') {
      submitWithU2f();
    } else if (mfaOption.value === 'otp') {
      submitWithTotp(otpToken);
    }
  }

  return (
    <Validation>
      {({ validator }) => (
        <Dialog
          dialogCss={() => ({
            width: '400px',
          })}
          disableEscapeKeyDown={false}
          onClose={close}
          open={true}
        >
          <DialogHeader style={{ flexDirection: 'column' }}>
            <DialogTitle>Verify your identity</DialogTitle>
            <Text textAlign="center" color="text.secondary">
              You must verify your identity before peforming this action.
            </Text>
          </DialogHeader>
          {attempt.status === 'failed' && (
            <Danger mt={2} width="100%">
              {attempt.statusText}
            </Danger>
          )}
          <DialogContent>
            <Flex mt={2} alignItems="flex-end">
              <Box width="50%">
                <FieldSelect
                  label="Two-factor type"
                  value={mfaOption}
                  options={mfaOptions}
                  onChange={(o: MfaOption) => {
                    setMfaOption(o);
                    clearAttempt();
                  }}
                  data-testid="mfa-select"
                  mr={3}
                  mb={0}
                  isDisabled={attempt.status === 'processing'}
                />
              </Box>
              <Box width="50%">
                {mfaOption.value === 'otp' && (
                  <FieldInput
                    label="Authenticator code"
                    rule={requiredToken}
                    autoComplete="off"
                    value={otpToken}
                    onChange={e => setOtpToken(e.target.value)}
                    placeholder="123 456"
                    readonly={attempt.status === 'processing'}
                    mb={0}
                  />
                )}
                {mfaOption.value === 'u2f' && attempt.status === 'processing' && (
                  <Text typography="body2" mb={1}>
                    Insert your hardware key and press the button on the key.
                  </Text>
                )}
              </Box>
            </Flex>
          </DialogContent>
          <DialogFooter>
            <ButtonPrimary
              width="45%"
              onClick={e => validator.validate() && onSubmit(e)}
              disabled={attempt.status === 'processing'}
              mr={3}
              mt={3}
            >
              Continue
            </ButtonPrimary>
            <ButtonSecondary width="30%" onClick={close}>
              Cancel
            </ButtonSecondary>
          </DialogFooter>
        </Dialog>
      )}
    </Validation>
  );
}
