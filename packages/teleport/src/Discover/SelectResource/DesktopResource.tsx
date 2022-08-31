import React from 'react';

import { Text } from 'design';

import { InfoFilled } from 'design/Icon';

import { ActionButtons, TextBox } from 'teleport/Discover/Shared';

import { PermissionsErrorMessage } from './PermissionsErrorMessage';

export function DesktopResource(props: DesktopResourceProps) {
  let content = (
    <TextBox>
      <Text typography="h5" bold mb="4px">
        <InfoFilled mr="8px" fontSize="14px" />
        Note
      </Text>
      <Text>
        Teleport Desktop Access currently only supports Windows Desktops managed
        by Active Directory (AD).
      </Text>
      <Text>We are working on adding support for non-AD Windows Desktops.</Text>
    </TextBox>
  );

  if (props.disabled) {
    content = (
      <PermissionsErrorMessage
        action="add new Desktops"
        productName="Desktop Access"
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

interface DesktopResourceProps {
  disabled: boolean;
  onProceed: () => void;
}
