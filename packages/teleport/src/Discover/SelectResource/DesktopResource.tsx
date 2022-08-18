import React from 'react';

import { Text } from 'design';

import { ActionButtons, TextBox } from 'teleport/Discover/Shared';

interface DesktopResourceProps {
  disabled: boolean;
}

export function DesktopResource(props: DesktopResourceProps) {
  let content;
  if (props.disabled) {
    content = <PermissionsErrorMessage />;
  }

  return (
    <>
      {content}

      <ActionButtons
        proceedHref="https://goteleport.com/docs/desktop-access/getting-started/"
        disableProceed={props.disabled}
      />
    </>
  );
}

function PermissionsErrorMessage() {
  return (
    <TextBox data-testid="desktop-permissions-error">
      <Text typography="h5">
        You are not able to add new Desktops. There are two possible reasons
        for this:
      </Text>
      <ul style={{ paddingLeft: 28 }}>
        <li>
          Your Teleport Enterprise license does not include Desktop Access.
          Reach out to your Teleport admin to enable Desktop Access.
        </li>
        <li>
          You don’t have sufficient permissions to add Desktops. Reach out to
          your Teleport admin to request additional permissions.
        </li>
      </ul>
    </TextBox>
  );
}
