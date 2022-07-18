import fs from 'fs/promises';
import path from 'path';
import { makeCert } from './makeCert';

export async function generateGrpcCerts(certsDir: string): Promise<void> {
  function getPath(fileName: string): string {
    return path.join(certsDir, fileName);
  }

  const ca = await makeCert({
    commonName: 'localhost',
    countryCode: 'US',
    state: 'CA',
    locality: 'Oakland',
    validityDays: 365,
  });

  await Promise.all([
    fs.writeFile(getPath('cert.crt'), ca.cert),
    fs.writeFile(getPath('cert.key'), ca.key),
  ]);
}
