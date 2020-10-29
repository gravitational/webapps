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
import useAccessRequest, { Props } from './useAccessRequest';
import AccessRequestReason from './AccessRequestReason';
import AccessRequestPending from './AccessRequestPending';
import AccessDenied from './AccessRequestDenied/AccessRequestDenied';
import { Failed } from 'design/CardError';
import { Indicator } from 'design';
import { AppVerticalSplit } from 'teleport/components/Layout';

export default function Container({ children }: Props) {
  const state = useAccessRequest({ children });

  return <AccessRequest {...state} />;
}

export function AccessRequest(props: ReturnType<typeof useAccessRequest>) {
  const {
    children,
    attempt,
    requestId,
    request,
    access,
    getRequest,
    createRequest,
    renewSession,
    removeUrlRequestParam,
    checkerInterval,
  } = props;

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
        return (
          <AccessRequestPending
            getRequest={getRequest}
            checkerInterval={checkerInterval}
          />
        );
      case 'APPROVED':
        if (request.renewedSession) {
          removeUrlRequestParam();
          return <>{children}</>;
        }

        return <AccessRequestPending renewSession={renewSession} />;
      default:
        return <AccessDenied reason={request.reason} />;
    }
  }

  // Case when user reloads page after creating request.
  if (requestId) {
    return (
      <AccessRequestPending
        getRequest={getRequest}
        checkerInterval={checkerInterval}
      />
    );
  }

  if (access.requestStrategy === 'reason') {
    return (
      <AccessRequestReason
        onCreateRequest={createRequest}
        prompt={access.requestPrompt}
      />
    );
  }

  if (access.requestStrategy === 'always') {
    return <AccessRequestPending createRequest={createRequest} />;
  }

  return <>{children}</>;
}

const StyledIndicator = styled(AppVerticalSplit)`
  align-items: center;
  justify-content: center;
`;
