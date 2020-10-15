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
import moment from 'moment';
import { NodeAdd } from './NodeAdd';
import { useTheme } from 'styled-components';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import { Alert, Text, Indicator, Box, ButtonLink } from 'design';

export default function ByScript(props: Props) {
  const monoFont = useTheme().fonts.mono;
  const { script, expiry, getJoinToken, attempt, ...style } = props;

  const duration = moment(new Date()).diff(expiry);
  const expiresText = moment.duration(duration).humanize();

  if (attempt.status === 'processing') {
    return (
      <Box textAlign="center">
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
        <br />
        Script will be valid for{' '}
        <Text bold as={'span'}>
          {expiresText}.
        </Text>
      </Text>
      <TextSelectCopy text={script} style={{ fontFamily: monoFont }} mb={2} />
      <Box>
        <ButtonLink onClick={getJoinToken}>Regenerate Script</ButtonLink>
      </Box>
    </>
  );
}

type PropTypes = Parameters<typeof NodeAdd>[0];

type Props = {
  script: string;
  expiry: PropTypes['expiry'];
  getJoinToken: PropTypes['createJoinToken'];
  attempt: PropTypes['attempt'];
  // handles styles
  [key: string]: any;
};
