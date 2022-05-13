/**
 * Copyright 2021-2022 Gravitational, Inc.
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

import React, { useState, useEffect, useRef } from 'react';
import * as types from 'teleterm/ui/services/clusters/types';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import { useAsync } from 'shared/hooks/useAsync';
import { getClusterName } from 'teleterm/ui/utils';

export default function useClusterLogin(props: Props) {
  const { onSuccess, clusterUri } = props;
  const { clustersService } = useAppContext();
  const cluster = clustersService.findCluster(clusterUri);
  const refAbortCtrl = useRef<types.tsh.TshAbortController>(null);
  const [shouldPromptSsoStatus, promptSsoStatus] = useState(false);
  const [shouldPromptHardwareKey, promptHardwareKey] = useState(false);
  const [shouldPromptHardwareKeyAgain, promptHardwareKeyAgain] =
    useState(false);
  const [shouldPromptHardwarePin, promptHardwarePin] = useState(false);
  const [shouldPromptName, setPromptName] = useState(false);
  const [pinCallback, setPinCallback] = useState();

  const [initAttempt, init] = useAsync(() => {
    return clustersService.getAuthSettings(clusterUri);
  });

  const [loginAttempt, login, _, loginAttemptClear] = useAsync(
    (opts: types.LoginParams) => {
      refAbortCtrl.current = clustersService.client.createAbortController();
      return clustersService.login(opts, refAbortCtrl.current.signal);
    }
  );

  const onLoginWithLocal = (
    username = '',
    password = '',
    token = '',
    authType?: types.Auth2faType
  ) => {
    promptHardwareKey(authType === 'webauthn');
    login({
      clusterUri,
      local: {
        username,
        password,
        token,
      },
    });
  };

  const onLoginWithPwdless = (username = '') => {
    console.log('---- here i am on passwordless login?');
    login({
      clusterUri,
      passwordless: {
        username,
        cb: (t: string, cb) => {
          if (t === 'TAP') {
            setPromptName(false);
            console.log('-------- TAP!');
            promptHardwarePin(() => false);

            promptHardwareKey(() => true);
          } else if (t === 'RETAP') {
            console.log('-------- RE-TAP!');
            promptHardwareKeyAgain(() => true);
            promptHardwarePin(() => false);
          } else if (t === 'PIN') {
            console.log('-------- PIN!', cb);
            promptHardwarePin(() => true);
            promptHardwareKey(() => false);
            setPinCallback(() => cb);
          } else {
            // error maybe?
            console.log('-------- prompt error?');
          }
        },
      },
    });
  };

  const onLoginWithSso = (provider: types.AuthProvider) => {
    promptSsoStatus(true);
    login({
      clusterUri,
      sso: {
        providerName: provider.name,
        providerType: provider.type,
      },
    });
  };

  const onAbort = () => {
    refAbortCtrl.current?.abort();
  };

  const onCloseDialog = () => {
    onAbort();
    props.onCancel();
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (loginAttempt.status !== 'processing') {
      promptHardwareKey(false);
      promptHardwareKeyAgain(false);
      promptHardwarePin(false);
      promptSsoStatus(false);
    }

    if (loginAttempt.status === 'success') {
      onSuccess?.();
    }
  }, [loginAttempt.status]);

  return {
    shouldPromptSsoStatus,
    shouldPromptHardwareKey,
    shouldPromptHardwareKeyAgain,
    shouldPromptHardwarePin,
    title: getClusterName(cluster),
    onLoginWithLocal,
    onLoginWithPwdless,
    onLoginWithSso,
    onCloseDialog,
    onAbort,
    loginAttempt,
    initAttempt,
    clearLoginAttempt: loginAttemptClear,
    pinCallback,
    shouldPromptName,
    setPromptName,
  };
}

export type State = ReturnType<typeof useClusterLogin>;

export type Props = {
  clusterUri: string;
  onCancel(): void;
  onSuccess?(): void;
};
