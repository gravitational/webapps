import path from 'path';
import { app } from 'electron';
import fs from 'fs';
import { RuntimeSettings } from 'teleterm/types';

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../../../assets');

export function getRuntimeSettings(
  opts?: Partial<RuntimeSettings>
): RuntimeSettings {
  const userDataDir = app.getPath('userData');
  const tshNetworkAddr = getTshNetworkAddr();
  const tshd = {
    binaryPath: getTshBinaryPath(),
    homeDir: getTshHomeDir(),
    networkAddr: tshNetworkAddr,
    flags: [
      '--insecure',
      'daemon',
      'start',
      '--debug',
      `--addr=${tshNetworkAddr}`,
    ],
  };

  return {
    isDev: false,
    userDataDir,
    tshd,
    ...opts,
  };
}

function getTshNetworkAddr() {
  return `unix://${path.resolve(app.getPath('userData'), 'tsh.socket')}`;
}

function getTshHomeDir() {
  const tshPath = path.resolve(app.getPath('userData'), 'tsh');
  if (!fs.existsSync(tshPath)) {
    fs.mkdirSync(tshPath);
  }
  return tshPath;
}

function getTshBinaryPath() {
  const tshPath = process.env['TELETERM_TSH_PATH'];
  if (!tshPath) {
    throw Error('tsh path is not defined');
  }

  return tshPath;
}

export function getAssetPath(...paths: string[]): string {
  return path.join(RESOURCES_PATH, ...paths);
}
