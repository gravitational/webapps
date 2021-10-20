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
import { LoginOptions } from 'teleterm/ui/services/clusters/clusters';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import useAsync from 'teleterm/ui/useAsync';

export default function useClusterLogin(props: Props) {
  const { onClose, clusterUri } = props;
  const { serviceClusters } = useAppContext();
  const cluster = serviceClusters.findCluster(clusterUri);

  const [initAttempt, init] = useAsync(() => {
    return serviceClusters.getAuthSettings(clusterUri);
  });

  const [loginAttempt, login] = useAsync((opts: LoginOptions) => {
    return serviceClusters.login(opts);
  });

  const loginWithLocal = (username: '', password: '') => {
    login({
      clusterUri,
      local: {
        username,
        password,
      },
    });
  };

  const loginWithSso = (provider: types.AuthProvider) => {
    login({
      clusterUri,
      oss: {
        providerName: provider.name,
        providerType: provider.type,
      },
    });
  };

  React.useEffect(() => {
    init();
  }, []);

  React.useEffect(() => {
    loginAttempt.status === 'success' && onClose();
  }, [loginAttempt.status]);

  return {
    title: cluster.name,
    loginWithLocal,
    loginWithSso,
    loginAttempt,
    initAttempt,
    onClose: props.onClose,
  };
}

export type State = ReturnType<typeof useClusterLogin>;

export type Props = {
  clusterUri: string;
  onClose(): void;
};
