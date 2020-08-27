/**
 * Copyright 2020 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { ButtonSecondary, Text, Flex, Label, Box } from 'design';
import Dialog, {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from 'design/Dialog';
import { App } from 'teleport/services/apps';

export default function AppViewDetails({ app, onClose }: Props) {
  const hasLabels = app.labels.length > 0;
  const $labels = app.labels.map(({ name, value }) => (
    <Label mb="1" mr="1" key={name} kind="secondary">
      {`${name}: ${value}`}
    </Label>
  ));

  return (
    <Dialog
      dialogCss={() => ({ maxWidth: '500px', width: '100%' })}
      disableEscapeKeyDown={false}
      onClose={close}
      open={true}
    >
      <DialogHeader>
        <DialogTitle>App Details</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <Attribute title="Application" value={app.name} />
        <Attribute title="Host name" value={app.hostname} />
        <Attribute title="Cluster Name" value={app.clusterId} />
        <Attribute title="Internal Address" value={app.internalAddr} />
        <Attribute title="Public Address" value={app.publicAddr} />
        {hasLabels && (
          <Box mb={3}>
            <Text typography="body2" bold>
              Labels:
            </Text>
            <Box>{$labels}</Box>
          </Box>
        )}
      </DialogContent>
      <DialogFooter>
        <ButtonSecondary onClick={onClose}>Close</ButtonSecondary>
      </DialogFooter>
    </Dialog>
  );
}

const Attribute = ({ title = '', value = null }) => (
  <Flex mb={3}>
    <Text typography="body2" bold style={{ width: '126px' }}>
      {title}:
    </Text>
    <Text typography="body2">{value}</Text>
  </Flex>
);

type Props = {
  app: App;
  onClose(): void;
};
