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

import { useState, useEffect, useRef } from 'react';

import { useAsync } from 'shared/hooks/useAsync';

import * as types from 'teleterm/ui/services/clusters/types';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import { getClusterName } from 'teleterm/ui/utils';

export default function useClusterLogin(props: Props) {
  const { onSuccess, clusterUri } = props;
  const { clustersService } = useAppContext();
  const cluster = clustersService.findCluster(clusterUri);
  const refAbortCtrl = useRef<types.tsh.TshAbortController>(null);
  const [shouldPromptSsoStatus, promptSsoStatus] = useState(false);
  const [shouldPromptHardwareKey, promptHardwareKey] = useState(false);
  const loggedInUserName = cluster.loggedInUser?.name || null;

  const [initAttempt, init] = useAsync(async () => {
    const authSettings = await clustersService.getAuthSettings(clusterUri);

    if (authSettings.preferredMfa === 'u2f') {
      throw new Error(`the U2F API for hardware keys is deprecated, \
        please notify your system administrator to update cluster \
        settings to use WebAuthn as the second factor protocol.`);
    }

    return authSettings;
  });

  const [loginAttempt, login] = useAsync((opts: types.LoginParams) => {
    refAbortCtrl.current = clustersService.client.createAbortController();
    return clustersService.login(opts, refAbortCtrl.current.signal);
  });

  const onLoginWithLocal = (
    username: '',
    password: '',
    token: '',
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
      promptSsoStatus(false);
    }

    if (loginAttempt.status === 'success') {
      onSuccess?.();
    }
  }, [loginAttempt.status]);

  return {
    shouldPromptSsoStatus,
    shouldPromptHardwareKey,
    title: getClusterName(cluster),
    loggedInUserName,
    onLoginWithLocal,
    onLoginWithSso,
    onCloseDialog,
    onAbort,
    loginAttempt,
    initAttempt,
  };
}

export type State = ReturnType<typeof useClusterLogin>;

export type Props = {
  clusterUri: string;
  onCancel(): void;
  onSuccess?(): void;
};
