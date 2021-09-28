/*
Copyright 2021 Gravitational, Inc.

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
import useAttempt from 'shared/hooks/useAttemptNext';
import Ctx from 'teleport/teleportContext';
import useStickyClusterId from 'teleport/useStickyClusterId';
import { Desktop } from 'teleport/services/desktops';
import cfg from 'teleport/config';
import { openNewTab } from 'teleport/lib/util';

export default function useDesktops(ctx: Ctx) {
  const { attempt, run } = useAttempt('processing');
  const { clusterId } = useStickyClusterId();
  const username = ctx.storeUser.state.username;

  const [searchValue, setSearchValue] = useState<string>('');

  const [desktops, setDesktops] = useState<Desktop[]>([]);

  useEffect(() => {
    run(() => ctx.desktopService.fetchDesktops(clusterId).then(setDesktops));
  }, [clusterId]);

  const openRemoteDesktopWindow = (username: string, desktopId: string) => {
    const url = cfg.getDesktopRoute({
      clusterId,
      desktopId,
      username,
    });

    openNewTab(url);
  };

  return {
    desktops,
    attempt,
    username,
    clusterId,
    searchValue,
    setSearchValue,
    openRemoteDesktopWindow,
  };
}

export type State = ReturnType<typeof useDesktops>;
