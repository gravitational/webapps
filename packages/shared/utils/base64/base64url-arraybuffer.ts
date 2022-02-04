/**
 * Copyright 2021 Gravitational, Inc.
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

import { arrayBufferToBase64, base64ToArrayBuffer } from './base64-arraybuffer';

// Converts Base64url to Base64
// Sourced from https://github.com/github/webauthn-json
function base64urlToBase64(base64url: string): string {
  const padding = '=='.slice(0, (4 - (base64url.length % 4)) % 4);
  return base64url.replace(/-/g, '+').replace(/_/g, '/') + padding;
}

// Converts Base64 to Base64url
// We assume that the base64url string is well-formed.
function base64ToBase64url(base64: string): string {
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function base64urlToBuffer(baseurl64String: string): ArrayBuffer {
  return base64ToArrayBuffer(base64urlToBase64(baseurl64String));
}

export function bufferToBase64url(buffer: ArrayBuffer): string {
  return base64ToBase64url(arrayBufferToBase64(buffer));
}
