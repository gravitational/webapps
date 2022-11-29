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

import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, Box, Flex } from 'design';
import { Danger } from 'design/Alert';
import TextEditor from 'shared/components/TextEditor';

import useTeleport from 'teleport/useTeleport';
import { TextSelectCopyMulti } from 'teleport/components/TextSelectCopy';

import { HeaderSubtitle, ActionButtons, Mark, Header } from '../../Shared';
import { dbCU } from '../../yamlTemplates';

import { useMutualTls, State } from './useMutualTls';

import type { AgentStepProps } from '../../types';

export function MutualTls(props: AgentStepProps) {
  const ctx = useTeleport();
  const state = useMutualTls({ ctx, props });

  return <MutualTlsView {...state} />;
}

export function MutualTlsView({
  attempt,
  onNextStep,
  curlCmd,
  canUpdateDatabase,
}: State) {
  const [caCert, setCaCert] = useState('');

  return (
    <Box maxWidth="800px">
      <Header>Configure Mutual TLS</Header>
      <HeaderSubtitle>Lorem ipsum.</HeaderSubtitle>
      {attempt.status === 'failed' && <Danger children={attempt.statusText} />}
      {!canUpdateDatabase && (
        <Box>
          <Text>
            You don't have permission to update a database.
            <br />
            Please ask your Teleport administrator to update your role and add
            the <Mark>db</Mark> rule:
          </Text>
          <Flex minHeight="195px" mt={3}>
            <TextEditor
              readOnly={true}
              data={[{ content: dbCU, type: 'yaml' }]}
            />
          </Flex>
        </Box>
      )}
      {canUpdateDatabase && (
        <>
          <Box mb={4}>
            <Text bold>
              Run the command below to download Teleport's CA and generate
              cert/key pair in order to configure mutual TLS.
            </Text>
            <Box mt={2} mb={1}>
              <TextSelectCopyMulti lines={[{ text: curlCmd }]} />
            </Box>
          </Box>
          <StyledBox mb={6}>
            <Text bold mb={2}>
              After Running the Command
            </Text>
            <Box mb={2}>
              Add the following to the PostgreSQL configuration file{' '}
              <Mark>postgresql.conf</Mark>, to have your server accept TLS
              connections
              <TextSelectCopyMulti
                bash={false}
                lines={[
                  {
                    text:
                      `ssl = on\n` +
                      `ssl_cert_file = '/<path to>/server.crt'\n` +
                      `ssl_key_file = '/<path to>/server.key'\n` +
                      `ssl_ca_file = '/<path to>/server.cas'`,
                  },
                ]}
              />
            </Box>
          </StyledBox>
          <Box mb={5}>
            <Text bold>Add a copy of your CA certificate*</Text>
            <Text mb={2}>
              * Only required if your database is configured with a certificate
              signed by a third-party CA. Adding a copy allows Teleport to trust
              it.
            </Text>
            <Box
              mt={2}
              height="100px"
              width="800px"
              as="textarea"
              p={2}
              borderRadius={2}
              placeholder="Copy and paste your CA certificate"
              value={caCert}
              onChange={e => setCaCert(e.target.value)}
              autoFocus
              style={{ outline: 'none' }}
            />
          </Box>
        </>
      )}
      <ActionButtons
        onProceed={() => onNextStep(caCert)}
        disableProceed={attempt.status === 'processing'}
      />
    </Box>
  );
}

const StyledBox = styled(Box)`
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 20px;
`;
