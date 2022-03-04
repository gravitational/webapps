/*
Copyright 2020 Gravitational, Inc.

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

import { useState } from 'react';
import { formatDistanceStrict } from 'date-fns';
import useAttempt from 'shared/hooks/useAttemptNext';
import { BashCommand, NodeToken } from 'teleport/services/nodes';
import cfg from 'teleport/config';
import TeleportContext from 'teleport/teleportContext';

export default function useAddApp(ctx: TeleportContext) {
  const { attempt, run } = useAttempt('');
  const user = ctx.storeUser.state.username;
  const version = ctx.storeUser.state.cluster.authVersion;
  const isAuthTypeLocal = !ctx.storeUser.isSso();
  const isEnterprise = ctx.isEnterprise;
  const [automatic, setAutomatic] = useState(isEnterprise);
  const [cmd, setCmd] = useState('');
  const [expires, setExpires] = useState('');
  const [token, setToken] = useState('');

  function createToken(appName = '', appUri = '') {
    return run(() =>
      ctx.nodeService.fetchJoinToken().then(token => {
        const cmd = createAppBashCommand(token, appName, appUri);
        setExpires(cmd.expires);
        setCmd(cmd.text);
        setToken(token.id);
      })
    );
  }

  return {
    user,
    version,
    createToken,
    cmd,
    expires,
    attempt,
    automatic,
    setAutomatic,
    isAuthTypeLocal,
    isEnterprise,
    token,
  };
}

export function createAppBashCommand(
  token: NodeToken,
  appName = '',
  appUri = ''
): BashCommand {
  const expires = formatDistanceStrict(new Date(), token.expiry);

  // encode uri so it can be passed around as URL query parameter
  const encoded = encodeURIComponent(appUri)
    // encode single quotes so they do not break the curl parameters
    .replace(/'/g, '%27');

  const bashUrl =
    cfg.baseUrl +
    cfg.api.appNodeScriptPath
      .replace(':token', token.id)
      .replace(':name', appName)
      .replace(':uri', encoded);

  const text = `sudo bash -c "$(curl -fsSL '${bashUrl}')"`;

  return {
    text,
    expires,
  };
}

export type State = ReturnType<typeof useAddApp>;
