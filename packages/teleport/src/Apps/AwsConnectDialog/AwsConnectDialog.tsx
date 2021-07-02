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

import React, { useState } from 'react';
import { Text, Box, ButtonPrimary, ButtonSecondary } from 'design';
import Dialog, {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from 'design/Dialog';
import Select, { Option } from 'shared/components/Select';
import cfg from 'teleport/config';
import { App } from 'teleport/services/apps';

export default function AwsConnectDialog({ app, onClose }: Props) {
  const [roleOptions] = useState<Option[]>(() =>
    app.awsRoles.map(role => {
      return {
        value: role.arn,
        label: role.display,
      };
    })
  );

  const [selectedRole, setSelectedRole] = useState<Option>(roleOptions[0]);

  function onLaunchClick() {
    const { fqdn, clusterId, publicAddr } = app;
    const arn = selectedRole.value;
    const launchUrl = cfg.getAppLauncherRoute({
      fqdn,
      clusterId,
      publicAddr,
      arn,
    });
    window.open(launchUrl, '_blank');
    onClose();
  }

  return (
    <Dialog
      dialogCss={() => ({
        maxWidth: '456px',
        width: '100%',
        overflow: 'visible',
      })}
      disableEscapeKeyDown={false}
      onClose={onClose}
      open={true}
    >
      <DialogHeader mb={4}>
        <DialogTitle>Launch {app.name}</DialogTitle>
      </DialogHeader>
      <DialogContent maxHeight="120px">
        Please select the IAM Role to assume when launching {app.name}
        <Box width="75%" mt={3}>
          <Text fontWeight={500} mb={1}>
            IAM Role:
          </Text>
          <Select
            value={selectedRole}
            onChange={(o: Option) => setSelectedRole(o)}
            options={roleOptions}
            maxMenuHeight={200}
            isSearchable
          />
        </Box>
      </DialogContent>
      <DialogFooter>
        <ButtonPrimary onClick={onLaunchClick} mr={3}>
          Launch App
        </ButtonPrimary>
        <ButtonSecondary onClick={onClose}>Close</ButtonSecondary>
      </DialogFooter>
    </Dialog>
  );
}

export type Props = {
  app: App;
  onClose: () => void;
};
