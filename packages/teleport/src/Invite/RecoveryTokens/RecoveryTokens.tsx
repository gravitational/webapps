/*
Copyright 2021 Gravitational, Inc.

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

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Flex, Card, Text, Box, ButtonPrimary } from 'design';
import copyToClipboard from 'design/utils/copyToClipboard';
import selectElementContent from 'design/utils/selectElementContent';

export default function RecoveryTokens({
  recoveryTokens,
  redirect,
  passwordResetMode,
}: Props) {
  const [copied, setCopied] = useState(false);
  const tokensRef = useRef();

  const onCopyClick = () => {
    copyToClipboard(recoveryTokens.join(', '))
      .then(() => {
        setCopied(true);
        selectElementContent(tokensRef.current);
      })
      .finally(() => setTimeout(() => setCopied(false), 1500));
  };

  return (
    <PrintWrapper>
      <Card
        as={Flex}
        flexWrap="wrap"
        mx="auto"
        p={0}
        minWidth="704px"
        maxWidth="1200px"
        borderRadius={8}
        overflow="hidden"
      >
        <Flex
          flex={4}
          bg="primary.light"
          minWidth="704px"
          flexDirection="column"
          p={6}
        >
          <Box mb={5}>
            <Text typography="h2" mb={3} fontWeight={500}>
              {`${passwordResetMode ? 'New ' : ''}Backup & Recovery Tokens`}
            </Text>
            <Text mb={2}>
              Please{' '}
              <Text bold as="span">
                save these account recovery tokens in a safe offline place
              </Text>
              .
            </Text>
            <Text>
              You can use each token once if you lose your second factor
              authenticator or password.
            </Text>
          </Box>
          <Box>
            <Text bold color="text.secondary" mb={2}>
              RECOVERY TOKENS ({recoveryTokens.length} TOTAL)
            </Text>
            <Flex
              bg="primary.dark"
              pt={2}
              pr={2}
              pb={4}
              pl={3}
              mb={6}
              borderRadius={8}
              border={2}
              borderColor="secondary.light"
              justifyContent="space-between"
            >
              <Box mt={2}>
                <Text
                  style={{ fontFamily: 'mono', whiteSpace: 'pre-wrap' }}
                  fontSize={4}
                  ref={tokensRef}
                >
                  {recoveryTokens.join('\n\n')}
                </Text>
              </Box>
              <Flex flexDirection="column" className="no-print">
                <ButtonPrimary
                  onClick={onCopyClick}
                  style={{
                    maxWidth: '48px',
                    width: '100%',
                    padding: '4px 8px',
                    minHeight: '10px',
                    fontSize: '10px',
                  }}
                >
                  {copied ? 'COPIED' : 'COPY'}
                </ButtonPrimary>
                <ButtonPrimary
                  onClick={window.print}
                  mt={2}
                  style={{
                    maxWidth: '48px',
                    width: '100%',
                    padding: '4px 8px',
                    minHeight: '10px',
                    fontSize: '10px',
                  }}
                >
                  PRINT
                </ButtonPrimary>
              </Flex>
            </Flex>
            <ButtonPrimary
              width="100%"
              p={3}
              className="no-print"
              onClick={redirect}
            >
              <Text fontSize={4}>
                I HAVE SAVED MY RECOVERY TOKENS - CONTINUE
              </Text>
            </ButtonPrimary>
          </Box>
        </Flex>
        <Flex
          flex={2}
          bg="primary.main"
          minWidth="400px"
          flexDirection="column"
          p={6}
          className="no-print"
        >
          <Box mb={5}>
            <Text typography="h3" fontWeight={700} mb={3}>
              Why do I need these tokens?
            </Text>
            <Text fontSize={3}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero
              error quae aspernatur pariatur tenetur facilis iste sit provident
              iure officiis!
            </Text>
          </Box>
          <Box mb={5}>
            <Text typography="h3" fontWeight={700} mb={3}>
              How long do the tokens last for?
            </Text>
            <Text fontSize={3}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe id
              labore debitis excepturi illum ab maiores possimus dolorum, natus
              quas?
            </Text>
          </Box>
          {passwordResetMode && (
            <Box>
              <Text typography="h3" fontWeight={700} mb={3}>
                What about my old tokens?
              </Text>
              <Text fontSize={3}>
                Your old tokens are no longer valid, please replace them with
                the new ones.
              </Text>
            </Box>
          )}
        </Flex>
      </Card>
    </PrintWrapper>
  );
}

const PrintWrapper = styled(Box)`
  @media print {
    .no-print {
      display: none;
    }
  }
`;

type Props = {
  recoveryTokens: string[];
  redirect: () => void;
  passwordResetMode: boolean;
};
