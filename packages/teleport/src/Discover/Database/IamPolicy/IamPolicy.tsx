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
import { Text, Box, Flex, Indicator, Link } from 'design';
import * as Icons from 'design/Icon';

import useTeleport from 'teleport/useTeleport';
import { TextSelectCopyMulti } from 'teleport/components/TextSelectCopy';

import {
  HeaderSubtitle,
  ActionButtons,
  Header,
  ButtonBlueText,
} from '../../Shared';

import { useIamPolicy, State } from './useIamPolicy';

import type { AgentStepProps } from '../../types';

export function IamPolicy(props: AgentStepProps) {
  const ctx = useTeleport();
  const state = useIamPolicy({ ctx, props });

  return <IamPolicyView {...state} />;
}

export function IamPolicyView({
  attempt,
  nextStep,
  iamPolicy,
  fetchIamPolicy,
  iamPolicyName,
}: State) {
  return (
    <Box maxWidth="800px">
      <Header>Configure IAM Policy</Header>
      <HeaderSubtitle>
        Teleport needs AWS IAM permissions to be able to discover and register
        RDS instances and configure IAM authentications.
      </HeaderSubtitle>
      {attempt.status === 'failed' ? (
        <>
          <Text my={3}>
            <Icons.Warning ml={1} mr={2} color="danger" />
            Encountered Error: {attempt.statusText}
          </Text>
          <ButtonBlueText ml={1} onClick={fetchIamPolicy}>
            Retry
          </ButtonBlueText>
        </>
      ) : (
        <Flex height="428px">
          {attempt.status === 'processing' && (
            <Flex width="404px" justifyContent="center" alignItems="center">
              <Indicator />
            </Flex>
          )}
          {attempt.status === 'success' && (
            <Box>
              <Text bold>
                Run this AWS CLI command to create a IAM policy. <br />
                Then attach this policy to appropriate AWS resources (eg.{' '}
                <Link
                  href="https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-and-attach-iam-policy.html"
                  target="_blank"
                >
                  IAM users
                </Link>
                ,{' '}
                <Link
                  href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role"
                  target="_blank"
                >
                  ec2 instance
                </Link>
                ).
              </Text>
              <Box mt={2} mb={1}>
                <TextSelectCopyMulti
                  lines={[
                    {
                      text:
                        `aws iam create-policy \\\n` +
                        `--policy-name ${iamPolicyName} \\\n` +
                        `--policy-document \\\n` +
                        `'${JSON.stringify(
                          JSON.parse(iamPolicy.aws.policy_document),
                          null,
                          2
                        )}'`,
                    },
                  ]}
                />
              </Box>
            </Box>
          )}
        </Flex>
      )}
      <ActionButtons
        onProceed={nextStep}
        disableProceed={attempt.status !== 'success'}
      />
    </Box>
  );
}
