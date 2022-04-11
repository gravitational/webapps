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
import { formatDistanceStrict } from 'date-fns';
import useAttempt from 'shared/hooks/useAttemptNext';
import TeleportContext from 'teleport/teleportContext';
import { BashCommand } from 'teleport/services/nodes';
import cfg from 'teleport/config';
import { JoinToken, Rule } from 'teleport/services/joinToken';

export default function useAddNode(ctx: TeleportContext) {
  const { attempt, run } = useAttempt('processing');
  const isEnterprise = ctx.isEnterprise;
  const version = ctx.storeUser.state.cluster.authVersion;
  const user = ctx.storeUser.state.username;
  const isAuthTypeLocal = !ctx.storeUser.isSso();
  const [method, setMethod] = useState<JoinMethod>('iam');
  const [script, setScript] = useState('');
  const [expiry, setExpiry] = useState('');
  const [token, setToken] = useState('');
  const [iamJoinToken, setIamJoinToken] = useState('');
  const [iamExpiry, setIamExpiry] = useState('');

  useEffect(() => {
    createJoinToken();
  }, []);

  function createJoinToken() {
    return run(() =>
      ctx.joinTokenService.fetchJoinToken(['Node'], 'token').then(token => {
        const cmd = createNodeBashCommand(token);
        setExpiry(cmd.expires);
        setScript(cmd.text);
        setToken(token.id);
      })
    );
  }

  function createIamJoinToken(rules: Rule) {
    return run(() =>
      ctx.joinTokenService
        .fetchJoinToken(['Node'], 'iam', [rules])
        .then(iamToken => {
          const expires = formatDistanceStrict(
            new Date(),
            new Date(iamToken.expiry)
          );
          setIamExpiry(expires);
          setIamJoinToken(iamToken.id);
        })
    );
  }

  return {
    isEnterprise,
    createJoinToken,
    method,
    setMethod,
    script,
    expiry,
    attempt,
    version,
    user,
    isAuthTypeLocal,
    token,
    iamJoinToken,
    createIamJoinToken,
    iamExpiry,
  };
}

export function createNodeBashCommand(
  node: JoinToken,
  method?: JoinMethod
): BashCommand {
  const { expiry, id } = node;

  const text = createBashCommand(id, method);
  const expires = formatDistanceStrict(new Date(), new Date(expiry));

  return {
    text,
    expires,
  };
}

export function createBashCommand(tokenId: string, method?: JoinMethod) {
  const param = method === 'iam' ? '?method=iam' : '';
  return `sudo bash -c "$(curl -fsSL ${cfg.getNodeScriptUrl(
    tokenId
  )}${param})"`;
}

export type JoinMethod = 'automatic' | 'manual' | 'iam';

export type State = ReturnType<typeof useAddNode>;
