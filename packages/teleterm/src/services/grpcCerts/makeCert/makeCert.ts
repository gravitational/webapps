/**
 * (The MIT License)
 *
 * Copyright (c) 2019 Subash Pathak <subash@subash.me>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 Copyright 2022 Gravitational, Inc.

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

import { pki, md, util, random } from 'node-forge';
import { promisify } from 'util';

const IP_REGEX = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
const generateKeyPair = promisify(pki.rsa.generateKeyPair.bind(pki.rsa));

interface GeneratedCert {
  key: string;
  cert: string;
}

export async function makeCert({
  commonName,
  countryCode,
  state,
  locality,
  validityDays,
}: {
  commonName: string;
  countryCode: string;
  state: string;
  locality: string;
  validityDays: number;
}): Promise<GeneratedCert> {
  // certificate Attributes: https://git.io/fptna
  const attributes = [
    { name: 'commonName', value: commonName },
    { name: 'countryName', value: countryCode },
    { name: 'stateOrProvinceName', value: state },
    { name: 'localityName', value: locality },
    { name: 'organizationName', value: commonName },
  ];

  // required certificate extensions for a certificate authority
  const extensions = [
    { name: 'basicConstraints', cA: true, critical: true },
    {
      name: 'keyUsage',
      keyCertSign: true,
      critical: true,
      digitalSignature: true,
      keyEncipherment: true,
    },
    {
      name: 'subjectAltName',
      altNames: (() => {
        const types = { domain: 2, ip: 7 }; // available Types: https://git.io/fptng
        const isIp = IP_REGEX.test(commonName);

        if (isIp) return { type: types.ip, ip: commonName };
        return { type: types.domain, value: commonName };
      })(),
    },
  ];

  return await generateRawCert({
    subject: attributes,
    issuer: attributes,
    extensions,
    validityDays,
  });
}

async function generateRawCert({
  subject,
  issuer,
  extensions,
  validityDays,
  signWith,
}: {
  subject: pki.CertificateField[];
  issuer: pki.CertificateField[];
  extensions: any[];
  validityDays: number;
  signWith?: string;
}): Promise<GeneratedCert> {
  const keyPair = await generateKeyPair({ bits: 2048, workers: 4 });
  const cert = pki.createCertificate();

  cert.publicKey = keyPair.publicKey;
  cert.serialNumber = getRandomSerialNumber();
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setDate(
    cert.validity.notAfter.getDate() + validityDays
  );
  cert.setSubject(subject);
  cert.setIssuer(issuer);
  cert.setExtensions(extensions);

  // sign the certificate with its own private key if no separate signing key is provided
  const privateKey = signWith
    ? pki.privateKeyFromPem(signWith)
    : keyPair.privateKey;
  cert.sign(privateKey, md.sha256.create());

  return {
    key: pki.privateKeyToPem(keyPair.privateKey),
    cert: pki.certificateToPem(cert),
  };
}

function getRandomSerialNumber(): string {
  // a hexString is considered negative if its most significant bit is 1
  // because serial numbers use ones' complement notation
  // this RFC in section 4.1.2.2 requires serial numbers to be positive
  // http://www.ietf.org/rfc/rfc5280.txt
  function toPositiveHex(hexString: string): string {
    let mostSiginficativeHexAsInt = parseInt(hexString[0], 16);
    if (mostSiginficativeHexAsInt < 8) {
      return hexString;
    }

    mostSiginficativeHexAsInt -= 8;
    return mostSiginficativeHexAsInt.toString() + hexString.substring(1);
  }

  return toPositiveHex(util.bytesToHex(random.getBytesSync(16)));
}
