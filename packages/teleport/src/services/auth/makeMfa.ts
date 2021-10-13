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

import { MfaAuthenticateChallenge, MfaRegisterChallenge } from './types';
import { base64urlToBuffer } from 'shared/utils/base64url';

// makeMfaRegisterChallenge formats fetched register challenge JSON.
// Webauthn challange contains Base64URL(byte) fields that needs to
// be converted to ArrayBuffer expected by navigator.credentials.create:
// - challenge
// - user.id
// - excludeCredentials[i].id
export function makeMfaRegisterChallenge(json): MfaRegisterChallenge {
  const webauthnPublicKey = json.webauthn?.publicKey;
  if (webauthnPublicKey) {
    const challenge = webauthnPublicKey.challenge || '';
    const id = webauthnPublicKey.user?.id || '';
    const excludeCredentials = webauthnPublicKey.excludeCredentials || [];

    webauthnPublicKey.challenge = base64urlToBuffer(challenge);
    webauthnPublicKey.user.id = base64urlToBuffer(id);
    webauthnPublicKey.excludeCredentials = excludeCredentials.map(
      (credential, i) => {
        excludeCredentials[i].id = base64urlToBuffer(credential.id);
        return excludeCredentials[i];
      }
    );
  }

  return {
    u2fRegisterRequest: json.u2f,
    qrCode: json.totp?.qrCode,
    webauthnPublicKey,
  };
}

// makeMfaRegisterChallenge formats fetched authenticate challenge JSON.
// Webauthn challange contains Base64URL(byte) fields that needs to
// be converted to ArrayBuffer expected by navigator.credentials.get:
// - challenge
// - allowCredentials[i].id
export function makeMfaAuthenticateChallenge(json): MfaAuthenticateChallenge {
  const webauthnPublicKey = json.webauthn_challenge?.publicKey;
  if (webauthnPublicKey) {
    const challenge = webauthnPublicKey.challenge || '';
    const allowCredentials = webauthnPublicKey.allowCredentials || [];

    webauthnPublicKey.challenge = base64urlToBuffer(challenge);
    webauthnPublicKey.allowCredentials = allowCredentials.map(
      (credential, i) => {
        allowCredentials[i].id = base64urlToBuffer(credential.id);
        return allowCredentials[i];
      }
    );
  }

  return {
    u2fSignRequests: json.u2f_challenges || [],
    webauthnPublicKey: webauthnPublicKey,
  };
}
