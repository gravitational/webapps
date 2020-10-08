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

import React from 'react';
import { NodeAdd } from './NodeAdd';
import { useTheme } from 'styled-components';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import { Alert, Text, Indicator, Box, Flex, ButtonLink } from 'design';

export default function ByScript(props: Props) {
  const monoFont = useTheme().fonts.mono;
  const { script, expires, getJoinToken, attempt, ...style } = props;

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
      <TextSelectCopy text={script} style={{ fontFamily: monoFont }} mb={2} />
      <Flex alignItems="center" justifyContent="space-between">
        <ButtonLink onClick={getJoinToken}>Regenerate Script</ButtonLink>
        <Text>Script Expires in {expires}</Text>
      </Flex>
    </>
  );
}

type PropTypes = Parameters<typeof NodeAdd>[0];

type Props = {
  script: string;
  expires: string;
  getJoinToken: PropTypes['createJoinToken'];
  attempt: PropTypes['attempt'];
  // handles styles
  [key: string]: any;
};
