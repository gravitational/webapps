/**
 * Copyright 2020 Gravitational, Inc.
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

/**
 * Copyright 2020 Gravitational, Inc.
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

import React, { useEffect, useState } from 'react';
import useTeleport from 'teleport/useTeleport';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import cfg from 'teleport/config';
import { useAttemptNext } from 'shared/hooks';
import { Alert, Text, Indicator, Box, Flex, ButtonLink } from 'design';
import { NodeJoinToken } from 'teleport/services/nodes';

export default function NodeAddByAuto(props: Props) {
  const ctx = useTeleport();
  const { attempt, run } = useAttemptNext('processing');
  const [token, setToken] = useState(null as NodeJoinToken);
  const [script, setScript] = useState('');

  function getNodeJoinToken() {
    return ctx.nodeService.getNodeJoinToken().then(resp => {
      setToken(resp);
      setScript(
        `sudo bash -c "$(curl -sSL ${cfg.getNodeJoinScriptUrl(resp.id)})"`
      );
    });
  }

  useEffect(() => {
    run(() => getNodeJoinToken());
  }, []);

  if (attempt.status === 'processing') {
    return (
      <Box textAlign="center" mt={8}>
        <Indicator />
      </Box>
    );
  }

  if (attempt.status === 'failed') {
    return <Alert kind="danger" children={attempt.statusText} />;
  }

  return (
    <>
      <Text {...props}>
        Use the auto installer script to add a server to your cluster.
      </Text>
      <Text typography="subtitle1" bold caps mb={1}>
        Auto-Installing Script
      </Text>
      <TextSelectCopy text={script} />
      <Flex alignItems="center" justifyContent="space-between">
        <ButtonLink onClick={getNodeJoinToken}>Regenerate Script</ButtonLink>
        <Text>Script Expires in {token.expires}</Text>
      </Flex>
    </>
  );
}

type Props = {
  // handles styles
  [key: string]: any;
};
