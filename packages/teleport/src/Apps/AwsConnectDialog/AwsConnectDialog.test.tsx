import React from 'react';
import { screen, render, fireEvent } from 'design/utils/testing';
import cfg from 'teleport/config';
import AwsConnectDialog from './AwsConnectDialog';

test('correct launch url is generated for a selected role', () => {
  jest.spyOn(window, 'open').mockImplementation(() => null);
  jest.spyOn(cfg, 'getAppLauncherRoute');

  render(<AwsConnectDialog {...props} />);

  const roleToSelect = 'readonly';
  const expectedLaunchUrl =
    '/web/launch/awsconsole-1.com/one/awsconsole-1.teleport-proxy.com/arn:aws:iam::joe123:role%2FEC2ReadOnly';

  const roleSelectEl = document.querySelector('input');
  const launchBtn = screen.queryByText('Launch');

  fireEvent.change(roleSelectEl, { target: { value: roleToSelect } });
  fireEvent.focus(roleSelectEl);
  fireEvent.keyDown(roleSelectEl, { key: 'Enter', keyCode: 13 });
  fireEvent.click(launchBtn);

  expect(cfg.getAppLauncherRoute).toHaveBeenCalledWith({
    fqdn: 'awsconsole-1.com',
    clusterId: 'one',
    publicAddr: 'awsconsole-1.teleport-proxy.com',
    arn: 'arn:aws:iam::joe123:role/EC2ReadOnly',
  });

  expect(window.open).toHaveBeenCalledWith(expectedLaunchUrl, '_blank');
});

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
