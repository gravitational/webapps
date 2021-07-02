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

import React from 'react';
import ConnectDialog from './AwsConnectDialog';

export default {
  title: 'Teleport/Apps',
};

export const AwsConnectDialog = () => <ConnectDialog {...props} />;

const props = {
  app: {
    name: 'aws-console-1',
    id: 'one-aws-console-1-awsconsole-1.teleport-proxy.com',
    uri: 'https://console.aws.amazon.com/ec2/v2/home',
    publicAddr: 'awsconsole-1.teleport-proxy.com',
    tags: ['aws_account_id: joe123'],
    awsRoles: [
      {
        arn: 'arn:aws:iam::joe123:role/EC2FullAccess',
        display: 'EC2FullAccess',
      },
      {
        arn: 'arn:aws:iam::joe123:role/EC2ReadOnly',
        display: 'EC2ReadOnly',
      },
    ],
    clusterId: 'one',
    fqdn: 'awsconsole-1.com',
    launchUrl: 'https://test.test/one/awsconsole-1.com',
  },
  onClose: () => null,
};
