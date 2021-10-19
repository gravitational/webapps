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
import * as types from 'teleterm/services/tshd/types';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import useAsync from 'teleterm/ui/useAsync';

export type Props = {
  clusterUri: string;
  onClose(): void;
};

export default function useClusterLogin(props: Props) {
  const { serviceClusters } = useAppContext();
  const cluster = serviceClusters.findCluster(props.clusterUri);

  const [initAttempt, init] = useAsync(() => {
    return serviceClusters.getAuthSettings(props.clusterUri);
  });

  const [loginAttempt, login] = useAsync((email: string, password: string) => {
    return serviceClusters.login(props.clusterUri, email, password);
  });

  React.useEffect(() => {
    init();
  }, []);

  React.useEffect(() => {
    loginAttempt.status === 'success' && props.onClose();
  }, [loginAttempt.status]);

  function loginWithSso(provider: types.AuthProvider) {
    serviceClusters.loginSso(props.clusterUri, provider.type, provider.name);
  }

  return {
    title: cluster.name,
    login,
    loginWithSso,
    loginAttempt,
    initAttempt,
    close: props.onClose,
  };
}

export type State = ReturnType<typeof useClusterLogin>;
