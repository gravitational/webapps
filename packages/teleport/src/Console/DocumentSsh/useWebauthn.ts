/*
Copyright 2020 Gravitational, Inc.

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

import { useState, useEffect } from 'react';
import Tty from 'teleport/lib/term/tty';
import { TermEventEnum } from 'teleport/lib/term/enums';
import {
  makeMfaAuthenticateChallenge,
  makeWebauthnAssertionResponse,
} from 'teleport/services/auth';

export default function useSshSession(tty: Tty) {
  const [errorText, setErrorText] = useState('');
  const [isAuthnDialogVisible, setIsAuthnDialogVisible] = useState(false);
  const [webauthnPublicKey, setWebauthnPublicKey] = useState<
    PublicKeyCredentialRequestOptions
  >();

  function authenticate() {
    if (!window.PublicKeyCredential) {
      const errMsg =
        'This browser does not support WebAuthn required for hardware tokens, \
      please try the latest version of Chrome, Firefox or Safari.';

      setErrorText(errMsg);
      return;
    }

    navigator.credentials
      .get({ publicKey: webauthnPublicKey })
      .then(res => {
        const credential = makeWebauthnAssertionResponse(res);
        tty.send(JSON.stringify(credential));

        setIsAuthnDialogVisible(false);
        setErrorText('');
      })
      .catch((err: Error) => {
        setErrorText(err.message);
      });
  }

  useEffect(() => {
    if (tty) {
      tty.on(TermEventEnum.WEBAUTHN_CHALLENGE, challenge => {
        const json = JSON.parse(challenge);
        const publicKey = makeMfaAuthenticateChallenge(json).webauthnPublicKey;

        setWebauthnPublicKey(publicKey);
        setIsAuthnDialogVisible(true);
      });
    }
  }, [tty]);

  return {
    errorText,
    authenticate,
    isAuthnDialogVisible,
  };
}
