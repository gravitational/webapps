import fs from 'fs/promises';
import path from 'path';
import mkcert from 'mkcert';

export async function generateGrpcCerts(certsDir: string): Promise<void> {
  function getPath(fileName: string): string {
    return path.join(certsDir, fileName);
  }

  const ca = await mkcert.createCA({
    organization: 'localhost',
    countryCode: 'US',
    state: 'CA',
    locality: 'Oakland',
    validityDays: 365,
  });

  const server = await mkcert.createCert({
    domains: ['localhost'],
    validityDays: 365,
    caKey: ca.key,
    caCert: ca.cert,
  });

  const client = await mkcert.createCert({
    domains: ['localhost'],
    validityDays: 365,
    caKey: ca.key,
    caCert: ca.cert,
  });

  await Promise.all([
    fs.writeFile(getPath('ca.crt'), ca.cert),
    fs.writeFile(getPath('server.crt'), server.cert),
    fs.writeFile(getPath('server.key'), server.key),
    fs.writeFile(getPath('client.crt'), client.cert),
    fs.writeFile(getPath('client.key'), client.key),
  ]);
}
