import React from 'react';

import { Text } from 'design';

import { ActionButtons, TextBox } from 'teleport/Discover/Shared';

interface ApplicationResourceProps {
  disabled: boolean;
  onProceed: () => void;
}

export function ApplicationResource(props: ApplicationResourceProps) {
  let content;
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

function PermissionsErrorMessage() {
  return (
    <TextBox data-testid="application-permissions-error">
      <Text typography="h5">
        You are not able to add new Applications. There are two possible reasons
        for this:
      </Text>
      <ul style={{ paddingLeft: 28 }}>
        <li>
          Your Teleport Enterprise license does not include Application Access.
          Reach out to your Teleport admin to enable Application Access.
        </li>
        <li>
          You don’t have sufficient permissions to add Applications. Reach out
          to your Teleport admin to request additional permissions.
        </li>
      </ul>
    </TextBox>
  );
}
