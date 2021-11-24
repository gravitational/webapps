import path from 'path';
import { app } from 'electron';
import fs from 'fs';
import { Logger } from 'shared/libs/logger';
import os from 'os';
import { RuntimeSettings } from './types';

const { argv, env } = process;

const RESOURCES_PATH = app.isPackaged
  ? process.resourcesPath
  : path.join(__dirname, '../../../../');

const isDev = env.NODE_ENV === 'development' || env.DEBUG_PROD === 'true';

// Allows running tsh in insecure mode (for development)
const isInsecure = isDev || argv.slice(2).indexOf('--insecure') !== -1;

export function getRuntimeSettings(): RuntimeSettings {
  const userDataDir = app.getPath('userData');
  const tshNetworkAddr = getTshNetworkAddr();
  const tshd = {
    insecure: isInsecure,
    binaryPath: getTshBinaryPath(),
    homeDir: getTshHomeDir(),
    networkAddr: tshNetworkAddr,
    flags: ['daemon', 'start', '--debug', `--addr=${tshNetworkAddr}`],
  };

  if (isInsecure) {
    tshd.flags.unshift('--insecure');
  }

  return {
    isDev,
    userDataDir,
    defaultShell: getDefaultShell(),
    platform: process.platform,
    tshd,
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

  const tshPath = env.TELETERM_TSH_PATH;
  if (!tshPath) {
    throw Error('tsh path is not defined');
  }

  return tshPath;
}

export function getAssetPath(...paths: string[]): string {
  return path.join(RESOURCES_PATH, 'assets', ...paths);
}

function getDefaultShell(): string {
  //fsfdfdfd
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
