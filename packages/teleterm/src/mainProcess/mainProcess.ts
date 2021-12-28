import path from 'path';
import { app, screen, BrowserWindow, ipcMain } from 'electron';
import { ChildProcess, spawn } from 'child_process';
import { RuntimeSettings, Logger } from 'teleterm/types';
import { getAssetPath } from './runtimeSettings';
import { subscribeToClusterContextMenuEvent } from './clusterContextMenu';
import { subscribeToTerminalContextMenuEvent } from 'teleterm/mainProcess/terminalContextMenu';
import {
  ConfigService,
  subscribeToConfigServiceEvents,
} from '../services/config';

type Options = {
  settings: RuntimeSettings;
  logger: Logger;
  configService: ConfigService;
};

export default class MainProcess {
  readonly settings: RuntimeSettings;
  private readonly logger: Logger;
  private readonly configService: ConfigService;
  private tshdProcess: ChildProcess;

  private constructor(opts: Options) {
    this.settings = opts.settings;
    this.logger = opts.logger;
    this.configService = opts.configService;
  }

  static create(opts: Options) {
    const instance = new MainProcess(opts);
    instance._init();
    return instance;
  }

  dispose() {
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

    if (this.settings.dev) {
      win.loadURL('https://localhost:8080');
    } else {
      win.loadFile(path.join(__dirname, '../renderer/index.html'));
    }
  }

  private _init() {
    try {
      this._initTshd();
      this._initIpc();
    } catch (err) {
      this.logger.error('Failed to start main process: ', err.message);
      app.exit(1);
    }
  }

  private _initTshd() {
    const { binaryPath, flags, homeDir } = this.settings.tshd;
    this.tshdProcess = spawn(binaryPath, flags, {
      stdio: 'inherit',
      env: {
        ...process.env,
        TELEPORT_HOME: homeDir,
      },
    });

    this.tshdProcess.on('error', error => {
      this.logger.error('tshd failed to start', error);
    });

    this.tshdProcess.once('exit', code => {
      this.logger.info('tshd exited with code:', code);
    });
  }

  private _initIpc() {
    ipcMain.on('main-process-get-runtime-settings', event => {
      event.returnValue = this.settings;
    });

    subscribeToTerminalContextMenuEvent();
    subscribeToClusterContextMenuEvent();
    subscribeToConfigServiceEvents(this.configService);
  }
}
