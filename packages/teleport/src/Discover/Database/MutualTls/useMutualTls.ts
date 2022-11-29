/**
 * Copyright 2022 Gravitational, Inc.
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

import useAttempt from 'shared/hooks/useAttemptNext';

import cfg from 'teleport/config';
import TeleportContext from 'teleport/teleportContext';
import { useJoinTokenValue } from 'teleport/Discover/Shared/JoinTokenContext';

import { DbMeta } from '../../useDiscover';

import type { AgentStepProps } from '../../types';

export function useMutualTls({ ctx, props }: Props) {
  const { attempt, setAttempt, handleError } = useAttempt('');

  const joinToken = useJoinTokenValue();
  const meta = props.agentMeta as DbMeta;
  const clusterId = ctx.storeUser.getClusterId();

  function onNextStep(caCert: string) {
    if (!caCert) {
      props.nextStep();
      return;
    }

    setAttempt({ status: 'processing' });
    ctx.databaseService
      .updateDatabase(clusterId, {
        name: meta.db.hostname,
        caCert,
      })
      .then(() => props.nextStep())
      .catch(handleError);
  }

  const access = ctx.storeUser.getDatabaseServerAccess();
  return {
    attempt,
    onNextStep,
    canUpdateDatabase: access.edit,
    curlCmd: generateSignCertificateCurlCommand(
      clusterId,
      meta.db.name,
      joinToken?.id
    ),
  };
}

function generateSignCertificateCurlCommand(
  clusterId: string,
  hostname: string,
  token: string
) {
  if (!token) return '';

  const requestUrl = cfg.getDatabaseSignUrl(clusterId);
  const requestData = JSON.stringify({ hostname });

  // curl flag -OJ  makes curl use the file name
  // defined from the response header.
  return `curl https://${cfg.baseUrl}${requestUrl} \
  --data ${requestData} \
  --header 'Authorization: Bearer ${token}'  \
  --header 'Content-Type: application/json' -OJ; \
  tar -xvf teleport_mTLS_${hostname}.tar.gz
  `;
}

type Props = {
  ctx: TeleportContext;
  props: AgentStepProps;
};

export type State = ReturnType<typeof useMutualTls>;
