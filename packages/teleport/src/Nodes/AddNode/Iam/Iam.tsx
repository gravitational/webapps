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
import DownloadLinks from 'teleport/components/DownloadLinks';
import { Pencil } from 'design/Icon';

export default function Iam({
  token,
  expiry,
  attempt,
  onGenerate,
  isEnterprise,
  version,
  onClose,
}: Props) {
  const { hostname, port } = window.document.location;
  const host = `${hostname}:${port || '443'}`;

  const [rules, setRules] = React.useState<RuleForm[]>([
    {
      awsAccount: '',
      awsArn: '',
      isCollapsed: false,
    },
  ]);

  function setRuleAtIndex(index: number, rule: RuleForm) {
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
    if (!validator.validate()) {
      return;
    }

    setRules(rules.map((rule: RuleForm) => ({ ...rule, isCollapsed: true })));
    onGenerate(rules);
  }

  return (
    <Validation>
      {({ validator }) => (
        <>
          <DialogContent flex="0 0 auto">
            {attempt.status === 'failed' && (
              <Alert kind="danger" children={attempt.statusText} />
            )}
            <Text mb={4}>
              {`Add any Teleport Node or Proxy
              with access to IAM credentials. `}
              {`You can read more
              about the IAM method in the `}
              <Link href="https://goteleport.com/docs/setup/guides/joining-nodes-aws/">
                documentation
              </Link>
              .
            </Text>
            <Box mb={4}>
              <Text bold as="span">
                Step 1
              </Text>{' '}
              - Download Teleport package to your computer
              <DownloadLinks isEnterprise={isEnterprise} version={version} />
            </Box>
            <Box>
              <Text bold as="span">
                Step 2
              </Text>{' '}
              - Setup AWS Rules
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
                        setRuleAtIndex(index, { ...rule, isCollapsed: false })
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
                          label="AWS Account"
                          autoFocus
                          onChange={e =>
                            setRuleAtIndex(index, {
                              ...rules[index],
                              awsAccount: e.target.value,
                            })
                          }
                          rule={value => requiredAwsAccount(value, rule)}
                          placeholder="111111111111"
                          value={rule.awsAccount}
                        />
                      </Box>
                      <FieldInput
                        mb={2}
                        label="AWS ARN"
                        onChange={e =>
                          setRuleAtIndex(index, {
                            ...rules[index],
                            awsArn: e.target.value,
                          })
                        }
                        placeholder="arn:aws:sts::111111111111:assumed-role/teleport-node-role/i-*"
                        value={rule.awsArn}
                      />
                    </>
                  )}
                </RuleBox>
              ))}
            </Box>
            <Box
              onClick={() =>
                setRules([
                  ...rules,
                  { awsAccount: '', awsArn: '', isCollapsed: false },
                ])
              }
            >
              <ButtonAddRule>+ Add new rule</ButtonAddRule>
            </Box>
            {token && (
              <>
                <Text mt="3" mb="2" bold typography="h5">
                  Script Generated
                </Text>
                <Text>
                  Start teleport with the following parameters. The script will
                  be valid for{' '}
                  <Text bold as={'span'}>
                    {expiry}.
                  </Text>
                </Text>
                <Box>
                  <TextSelectCopy
                    mt="2"
                    text={`teleport start --roles=node --token=${token} --auth-server=${host} --join-method=iam`}
                  />
                </Box>
              </>
            )}
          </DialogContent>
          <DialogFooter>
            <ButtonPrimary
              mr="3"
              disabled={attempt.status === 'processing'}
              onClick={() => handleGenerate(validator)}
            >
              {token ? 'Regenerate Script' : 'Generate Script'}
            </ButtonPrimary>
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
const requiredAwsAccount = (value, rule: Rule) => () => {
  if (!rule.awsAccount && !rule.awsArn) {
    return {
      valid: false,
      message: 'Rule cannot be empty',
    };
  }

  // no need for an AWS account if an ARN is set
  if (!value) {
    return { valid: true };
  }

  const isValidId = value.match(AWS_ACC_ID_REGEXP);
  if (!isValidId) {
    return {
      valid: false,
      message: 'AWS account must have 12 digits',
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
