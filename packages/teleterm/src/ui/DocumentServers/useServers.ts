/*
Copyright 2019 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { useState, useEffect } from 'react';
import useAsync from 'teleterm/ui/useAsync';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import * as types from 'teleterm/ui/types';

export default function useServers({ clusterUri }: types.DocumentServers) {
  const ctx = useAppContext();
  const [searchValue, setSearchValue] = useState('');
  const servers = ctx.serviceClusters.findServers(clusterUri);

  const [loadAttempt, load] = useAsync(() => {
    return ctx.serviceClusters.fetchServers(clusterUri);
  });

  const logins = ['root'];

  const onLogin = (serverUri: '') =>
    ctx.serviceCommands.sendCommand({
      kind: 'dialog.ssh-new-session.open',
      serverUri,
    });

  ctx.serviceClusters.useState();

  useEffect(() => {
    if (servers.length === 0) {
      load();
    }
  }, [clusterUri]);

  return {
    searchValue,
    setSearchValue,
    onLogin,
    servers,
    loadAttempt,
  };
}
