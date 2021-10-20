/**
 * Copyright 2021 Gravitational, Inc.
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

import React, { useState } from 'react';
import * as Alerts from 'design/Alert';
import { Box, Text, Flex, ButtonPrimary, ButtonSecondary } from 'design';
import FieldInput from 'shared/components/FieldInput';
import Validation from 'shared/components/Validation';
import useGatewayCreate, { State, Props } from './useGatewayCreate';
import Dialog, {
  DialogHeader,
  DialogContent,
  DialogFooter,
} from 'design/Dialog';

export default function Container(props: Props) {
  const state = useGatewayCreate(props);
  return <GatewayCreate {...state} />;
}

export function GatewayCreate(props: State) {
  const { db, onClose } = props;
  const [addr, setAddr] = useState('');

  return (
    <Validation>
      {({ validator }) => (
        <Dialog
          dialogCss={() => ({
            maxWidth: '400px',
            width: '100%',
            padding: '20px',
          })}
          disableEscapeKeyDown={false}
          onClose={props.onClose}
          open={true}
        >
          <DialogHeader>
            <Text typography="h3" color="text.primary">
              Create Gateway to <b>{title}</b>
            </Text>
          </DialogHeader>
          <DialogContent>
            {initAttempt.status === 'error' && (
              <Alerts.Danger>
                Unable to retrieve cluster auth preferences,{' '}
                {initAttempt.statusText}
              </Alerts.Danger>
            )}
            {initAttempt.status === 'success' && (
              <LoginForm
                title={'Sign into Teleport'}
                authProviders={initAttempt.data.authProvidersList}
                auth2faType="off"
                isLocalAuthEnabled={true}
                onLoginWithSso={loginWithSso}
                onLogin={loginWithLocal}
                initAttempt={initAttempt}
                loginAttempt={loginAttempt}
              />
            )}
          </DialogContent>
          <DialogFooter>
            <ButtonSecondary onClick={onClose}>Close</ButtonSecondary>
          </DialogFooter>
        </Dialog>
      )}
    </Validation>
  );
}
