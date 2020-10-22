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
import styled from 'styled-components';
import session from 'teleport/services/session';
import useAccessRequest from './useAccessRequest';
import AccessRequestReason from './AccessRequestReason';
import AccessRequestPending from './AccessRequestPending';
import { Failed } from 'design/CardError';
import { ButtonSecondary, Text, Alert, Indicator } from 'design';
import Dialog, {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from 'design/Dialog';
import { AppVerticalSplit } from 'teleport/components/Layout';

export default function Container({ children }: Props) {
  const logout = session.logout;
  const state = useAccessRequest(children, logout);

  return <AccessRequest {...state} />;
}

export function AccessRequest(props: ReturnType<typeof useAccessRequest>) {
  const {
    children,
    logout,
    attempt,
    requestId,
    request,
    access,
    getRequest,
    createRequest,
    renewSession,
    removeUrlRequestParam,
  } = props;

  function render() {
    if (attempt.isProcessing) {
      return (
        <StyledIndicator>
          <Indicator />
        </StyledIndicator>
      );
    }

    if (attempt.isFailed) {
      return <Failed message={attempt.message} />;
    }

    if (request) {
      switch (request.state) {
        case 'PENDING':
          return <AccessRequestPending getRequest={getRequest} />;
        case 'DENIED':
          return <AccessDenied reason={request.reason} logout={logout} />;
        case 'APPROVED':
          if (request.renewedSession) {
            removeUrlRequestParam();
            return <>{children}</>;
          }

          return (
            <AccessRequestPending
              getRequest={getRequest}
              renewSession={renewSession}
            />
          );
      }
    }

    // Case when user reloads page after creating request.
    if (requestId) {
      return <AccessRequestPending getRequest={getRequest} />;
    }

    if (access.requireReason && access.requireApproval) {
      return <AccessRequestReason onCreateRequest={createRequest} />;
    }

    if (access.requireApproval) {
      createRequest();
      return <AccessRequestPending getRequest={getRequest} />;
    }

    return <>{children}</>;
  }

  return render();
}

function AccessDenied({ reason, logout }: AccessDeniedProps) {
  return (
    <Dialog
      dialogCss={() => ({ maxWidth: '500px', width: '100%' })}
      open={true}
    >
      <DialogHeader>
        <DialogTitle>Request Account Access Denied</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <Alert kind="danger" children={`Denied: ${reason}`} />
        <Text mb={3}>
          Your request has been denied, please contact your administrator for
          more information.
        </Text>
      </DialogContent>
      <DialogFooter>
        <ButtonSecondary onClick={logout}>Logout</ButtonSecondary>
      </DialogFooter>
    </Dialog>
  );
}

const StyledIndicator = styled(AppVerticalSplit)`
  align-items: center;
  justify-content: center;
`;

type Props = {
  children: React.ReactNode;
};

type AccessDeniedProps = {
  logout(): void;
  reason: string;
};
