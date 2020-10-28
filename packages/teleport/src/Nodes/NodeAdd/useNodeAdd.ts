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
import TeleportContext from 'teleport/teleportContext';
import cfg from 'teleport/config';
import useAttempt from 'shared/hooks/useAttemptNext';

export default function useNodeAdd(ctx: TeleportContext, onClose: () => void) {
  const { attempt, run } = useAttempt('processing');
  const canCreateToken = ctx.storeUser.getTokenAccess().create;
  const version = ctx.storeUser.state.cluster.authVersion;
  const isEnterprise = cfg.isEnterprise;

  const [script, setScript] = useState('');
  const [expiry, setExpiry] = useState<Date>(null);

  useEffect(() => {
    if (isEnterprise && canCreateToken) {
      run(() => createJoinToken());
    }
  }, []);

  function createJoinToken() {
    return ctx.nodeService.createNodeJoinToken().then(token => {
      setExpiry(token.expiry);
      setScript(
        `sudo bash -c "$(curl -fsSL ${cfg.getNodeJoinScriptUrl(token.id)})"`
      );
    });
  }

  return {
    canCreateToken,
    version,
    isEnterprise,
    onClose,
    createJoinToken,
    script,
    expiry,
    attempt,
  };
}
