import React from 'react';
import { Text, Box, Link, Input } from 'design';
import type { Rule } from 'teleport/services/joinToken';
import type { State } from '../useAddNode';
import NextButton from '../NextButton';

export default function Iam({ refCallback, next }: Props) {
  return (
    <Box ref={refCallback}>
      <Box mb={4}>
        <Text bold as="span" mt={1}>
          Step 1
        </Text>{' '}
        - Assign IAM role to AWS resources
        <Text mt={2}>
          Every node using AWS IAM method to join your Teleport cluster needs to
          be assigned an IAM role.
        </Text>
        <Text mt={1}>
          If it doesn't already exist, create the IAM role "teleport_join" and
          add it to all resources you wish to join your Teleport cluster
        </Text>
        <Text mt={1}>
          For more information, see documentation{' '}
          <Link href="https://goteleport.com/docs/setup/guides/joining-nodes-aws/">
            here
          </Link>
          .
        </Text>
      </Box>
      <Box mb={4}>
        <Text bold as="span" mt={1}>
          Step 2
        </Text>{' '}
        - Specify which nodes can join your Teleport cluster.
        <Box mt={2}>
          <Input
            // onChange={}
            placeholder="111111111111"
            // value={rule.awsAccountId}
          />
        </Box>
        <Input
          // onChange={e => setRule({ ...rule, awsArn: e.target.value })}
          placeholder="arn:aws:sts::111111111111:assumed-role/teleport-node-role/i-*"
          // value={rule.awsArn}
        />
      </Box>
      <NextButton next={next} />
    </Box>
  );
}

type Props = {
  next(): void;
  refCallback: (node: HTMLElement) => void;
};
