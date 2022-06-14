import React from 'react';
import { Text, Box, Link, Input } from 'design';
import type { Rule } from 'teleport/services/joinToken';
import type { State } from '../useAddNode';
import NextButton from '../NextButton';

export default function Iam({ refCallback, next }: Props) {
  return (
    <Box ref={refCallback}>
      <Box mb={2}>
        <Text bold mt={1} fontSize={'16px'}>
          Step 1 - Assign IAM role to AWS resources
        </Text>
        <Text mt={3} style={{ lineHeight: '1.5rem' }}>
          Every node using the AWS IAM method to join your Teleport cluster
          needs to be assigned an IAM role. If it doesn't already exist, create
          the IAM role "teleport_join" and add it to all resources you wish to
          join your Teleport cluster.
        </Text>
        <Text mt={3}>
          For more information, see the{' '}
          <Link href="https://goteleport.com/docs/setup/guides/joining-nodes-aws/">
            documentation here
          </Link>
          .
        </Text>
      </Box>
      <Box mb={3} mt={3}>
        <Text bold mt={1} mb={3} fontSize={'16px'}>
          Step 2 - Specify which nodes can join your Teleport cluster.
        </Text>
        <Text bold as="span">
          AWS Account ID{' '}
        </Text>
        <Text as="span">
          - nodes must match this AWS Account ID to join your Teleport cluster.
        </Text>
        <Box mt={2} mb={3}>
          <Input
            // onChange={}
            placeholder="111111111111"
            // value={rule.awsAccountId}
          />
        </Box>
        <Text bold as="span">
          AWS ARN (optional){' '}
        </Text>
        <Text as="span">
          - nodes must match this AWS ARN to join your Teleport cluster.
        </Text>
        <Box mt={2}>
          <Input
            // onChange={e => setRule({ ...rule, awsArn: e.target.value })}
            placeholder="arn:aws:sts::111111111111:assumed-role/teleport-node-role/i-*"
            // value={rule.awsArn}
          />
        </Box>
      </Box>
      <NextButton next={next} />
    </Box>
  );
}

type Props = {
  next(): void;
  refCallback: (node: HTMLElement) => void;
};
