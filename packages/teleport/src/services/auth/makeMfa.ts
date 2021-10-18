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

import { MfaAuthenticateChallenge, MfaRegistrationChallenge } from './types';
import { base64urlToBuffer, bufferToBase64url } from 'shared/utils/base64url';

// makeMfaRegistrationChallenge formats fetched register challenge JSON.
// Webauthn challange contains Base64URL(byte) fields that needs to
// be converted to ArrayBuffer expected by navigator.credentials.create:
// - challenge
// - user.id
// - excludeCredentials[i].id
export function makeMfaRegistrationChallenge(json): MfaRegistrationChallenge {
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

// makeMfaAuthenticateChallenge formats fetched authenticate challenge JSON.
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

// makeWebauthnCreationResponse takes response from navigator.credentials.create
// and creates a credential object expected by the server with ArrayBuffer
// fields converted to Base64URL:
// - rawId
// - response.attestationObject
// - response.clientDataJSON
export function makeWebauthnCreationResponse(res) {
  // Response can be null if no Credential object can be created.
  if (!res) {
    throw new Error('error creating credential, please try again');
  }

  const clientExtentions = res.getClientExtensionResults();
  return {
    id: res.id,
    type: res.type,
    extensions: {
      appid: Boolean(clientExtentions?.appid),
    },
    rawId: bufferToBase64url(res.rawId),
    response: {
      attestationObject: bufferToBase64url(res.response?.attestationObject),
      clientDataJSON: bufferToBase64url(res.response?.clientDataJSON),
    },
  };
}

// makeWebauthnAssertionResponse takes response from navigator.credentials.get
// and creates a credential object expected by the server with ArrayBuffer
// fields converted to Base64URL:
// - rawId
// - response.authenticatorData
// - response.clientDataJSON
// - response.signature
// - response.userHandle
export function makeWebauthnAssertionResponse(res) {
  // Response can be null if Credential cannot be unambiguously obtained.
  if (!res) {
    throw new Error('error obtaining credential, please try again');
  }

  const clientExtentions = res.getClientExtensionResults();
  return {
    id: res.id,
    type: res.type,
    extensions: {
      appid: Boolean(clientExtentions?.appid),
    },
    rawId: bufferToBase64url(res.rawId),
    response: {
      authenticatorData: bufferToBase64url(res.response?.authenticatorData),
      clientDataJSON: bufferToBase64url(res.response?.clientDataJSON),
      signature: bufferToBase64url(res.response?.signature),
      userHandle: bufferToBase64url(res.response?.userHandle),
    },
  };
}
