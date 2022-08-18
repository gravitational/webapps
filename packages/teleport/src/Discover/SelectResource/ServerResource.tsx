import React from 'react';

import { Link, Text } from 'design';

import { ActionButtons, TextBox } from 'teleport/Discover/Shared';

interface ServerResourceProps {
  disabled: boolean;
  onProceed: () => void;
}

export function ServerResource(props: ServerResourceProps) {
  let content = <TeleportVersions />;
  if (props.disabled) {
    content = <PermissionsErrorMessage />;
  }

  return (
    <>
      {content}

      <ActionButtons
        onProceed={() => props.onProceed()}
        disableProceed={props.disabled}
      />
    </>
  );
}

function TeleportVersions() {
  return (
    <TextBox data-testid="server-teleport-versions">
      <Text typography="h5">
        Teleport officially supports the following operating systems:
      </Text>
      <ul style={{ paddingLeft: 28 }}>
        <li>Ubuntu 14.04+</li>
        <li>Debian 8+</li>
        <li>RHEL/CentOS 7+</li>
        <li>Amazon Linux 2</li>
        <li>macOS (Intel)</li>
      </ul>
      <Text>
        For a more comprehensive list, visit{' '}
        <Link href="https://goteleport.com/download" target="_blank">
          https://goteleport.com/download
        </Link>
        .
      </Text>
    </TextBox>
  );
}

function PermissionsErrorMessage() {
  return (
    <TextBox data-testid="server-permissions-error">
      <Text typography="h5">
        You are not able to add new Servers. There are two possible reasons for
        this:
      </Text>
      <ul style={{ paddingLeft: 28 }}>
        <li>
          Your Teleport Enterprise license does not include Server Access. Reach
          out to your Teleport admin to enable Server Access.
        </li>
        <li>
          You don’t have sufficient permissions to add Servers. Reach out to
          your Teleport admin to request additional permissions.
        </li>
      </ul>
    </TextBox>
  );
}
