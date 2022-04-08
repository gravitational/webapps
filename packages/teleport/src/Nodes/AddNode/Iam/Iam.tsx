import React from 'react';
import styled from 'styled-components';
import { DialogContent, DialogFooter } from 'design/Dialog';
import {
  Text,
  Box,
  ButtonPrimary,
  Link,
  Alert,
  ButtonLink,
  ButtonSecondary,
} from 'design';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import FieldInput from 'shared/components/FieldInput';
import Validation, { Validator } from 'shared/components/Validation';
import { Attempt } from 'shared/hooks/useAttemptNext';
import { Rule } from 'teleport/services/joinToken';
import { Pencil } from 'design/Icon';

export default function Iam({ token, attempt, onGenerate, onClose }: Props) {
  const { hostname, port } = window.document.location;
  const host = `${hostname}:${port || '443'}`;

  const [rules, setRules] = React.useState<RuleForm[]>([
    {
      awsAccountId: '',
      awsArn: '',
      isCollapsed: false,
    },
  ]);

  function updateRule(index: number, rule: RuleForm) {
    const newRules = [...rules];
    newRules[index] = rule;
    setRules(newRules);
  }

  function handleRemove(index: number) {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  }

  function handleGenerate(validator: Validator) {
    // validate() will run the rule functions of the form inputs
    // it will automatically update the UI with error messages if the validation fails.
    // No need for further actions here in case it fails
    if (!validator.validate()) {
      return;
    }

    setRules(rules.map((rule: RuleForm) => ({ ...rule, isCollapsed: true })));
    onGenerate(rules);
  }

  function addRule() {
    setRules([...rules, { awsAccountId: '', awsArn: '', isCollapsed: false }]);
  }

  function handleChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    updateRule(index, {
      ...rules[index],
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Validation>
      {({ validator }) => (
        <>
          <DialogContent flex="0 0 auto" minHeight="400px">
            {attempt.status === 'failed' && (
              <Alert kind="danger" children={attempt.statusText} />
            )}
            <Box mb={4}>
              <Text bold as="span" mt={1}>
                Step 1
              </Text>{' '}
              - Assign IAM role to AWS resources
              <Text mt={1}>
                Every node using AWS IAM method to join your Teleport cluster
                needs to be assigned an IAM role.
              </Text>
              <Text mt={1}>
                If it doesn't already exist, create the IAM role "teleport_join"
                and add it to all resources you wish to join your Teleport
                cluster
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
              {rules.map((rule, index) => (
                <RuleBox
                  key={index}
                  bg="primary.lighter"
                  borderRadius="2"
                  mt={1}
                  p="3"
                  position="relative"
                >
                  <Text typography="h5">{`Rule #${index + 1}`}</Text>
                  {rule.isCollapsed && (
                    <ButtonEditRule
                      title="edit rule"
                      onClick={() =>
                        updateRule(index, { ...rule, isCollapsed: false })
                      }
                    >
                      <Pencil />
                    </ButtonEditRule>
                  )}
                  {!rule.isCollapsed && (
                    <>
                      {index !== 0 && (
                        <ButtonRemoveRule onClick={() => handleRemove(index)}>
                          Remove
                        </ButtonRemoveRule>
                      )}
                      <Box>
                        <FieldInput
                          label="AWS Account ID - nodes must match this AWS Account ID to join your Teleport cluster"
                          autoFocus
                          name="awsAccountId"
                          onChange={e => handleChange(index, e)}
                          rule={requiredAwsAccountId}
                          placeholder="111111111111"
                          value={rule.awsAccountId}
                        />
                      </Box>
                      <FieldInput
                        mb={2}
                        label="AWS ARN (optional) - nodes must match this AWS ARN to join your Teleport cluster"
                        name="awsArn"
                        onChange={e => handleChange(index, e)}
                        placeholder="arn:aws:sts::111111111111:assumed-role/teleport-node-role/i-*"
                        value={rule.awsArn}
                      />
                    </>
                  )}
                </RuleBox>
              ))}
              <ButtonAddRule onClick={addRule}>+ Add new rule</ButtonAddRule>
            </Box>
            <Box>
              <Text bold as="span">
                Step 3
              </Text>{' '}
              - Generate and run script
              <ButtonPrimary
                mt={1}
                block
                disabled={attempt.status === 'processing'}
                onClick={() => handleGenerate(validator)}
              >
                Generate Script
              </ButtonPrimary>
              {token && (
                <Box>
                  <TextSelectCopy
                    mt="2"
                    text={`teleport start --roles=node --token=${token} --auth-server=${host} --join-method=iam`}
                  />
                  <Text mt={2}>
                    The token generated is not a secret and will not expire. You
                    can use this script to join multiple nodes.
                  </Text>
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogFooter>
            <ButtonSecondary onClick={onClose}>Close</ButtonSecondary>
          </DialogFooter>
        </>
      )}
    </Validation>
  );
}

const RuleBox = styled(Box)`
  margin: 4px 0 12px 0;
  position: relative;

  &:last-of-type {
    margin-bottom: 8px;
  }
`;

const ButtonAddRule = styled(ButtonLink)`
  font-weight: bold;
  font-size: 14px;
  color: white;
  text-decoration: none;
`;

const ButtonEditRule = styled(ButtonLink)`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 16px;
  text-decoration: none;
`;

const ButtonRemoveRule = styled(ButtonLink)`
  position: absolute;
  top: 12px;
  right: 12px;
`;

// AWS account ID is a 12 digit string
export const AWS_ACC_ID_REGEXP = /^\d{12}$/;
const requiredAwsAccountId = value => () => {
  const isValidId = value.match(AWS_ACC_ID_REGEXP);
  if (!isValidId) {
    return {
      valid: false,
      message: 'AWS account must be 12 digits',
    };
  }
  return {
    valid: true,
  };
};

type RuleForm = Rule & {
  isCollapsed: boolean;
};

type Props = {
  token: string;
  expiry: string;
  attempt: Attempt;
  onGenerate(rules: Rule[]): Promise<any>;
  isEnterprise: boolean;
  version: string;
  onClose(): void;
};
