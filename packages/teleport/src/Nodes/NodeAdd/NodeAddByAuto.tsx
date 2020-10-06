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

import React, { useEffect } from 'react';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import cfg from 'teleport/config';
import { useAttemptNext } from 'shared/hooks';
import { Alert, Text, Indicator, Box, Flex, ButtonLink } from 'design';
import { NodeJoinToken } from 'teleport/services/nodes';

export default function NodeAddByAuto(props: Props) {
  const { token, getJoinToken, ...style } = props;
  const { attempt, setAttempt, run } = useAttemptNext('processing');

  const expires = token ? token.expires : '';
  const script = token
    ? `sudo bash -c "$(curl -sSL ${cfg.getNodeJoinScriptUrl(token.id)})"`
    : '';

  useEffect(() => {
    if (!token) {
      run(() => props.getJoinToken());
    } else {
      setAttempt({ status: 'success' });
    }
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
      <Text {...style}>
        Use the auto installer script to add a server to your cluster.
      </Text>
      <Text typography="subtitle1" bold caps mb={1}>
        Auto-Installing Script
      </Text>
      <TextSelectCopy text={script} isTerminal={true} />
      <Flex alignItems="center" justifyContent="space-between">
        <ButtonLink onClick={getJoinToken}>Regenerate Script</ButtonLink>
        <Text>Script Expires in {expires}</Text>
      </Flex>
    </>
  );
}

type Props = {
  token: NodeJoinToken;
  getJoinToken(): Promise<void>;
  // handles styles
  [key: string]: any;
};
