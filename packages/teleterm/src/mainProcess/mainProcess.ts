import path from 'path';
import { app, screen, BrowserWindow, ipcMain } from 'electron';
import { ChildProcess, spawn } from 'child_process';
import * as types from './types';
import { getAssetPath, getConfig } from './config';

export default class MainProcess {
  cfg: types.ProcessConfig;
  tshdProcess: ChildProcess;

  private constructor(opts?: Partial<types.ProcessConfig>) {
    this.cfg = getConfig(opts);
  }

  static init(opts?: Partial<types.ProcessConfig>) {
    let instance = null;
    try {
      instance = new MainProcess(opts);
      instance._init();
    } catch (err) {
      console.error('Failed to start main process: ', err.message);
      app.exit(1);
    }

    return instance;
  }

  kill() {
    this.tshdProcess.kill('SIGTERM');
  }

  createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const win = new BrowserWindow({
      width,
      height,
      title: 'Teleport Terminal',
      icon: getAssetPath('icon.png'),
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        preload: path.join(__dirname, 'preload.js'),
      },
    });

    if (this.cfg.isDev) {
      win.loadURL('https://localhost:8080');
    } else {
      win.loadFile('./../renderer/index.html');
    }
  }

  _init() {
    this._initTshd();
    this._initIpc();
  }

  _initTshd() {
    const { binaryPath, flags, homeDir } = this.cfg.tshd;
    this.tshdProcess = spawn(binaryPath, flags, {
      stdio: 'inherit',
      env: {
        TELEPORT_HOME: homeDir,
      },
    });

    this.tshdProcess.on('error', error => {
      console.error('tshd failed to start', error);
    });

    this.tshdProcess.once('exit', code => {
      console.log('tshd existed with code: ', code);
    });
  }

  _initIpc() {
    ipcMain.on('main-process-get-config', event => {
      event.returnValue = this.cfg;
    });
  }
}
