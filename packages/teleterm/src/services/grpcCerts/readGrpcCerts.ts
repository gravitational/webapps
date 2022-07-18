import fs from 'fs/promises';
import path from 'path';

export interface GrpcCerts {
  cert: Buffer;
  key: Buffer;
}

export async function readGrpcCerts(certsDir: string): Promise<GrpcCerts> {
  function getPath(fileName: string): string {
    return path.join(certsDir, fileName);
  }

  const files = await Promise.all([
    fs.readFile(getPath('cert.crt')),
    fs.readFile(getPath('cert.key')),
  ]);

  return {
    cert: files[0],
    key: files[1],
  };
}
