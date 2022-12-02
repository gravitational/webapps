import React from 'react';

import { Box } from 'design';

import { ActionButtons, Header, HeaderSubtitle } from 'teleport/Discover/Shared';
import TextSelectCopy from 'teleport/components/TextSelectCopy';

interface ConfigureIAMPolicyProps {
  nextStep(): void;
}

const iamPolicy = `aws iam create-policy $(cat <<-END
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
          "rds:DescribeDBInstances",
          "rds:ModifyDBInstance"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
          "iam:GetRolePolicy",
          "iam:PutRolePolicy",
          "iam:DeleteRolePolicy"
      ],
      "Resource": "arn:aws:iam::{account-id}:role/sample-role"
    }
  ]
}
END
)`;

export function ConfigureIAMPolicy(props: ConfigureIAMPolicyProps) {
  return (
    <Box>
      <Header>Configure IAM Policy</Header>
      <HeaderSubtitle>Sub-title text goes here</HeaderSubtitle>

      <TextSelectCopy text={iamPolicy} mt={2} mb={5} bash allowMultiline />

      <ActionButtons
        onProceed={() => props.nextStep()}
      />
    </Box>
  )
}
