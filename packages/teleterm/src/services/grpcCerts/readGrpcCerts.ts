import fs from 'fs/promises';
import path from 'path';

export interface GrpcCerts {
  caCert: Buffer;
  serverCert: Buffer;
  serverKey: Buffer;
  clientCert: Buffer;
  clientKey: Buffer;
}

export async function readGrpcCerts(certsDir: string): Promise<GrpcCerts> {
  function getPath(fileName: string): string {
    return path.join(certsDir, fileName);
  }

  const files = await Promise.all([
    fs.readFile(getPath('ca.crt')),
    fs.readFile(getPath('server.crt')),
    fs.readFile(getPath('server.key')),
    fs.readFile(getPath('client.crt')),
    fs.readFile(getPath('client.key')),
  ]);

  return {
    caCert: files[0],
    serverCert: files[1],
    serverKey: files[2],
    clientCert: files[3],
    clientKey: files[4],
  };
}
