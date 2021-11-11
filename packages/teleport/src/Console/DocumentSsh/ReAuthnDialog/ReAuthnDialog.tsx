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
import Dialog, {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from 'design/Dialog';
import { Danger } from 'design/Alert';
import { Text, ButtonPrimary, ButtonSecondary } from 'design';

function ConnectDialog({ onReauthn, onReauthnClose, errMsg }: Props) {
  return (
    <Dialog dialogCss={() => ({ width: '400px' })} open={true}>
      <DialogHeader style={{ flexDirection: 'column' }}>
        <DialogTitle textAlign="center">Verify Your Identity</DialogTitle>
      </DialogHeader>
      <DialogContent mb={6}>
        {errMsg && (
          <Danger mt={2} width="100%">
            {errMsg}
          </Danger>
        )}
        <Text textAlign="center">
          Re-authentication is required. Follow the prompts given by your
          browser to complete authentication.
        </Text>
      </DialogContent>
      <DialogFooter textAlign="center">
        <ButtonPrimary onClick={onReauthn} mr={3} width="130px">
          {errMsg ? 'Retry' : 'Verify'}
        </ButtonPrimary>
        <ButtonSecondary onClick={onReauthnClose}>Close</ButtonSecondary>
      </DialogFooter>
    </Dialog>
  );
}

export type Props = {
  onReauthn: () => void;
  onReauthnClose: () => void;
  errMsg: string;
};

export default ConnectDialog;
