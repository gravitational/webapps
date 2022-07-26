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

import React from 'react';
import { Indicator, Box, Text } from 'design';
import { Danger } from 'design/Alert';
import AjaxPoller from 'teleport/components/AjaxPoller';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import { Header, ActionButtons } from '../Shared';
import type { AgentStepProps } from '../types';
import { useDiscoverContext } from '../discoverContextProvider';
import { useConnectionDiagnostic } from './useConnectionDiagnostic';
import DownloadInstructions from '../DownloadInstructions';

import type { State } from './useConnectionDiagnostic';

const POLLING_INTERVAL = 3000; // every 3 seconds

export default function Container(props: AgentStepProps) {
  const ctx = useDiscoverContext();
  const state = useConnectionDiagnostic({ ctx, props });
  return <ConnectionDiagnostic {...state} />;
}

export function ConnectionDiagnostic({
  attempt,
  onRefresh,
  diagnostic,
  connectionId,
  fetchErrMsg,
}: State) {
  const waitingForExecution = !diagnostic && !fetchErrMsg;
  const isFetchError = !diagnostic && fetchErrMsg;
  return (
    <Box>
      <Header>Test Connection</Header>
      <Box mb={3}>
        <Text>Step 1: tsh install</Text>
        <DownloadInstructions version={'11.0.0'} />
      </Box>
      <Box mb={3}>
        <Text>Step 2: tsh logins</Text>
        <TextSelectCopy text={'lorem ipsum dolores'} mt={2} maxWidth="800px" />
      </Box>
      <Box mb={3}>
        <Text>Step 3: Test Connection</Text>
        <TextSelectCopy
          text={`tsh ssh --test-id=${connectionId} <principal/linux_user>@hostname`}
          mt={2}
          maxWidth="800px"
        />
        <Box mt={3}>
          <Text>Output</Text>
          <Box
            mb={3}
            p={3}
            css={`
              border: 1px solid ${diagnostic?.success === false ? 'red' : ''};
            `}
          >
            This box will be RED if there was a test connection started, but
            returned !success
            {waitingForExecution && <Text>Waiting for command execution</Text>}
            {isFetchError && (
              <Text
                css={`
                  color: red;
                `}
              >
                {fetchErrMsg}
              </Text>
            )}
          </Box>
          {diagnostic?.success && (
            <Box
              mb={3}
              p={3}
              css={`
                border: 1px solid green;
              `}
            >
              This box only shows up when diagnostic is success
            </Box>
          )}
        </Box>
      </Box>
      <ActionButtons />
      <AjaxPoller time={POLLING_INTERVAL} onFetch={onRefresh} />
    </Box>
  );
}
