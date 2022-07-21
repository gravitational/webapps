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
import * as types from 'teleterm/ui/services/clusters/types';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import { useAsync } from 'shared/hooks/useAsync';
import { getClusterName } from 'teleterm/ui/utils';

export default function useClusterLogin(props: Props) {
  const { onSuccess, clusterUri } = props;
  const { clustersService } = useAppContext();
  const cluster = clustersService.findCluster(clusterUri);
  const refAbortCtrl = useRef<types.tsh.TshAbortController>(null);
  const loggedInUserName = cluster.loggedInUser?.name || null;
  const [shouldPromptSsoStatus, promptSsoStatus] = useState(false);
  const [webauthnLogin, setWebauthnLogin] = useState<WebauthnLogin>({
    prompt: '',
  });

  const [initAttempt, init] = useAsync(async () => {
    const authSettings = await clustersService.getAuthSettings(clusterUri);

    if (authSettings.preferredMfa === 'u2f') {
      throw new Error(`the U2F API for hardware keys is deprecated, \
        please notify your system administrator to update cluster \
        settings to use WebAuthn as the second factor protocol.`);
    }

    return authSettings;
  });

  const [loginAttempt, login, setAttempt] = useAsync(
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
    if (authType === 'webauthn') {
      setWebauthnLogin({ prompt: 'tap' });
    }

    login({
      clusterUri,
      local: {
        username,
        password,
        token,
      },
    });
  };

  const onLoginWithPwdless = () => {
    setWebauthnLogin({
      prompt: '',
      processing: true,
    });

    login({
      clusterUri,
      passwordless: {
        onSuccess: (
          prompt: types.WebauthnLoginPrompt,
          res: types.LoginPasswordlessResponse
        ) => {
          const newLogin: WebauthnLogin = {
            prompt,
            processing: false,
          };

          if (res.writeToStream) {
            newLogin.writeToStream = (req: types.LoginPasswordlessRequest) => {
              setWebauthnLogin({
                ...newLogin,
                // prevent user from clicking on submit buttons more than once
                processing: true,
              });
              res.writeToStream(req);
            };
          }

          if (res.loginUsernames) {
            newLogin.loginUsernames = res.loginUsernames;
          }

          setWebauthnLogin(newLogin);
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

  // Since the login form can have two views (primary and secondary)
  // we need to clear any rendered error dialogus before switching.
  const clearLoginAttempt = () => {
    setAttempt({ status: '', statusText: '', data: null });
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (loginAttempt.status !== 'processing') {
      setWebauthnLogin({ prompt: '' });
      promptSsoStatus(false);
    }

    if (loginAttempt.status === 'success') {
      onSuccess?.();
    }
  }, [loginAttempt.status]);

  return {
    shouldPromptSsoStatus,
    webauthnLogin,
    title: getClusterName(cluster),
    loggedInUserName,
    onLoginWithLocal,
    onLoginWithPwdless,
    onLoginWithSso,
    onCloseDialog,
    onAbort,
    loginAttempt,
    initAttempt,
    clearLoginAttempt,
  };
}

export type State = ReturnType<typeof useClusterLogin>;

export type Props = {
  clusterUri: string;
  onCancel(): void;
  onSuccess?(): void;
};

export type WebauthnLogin = {
  prompt: types.WebauthnLoginPrompt;
  // The below three fields are only ever used for passwordless login flow.
  processing?: boolean;
  loginUsernames?: string[];
  writeToStream?(r: types.LoginPasswordlessRequest): void;
};
