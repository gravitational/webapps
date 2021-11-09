import path from 'path';
import {
  app,
  screen,
  BrowserWindow,
  ipcMain,
  Menu,
} from 'electron';
import { ChildProcess, spawn } from 'child_process';
import { RuntimeSettings } from 'teleterm/types';
import { getAssetPath, getRuntimeSettings } from './runtimeSettings';

export default class MainProcess {
  settings: RuntimeSettings;
  tshdProcess: ChildProcess;

  private constructor(opts?: Partial<RuntimeSettings>) {
    this.settings = getRuntimeSettings(opts);
  }

  static init(opts?: Partial<RuntimeSettings>) {
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

    if (this.settings.isDev) {
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
    const { binaryPath, flags, homeDir } = this.settings.tshd;
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
    ipcMain.on('main-process-get-runtime-settings', event => {
      event.returnValue = this.settings;
    });

    ipcMain.on(
      'main-process-open-context-menu',
      () => {
        Menu.buildFromTemplate([
          {
            label: 'Copy',
            role: 'copy',
          },
          {
            label: 'Paste',
            role: 'paste',
          },
        ]).popup();
      }
    );
  }
}
