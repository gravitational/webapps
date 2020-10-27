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
import session from 'teleport/services/session';
import { ButtonPrimary, ButtonSecondary, Text, Alert, Box } from 'design';
import Dialog, {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from 'design/Dialog';
import useAccessRequestReason, { Props } from './useAccessRequestReason';

export default function Container({ onCreateRequest }: Props) {
  const state = useAccessRequestReason({ onCreateRequest });

  return <AccessRequestReason {...state} />;
}

export function AccessRequestReason(
  props: ReturnType<typeof useAccessRequestReason>
) {
  const { attempt, reason, setReason, createRequest } = props;

  return (
    <Dialog
      dialogCss={() => ({ maxWidth: '500px', width: '100%' })}
      open={true}
    >
      <DialogHeader>
        <DialogTitle>Request Account Access</DialogTitle>
      </DialogHeader>
      <DialogContent>
        {attempt.isFailed && <Alert kind="danger" children={attempt.message} />}
        <Text mb={3}>
          To access your Teleport account, please send an authorization request
          using the form below.
        </Text>
        <Text>Authorization Request Message</Text>
        <Box
          height="100px"
          as="textarea"
          placeholder="Describe your request..."
          value={reason}
          onChange={e => setReason(e.target.value)}
          autoFocus
        />
      </DialogContent>
      <DialogFooter>
        <ButtonPrimary
          mr="3"
          disabled={attempt.isProcessing || reason === ''}
          onClick={createRequest}
        >
          Send Request
        </ButtonPrimary>
        <ButtonSecondary onClick={() => session.logout()}>
          Cancel & Logout
        </ButtonSecondary>
      </DialogFooter>
    </Dialog>
  );
}
