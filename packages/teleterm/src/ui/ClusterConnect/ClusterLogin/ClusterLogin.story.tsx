/*
Copyright 2019 Gravitational, Inc.

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
import * as types from 'teleterm/ui/services/clusters/types';
import { Attempt } from 'shared/hooks/useAsync';
import { ClusterLoginPresentation } from './ClusterLogin';
import { State } from './useClusterLogin';

export default {
  title: 'Teleterm/ClusterLogin',
};

function makeProps(): State {
  return {
    shouldPromptSsoStatus: false,
    webauthnPrompt: '',
    title: 'localhost',
    loginAttempt: {
      status: '',
      statusText: '',
    } as Attempt<void>,
    initAttempt: {
      status: 'success',
      statusText: '',
      data: {
        preferredMfa: 'webauthn',
        localAuthEnabled: true,
        authProvidersList: [],
        type: '',
        secondFactor: 'optional',
        hasMessageOfTheDay: false,
        allowPasswordless: true,
        localConnectorName: '',
        authType: 'local',
      } as types.AuthSettings,
    } as const,

    loggedInUserName: null,
    onCloseDialog: () => null,
    onAbort: () => null,
    onLoginWithLocal: () => Promise.resolve<[void, Error]>([null, null]),
    onLoginWithPwdless: () => Promise.resolve<[void, Error]>([null, null]),
    onLoginWithSso: () => null,
    writePinToStream: () => null,
    promptUsername: () => null,
    clearLoginAttempt: () => null,
    webauthnPromptProcessing: false,
  };
}

export const Basic = () => {
  return <ClusterLoginPresentation {...makeProps()} />;
};

export const HardwareKeyPrompt = () => {
  const props = makeProps();
  props.loginAttempt.status = 'processing';
  props.webauthnPrompt = 'tap';
  return <ClusterLoginPresentation {...props} />;
};

export const SsoPrompt = () => {
  const props = makeProps();
  props.loginAttempt.status = 'processing';
  props.shouldPromptSsoStatus = true;
  return <ClusterLoginPresentation {...props} />;
};
