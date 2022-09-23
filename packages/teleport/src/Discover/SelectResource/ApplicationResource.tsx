/**
 * Copyright 2022 Gravitational, Inc.
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

import { ActionButtons } from 'teleport/Discover/Shared';

import { PermissionsErrorMessage } from './PermissionsErrorMessage';

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

interface ApplicationResourceProps {
  disabled: boolean;
  onProceed: () => void;
}
