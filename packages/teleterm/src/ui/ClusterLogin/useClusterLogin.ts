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

import React from 'react';
import { AuthProvider } from 'shared/services';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import useAsync from 'teleterm/ui/useAsync';

export type Props = {
  clusterUri: string;
  onClose(): void;
};

export default function useClusterLogin(props: Props) {
  const ctx = useAppContext();

  const [settingsResults, fetchSettings] = useAsync(() => {
    return ctx.serviceClusters.getAuthSettings(props.clusterUri);
  });

  const [loginResult, login] = useAsync((email: string, password: string) => {
    return ctx.serviceClusters.login(props.clusterUri, email, password);
  });

  React.useEffect(() => {
    fetchSettings();
  }, []);

  React.useEffect(() => {
    loginResult.status === 'success' && props.onClose();
  }, [loginResult.status]);

  function loginWithU2f(name: string, password: string) {
    // empty
  }

  function loginWithSso(provider: AuthProvider) {}

  return {
    login,
    loginWithU2f,
    loginWithSso,
    loginResult,
    settingsResults,
  };
}

export type State = ReturnType<typeof useClusterLogin>;
