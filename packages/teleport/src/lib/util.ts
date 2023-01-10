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

import { AuthType } from 'teleport/services/user';

export const openNewTab = (url: string) => {
  const element = document.createElement('a');
  element.setAttribute('href', `${url}`);
  // works in ie11
  element.setAttribute('target', `_blank`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export function pluralize(num: number, word: string) {
  if (num > 1) {
    return `${word}s`;
  }

  return word;
}

// Adapted from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
export async function Sha256Digest(
  message: string,
  encoder: TextEncoder = new TextEncoder()
): Promise<string> {
  const msgUint8 = encoder.encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}

export type TshLoginCommand = {
  authType: AuthType;
  clusterId?: string;
  username: string;
  accessRequestId?: string;
};

export function generateTshLoginCommand({
  authType,
  clusterId = '',
  username,
  accessRequestId = '',
}: TshLoginCommand) {
  const { hostname, port } = window.location;
  const host = `${hostname}:${port || '443'}`;
  const requestId = accessRequestId ? ` --request-id=${accessRequestId}` : '';

  switch (authType) {
    case 'sso':
      return `tsh login --proxy=${host} ${clusterId}${requestId}`.trim();
    case 'local':
      return `tsh login --proxy=${host} --auth=${authType} --user=${username} ${clusterId}${requestId}`.trim();
    case 'passwordless':
      return `tsh login --proxy=${host} --auth=${authType} --user=${username} ${clusterId}${requestId}`.trim();
    default:
      throw new Error(`auth type ${authType} is not supported`);
  }
}

// arrayStrDiff returns an array of strings that
// belong in stringsA but not in stringsB.
export function arrayStrDiff(stringsA: string[], stringsB: string[]) {
  if (!stringsA || !stringsB) {
    return [];
  }

  return stringsA.filter(l => !stringsB.includes(l));
}

export const compareSemVers = (a: string, b: string): -1 | 1 => {
  const splitA = a.split('.');
  const splitB = b.split('.');

  if (splitA.length < 3 || splitB.length < 3) {
    return -1;
  }

  const majorA = parseInt(splitA[0]);
  const majorB = parseInt(splitB[0]);
  if (majorA !== majorB) {
    return majorA > majorB ? 1 : -1;
  }

  const minorA = parseInt(splitA[1]);
  const minorB = parseInt(splitB[1]);
  if (minorA !== minorB) {
    return minorA > minorB ? 1 : -1;
  }

  const patchA = parseInt(splitA[2].split('-')[0]);
  const patchB = parseInt(splitB[2].split('-')[0]);
  if (patchA !== patchB) {
    return patchA > patchB ? 1 : -1;
  }

  return 1;
};
