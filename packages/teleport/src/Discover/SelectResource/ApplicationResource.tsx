import React from 'react';

import { ActionButtons } from 'teleport/Discover/Shared';

import { PermissionsErrorMessage } from './PermissionsErrorMessage';

interface ApplicationResourceProps {
  disabled: boolean;
  onProceed: () => void;
}

export function ApplicationResource(props: ApplicationResourceProps) {
  let content;
  if (props.disabled) {
    content = (
      <PermissionsErrorMessage
        action="add new Applications"
        productName="Application Access"
      />
    );
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
