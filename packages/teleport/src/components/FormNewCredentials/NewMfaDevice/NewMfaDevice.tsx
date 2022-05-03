/**
 * Copyright 2022 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Text, Card, ButtonPrimary, Flex, Box, Link, Image } from 'design';
import { useLocation, useHistory } from 'react-router';
import { Route, Switch, useParams } from 'teleport/components/Router';

import * as Alerts from 'design/Alert';
import { AuthType, Auth2faType, PreferredMfaType } from 'shared/services';
import useAttempt, { Attempt } from 'shared/hooks/useAttemptNext';
import FieldSelect from 'shared/components/FieldSelect';
import FieldInput from 'shared/components/FieldInput';
import Validation, { Validator } from 'shared/components/Validation';
import {
  requiredField,
  requiredToken,
} from 'shared/components/Validation/rules';
import createMfaOptions, { MfaOption } from 'shared/utils/createMfaOptions';
import { ArrowBack } from 'design/Icon';

// const secKeyGraphic = require('design/assets/images/sec-key-with-bg.png');
import secKeyGraphic from './sec-key-with-bg.png';

export default function NewMfaDevice(props) {
  const {
    qr,
    attempt,
    clearAttempt,
    auth2faType,
    onSubmitWithWebauthn,
    onSubmit,
    onPassword,
  } = props;
  const [otp, setOtp] = useState('');
  const [deviceName, setDeviceName] = useState(''); // need to be self generated

  const mfaOptions = useMemo<MfaOption[]>(
    () =>
      createMfaOptions({
        auth2faType: auth2faType,
      }),
    []
  );
  const [mfaType, setMfaType] = useState(mfaOptions[0]);

  function onBtnClick(
    e: React.MouseEvent<HTMLButtonElement>,
    validator: Validator
  ) {
    e.preventDefault(); // TODO required?

    if (!validator.validate()) {
      return;
    }

    switch (mfaType?.value) {
      case 'webauthn':
        onSubmitWithWebauthn();
        break;
      default:
        onSubmit(otp);
    }
  }

  function onSetMfaOption(option: MfaOption, validator: Validator) {
    setOtp('');
    clearAttempt();
    validator.reset();
    setMfaType(option);
  }

  const imgSrc =
    mfaType?.value === 'otp' ? `data:image/png;base64,${qr}` : secKeyGraphic;

  const $mfaOptions = mfaOptions.map((opt, index) => {
    return (
      <Radio key={index} onClick={() => setMfaType(mfaOptions[index])}>
        <input
          type="radio"
          checked={mfaType.value === opt.value}
          onChange={() => setMfaType(mfaOptions[index])}
        />
        <label>{opt.label}</label>
      </Radio>
    );
  });

  return (
    <Validation>
      {({ validator }) => (
        <Card as="form" bg="primary.light" my={6} mx="auto" width={464}>
          <Box flex="3" p="6">
            <Flex mb={3} alignItems="center">
              <ArrowBack
                fontSize={30}
                mr={3}
                onClick={onPassword}
                style={{ cursor: 'pointer' }}
              />
              <Box>
                <Text color="text.secondary">Step 2 of 2</Text>
                <Text typography="h4" color="light" bold>
                  Set Two-Factor Device
                </Text>
              </Box>
            </Flex>
            {attempt.status === 'failed' && (
              <Alerts.Danger children={attempt.statusText} />
            )}
            <Text typography="subtitle1" color="light" caps mb={1}>
              Two-Factor Method
            </Text>
            <Box>{$mfaOptions}</Box>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              borderRadius={8}
              bg={mfaType?.value === 'optional' ? 'primary.lighter' : ''}
              height={mfaType?.value === 'optional' ? '340px' : '240px'}
              px={3}
            >
              {mfaType?.value === 'otp' && (
                <>
                  <Image src={imgSrc} width="145px" />
                  <Text
                    fontSize={1}
                    textAlign="center"
                    mt={2}
                    color="text.secondary"
                  >
                    Scan the QR Code with any authenticator app and enter the
                    generated code. We recommend{' '}
                    <Link href="https://authy.com/download/" target="_blank">
                      Authy
                    </Link>
                    .
                  </Text>
                </>
              )}
              {mfaType?.value === 'webauthn' && (
                <>
                  <Image src={imgSrc} width="220px" />
                  <Text fontSize={1} color="text.secondary" textAlign="center">
                    We support a wide range of hardware devices including yubi
                    keys, touch ID, watches, and more.
                  </Text>
                </>
              )}
              {mfaType?.value === 'optional' && (
                <>
                  <Text textAlign="center">
                    We strongly recommend enrolling a two-factor device to
                    protect both yourself and your organization.
                  </Text>
                </>
              )}
            </Flex>
            {mfaType?.value !== 'optional' && (
              <Flex alignItems="center" height={100}>
                <FieldInput
                  rule={requiredField('Device name is required')}
                  label="Device name"
                  placeholder="Name"
                  width={mfaType?.value === 'otp' ? '50%' : '100%'}
                  autoFocus
                  value={deviceName}
                  type="text"
                  onChange={e => setDeviceName(e.target.value)}
                  readonly={attempt.status === 'processing'}
                  mr={mfaType?.value === 'otp' ? 3 : 0}
                />
                {mfaType?.value === 'otp' && (
                  <FieldInput
                    width="50%"
                    label="Authenticator code"
                    rule={requiredToken}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    placeholder="123 456"
                    readonly={attempt.status === 'processing'}
                  />
                )}
              </Flex>
            )}
            <ButtonPrimary
              width="100%"
              mt={2}
              disabled={attempt.status === 'processing'}
              size="large"
              onClick={e => onBtnClick(e, validator)}
            >
              Submit
            </ButtonPrimary>
          </Box>
        </Card>
      )}
    </Validation>
  );
}

const Radio = styled.div`
  display: inline-block;
  margin-right: 16px;
  cursor: pointer;

  input {
    cursor: pointer;
    vertical-align: middle;
    margin: 0 8px 0px 0;
  }

  label {
    cursor: pointer;
    vertical-align: middle;
  }
`;

export type Props = {
  title?: string;
  submitBtnText?: string;
  user: string;
  qr: string;
  authType: AuthType;
  auth2faType: Auth2faType;
  attempt: Attempt;
  clearAttempt: () => void;
  onSubmitWithWebauthn(): void;
  onSubmitWithOtp(optCode: string): void;
};

type AccountToken = {
  tokenId: string;
  qrCode: string;
  user: string;
};
