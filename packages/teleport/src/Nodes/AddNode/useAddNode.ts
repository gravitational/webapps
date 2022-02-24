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
import useAttempt from 'shared/hooks/useAttemptNext';

export default function useAddNode(ctx: TeleportContext) {
  const { attempt, run } = useAttempt('processing');
  const version = ctx.storeUser.state.cluster.authVersion;
  const user = ctx.storeUser.state.username;
  const isAuthTypeLocal = !ctx.storeUser.isSso();
  const [automatic, setAutomatic] = useState(true);
  const [script, setScript] = useState('');
  const [expiry, setExpiry] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    createJoinToken();
  }, []);

  function createJoinToken() {
    return run(() =>
      ctx.nodeService.getJoinToken().then(token => {
        const cmd = ctx.nodeService.createNodeBashCommand(token);
        setExpiry(cmd.expires);
        setScript(cmd.text);
        setToken(token.id);
      })
    );
  }

  return {
    createJoinToken,
    automatic,
    setAutomatic,
    script,
    expiry,
    attempt,
    version,
    user,
    isAuthTypeLocal,
    token,
  };
}

export type State = ReturnType<typeof useAddNode>;
