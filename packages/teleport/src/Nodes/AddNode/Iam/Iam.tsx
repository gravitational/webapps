import React, { useEffect } from 'react';
import styled from 'styled-components';
import theme from 'design/theme';
import { DialogContent } from 'design/Dialog';
import { Text, Box, ButtonPrimary, Link, Alert, ButtonLink } from 'design';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import FieldInput from 'shared/components/FieldInput';
import Validation, { Validator } from 'shared/components/Validation';
import { Attempt } from 'shared/hooks/useAttemptNext';
import { Rule } from 'teleport/services/joinToken';

export default function Iam({ token, expiry, attempt, onGenerate }: Props) {
  const { hostname, port } = window.document.location;
  const host = `${hostname}:${port || '443'}`;

  const [rules, setRules] = React.useState<Rule[]>([
    {
      awsAccount: '',
      awsArn: '',
    },
  ]);

  function setRuleAtIndex(index: number, rule: Rule) {
    const newRules = [...rules];
    newRules[index] = rule;
    setRules(newRules);
  }

  function removeRule(index: number) {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  }

  useEffect(() => {}, [token]);

  function handleGenerate(validator: Validator) {
    if (!validator.validate()) {
      return;
    }

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
            <Text>
              {`The IAM join method is available to any Teleport Node or Proxy
              with access to IAM credentials.`}
            </Text>
            <Text mb={4}>
              {`You can read more
              about the IAM method in the `}
              <Link href="https://goteleport.com/docs/setup/guides/joining-nodes-aws/">
                documentation
              </Link>
              .
            </Text>
            <Box>
              {rules.map((rule, index) => (
                <RuleBox
                  key={index}
                  bg="primary.lighter"
                  borderRadius="2"
                  p="3"
                  position="relative"
                >
                  <Text typography="h5">{`Rule #${index + 1}`}</Text>
                  {index !== 0 && (
                    <ButtonRemoveRule onClick={() => removeRule(index)}>
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
                      rule={requiredAwsAccount}
                      placeholder="111111111111"
                      value={rule.awsAccount}
                    />
                  </Box>
                  <FieldInput
                    mb={2}
                    label="AWS ARN (optional)"
                    onChange={e =>
                      setRuleAtIndex(index, {
                        ...rules[index],
                        awsArn: e.target.value,
                      })
                    }
                    placeholder="arn:aws:sts::111111111111:assumed-role/teleport-node-role/i-*"
                    value={rule.awsArn}
                  />
                </RuleBox>
              ))}
            </Box>
            <Box mb="2">
              <ButtonLink
                onClick={() =>
                  setRules([...rules, { awsAccount: '', awsArn: '' }])
                }
              >
                Add new rule
              </ButtonLink>
            </Box>
            <Box>
              <ButtonPrimary
                mr="3"
                disabled={attempt.status === 'processing'}
                onClick={() => handleGenerate(validator)}
              >
                {token ? 'Regenerate Script' : 'Generate Script'}
              </ButtonPrimary>
            </Box>
            {token && (
              <>
                <Text mt="3">
                  The script will be valid for{' '}
                  <Text bold as={'span'}>
                    {expiry}.
                  </Text>
                </Text>
                <Box>
                  {'Start the Teleport agent  with the following parameters'}
                  <TextSelectCopy
                    mt="2"
                    text={`teleport start --roles=node --token=${token} --auth-server=${host}`}
                  />
                </Box>
              </>
            )}
          </DialogContent>
        </>
      )}
    </Validation>
  );
}

const RuleBox = styled(Box)`
  margin: 4px 0 18px 0;
  position: relative;

  &:last-of-type {
    margin-bottom: 8px;
  }
`;

const ButtonRemoveRule = styled(ButtonLink)`
  position: absolute;
  top: 12px;
  right: 12px;
`;

export const AWS_ACC_ID_REGEXP = /^\d{12}$/;
const requiredAwsAccount = value => () => {
  if (!value || value.length === 0) {
    return {
      valid: false,
      message: 'AWS account is required',
    };
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

type Props = {
  token: string;
  expiry: string;
  attempt: Attempt;
  onGenerate(rules: Rule[]): Promise<any>;
};
