/*
Copyright 2019-2021 Gravitational, Inc.

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
import * as Alerts from 'design/Alert';
import { ButtonSecondary, Text } from 'design';
import useNewSshSession, { State, Props } from './useNewSshSession';
import Dialog, {
  DialogHeader,
  DialogContent,
  DialogFooter,
} from 'design/Dialog';

export default function Container(props: Props) {
  const state = useNewSshSession(props);
  return <NewSshSession {...state} />;
}

export function NewSshSession({ server, onClose, createAttempt }: State) {
  return (
    <Dialog
      dialogCss={() => ({
        maxWidth: '400px',
        width: '100%',
        padding: '20px',
      })}
      disableEscapeKeyDown={false}
      onClose={onClose}
      open={true}
    >
      <DialogHeader>
        <Text typography="h3" color="text.primary">
          Login to <b>{server.hostname}</b>
        </Text>
      </DialogHeader>
      <DialogContent>
        {createAttempt.status === 'error' && (
          <Alerts.Danger>
            Unable to retrieve cluster auth preferences,{' '}
            {createAttempt.statusText}
          </Alerts.Danger>
        )}
      </DialogContent>
      <DialogFooter>
        <ButtonSecondary onClick={onClose}>Close</ButtonSecondary>
      </DialogFooter>
    </Dialog>
  );
}
