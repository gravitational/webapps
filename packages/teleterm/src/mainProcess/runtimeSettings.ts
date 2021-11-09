import path from 'path';
import { app } from 'electron';
import fs from 'fs';
import { RuntimeSettings } from 'teleterm/types';
import { Logger } from 'shared/libs/logger';
import os from 'os';

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
    defaultShell: getDefaultShell(),
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

function getDefaultShell(): string {
  const logger = new Logger();
  const fallbackShell = 'bash';
  const { shell } = os.userInfo();

  if (!shell) {
    logger.error(
      `Failed to read ${process.platform} platform default shell, using fallback: ${fallbackShell}.\n`
    );

    return fallbackShell;
  }

  return shell;
}
