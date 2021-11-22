import path from 'path';
import { app } from 'electron';
import fs from 'fs';
import { Logger } from 'shared/libs/logger';
import os from 'os';
import { RuntimeSettings } from './types';

const RESOURCES_PATH = app.isPackaged
  ? process.resourcesPath
  : path.join(__dirname, '../../../../');

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
    isDev: opts?.isDev || false,
    userDataDir,
    defaultShell: getDefaultShell(),
    platform: process.platform,
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
  if (app.isPackaged) {
    return path.join(RESOURCES_PATH, 'tsh');
  }

  const tshPath = process.env['TELETERM_TSH_PATH'];
  if (!tshPath) {
    throw Error('tsh path is not defined');
  }

  return tshPath;
}

export function getAssetPath(...paths: string[]): string {
  return path.join(RESOURCES_PATH, 'assets', ...paths);
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
