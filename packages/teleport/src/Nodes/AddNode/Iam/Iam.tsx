import React, { useEffect } from 'react';
import { DialogContent } from 'design/Dialog';
import { Text, Box, ButtonPrimary, Link } from 'design';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import FieldInput from 'shared/components/FieldInput';
import Validation, { Validator } from 'shared/components/Validation';
import { Attempt } from 'shared/hooks/useAttemptNext';
import { Rule } from 'teleport/services/joinToken';

export default function Iam({ token, expiry, attempt, onGenerate }: Props) {
  const { hostname, port } = window.document.location;
  const host = `${hostname}:${port || '443'}`;

  const [awsAccount, setAwsAccount] = React.useState('');
  const [awsArn, setAwsArn] = React.useState('');

  useEffect(() => {}, [token]);

  function handleGenerate(validator: Validator) {
    if (!validator.validate()) {
      return;
    }

    // TODO allow multiple aws accounts and arns
    onGenerate([{ awsAccount, awsArn }]);
  }

  // TODO deal with token generation failed
  // show err, ask user to regenerate
  return (
    <Validation>
      {({ validator }) => (
        <>
          <DialogContent flex="0 0 auto">
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
            <Box mb={4}>
              <Box>
                <FieldInput
                  label="AWS Account"
                  autoFocus
                  onChange={e => setAwsAccount(e.target.value)}
                  rule={requiredAwsAccount}
                  placeholder="111111111111"
                  value={awsAccount}
                />
              </Box>
              <FieldInput
                label="AWS ARN (optional)"
                autoFocus
                onChange={e => setAwsArn(e.target.value)}
                placeholder="arn:aws:sts::111111111111:assumed-role/teleport-node-role/i-*"
                value={awsArn}
              />
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
                <Box mb={4}>
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
