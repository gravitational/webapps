import { ChildProcess, fork, spawn } from 'child_process';
import path from 'path';

import {
  app,
  ipcMain,
  shell,
  Menu,
  MenuItemConstructorOptions,
} from 'electron';

import { FileStorage, Logger, RuntimeSettings } from 'teleterm/types';
import { subscribeToFileStorageEvents } from 'teleterm/services/fileStorage';
import createLoggerService from 'teleterm/services/logger';
import { ChildProcessAddresses } from 'teleterm/mainProcess/types';
import { getAssetPath } from 'teleterm/mainProcess/runtimeSettings';

import {
  ConfigService,
  subscribeToConfigServiceEvents,
} from '../services/config';

import { subscribeToTerminalContextMenuEvent } from './contextMenus/terminalContextMenu';
import { subscribeToTabContextMenuEvent } from './contextMenus/tabContextMenu';
import { resolveNetworkAddress } from './resolveNetworkAddress';

type Options = {
  settings: RuntimeSettings;
  logger: Logger;
  configService: ConfigService;
  fileStorage: FileStorage;
};

export default class MainProcess {
  readonly settings: RuntimeSettings;
  private readonly logger: Logger;
  private readonly configService: ConfigService;
  private tshdProcess: ChildProcess;
  private sharedProcess: ChildProcess;
  private fileStorage: FileStorage;
  private resolvedChildProcessAddresses: Promise<ChildProcessAddresses>;

  private constructor(opts: Options) {
    this.settings = opts.settings;
    this.logger = opts.logger;
    this.configService = opts.configService;
    this.fileStorage = opts.fileStorage;
  }

  static create(opts: Options) {
    const instance = new MainProcess(opts);
    instance._init();
    return instance;
  }

  dispose() {
    this.sharedProcess.kill('SIGTERM');
    this.tshdProcess.kill('SIGTERM');
  }

  private _init() {
    this.updateAboutPanelIfNeeded();
    this._setAppMenu();
    try {
      this._initTshd();
      this._initSharedProcess();
      this._initResolvingChildProcessAddresses();
      this._initIpc();
    } catch (err) {
      this.logger.error('Failed to start main process: ', err.message);
      app.exit(1);
    }
  }

  private _initTshd() {
    const { binaryPath, flags, homeDir } = this.settings.tshd;
    this.logger.info(`Starting tsh daemon from ${binaryPath}`);

    this.tshdProcess = spawn(binaryPath, flags, {
      stdio: 'pipe',
      windowsHide: true,
      env: {
        ...process.env,
        TELEPORT_HOME: homeDir,
      },
    });

    const tshdLogger = createLoggerService({
      dev: this.settings.dev,
      dir: this.settings.userDataDir,
      name: 'tshd',
      passThroughMode: true,
    });

    tshdLogger.pipeProcessOutputIntoLogger(this.tshdProcess.stdout);
    tshdLogger.pipeProcessOutputIntoLogger(this.tshdProcess.stderr);

    this.tshdProcess.on('error', error => {
      this.logger.error('tshd failed to start', error);
    });

    this.tshdProcess.once('exit', code => {
      this.logger.info('tshd exited with code:', code);
    });
  }

  private _initSharedProcess() {
    this.sharedProcess = fork(
      path.join(__dirname, 'sharedProcess.js'),
      [`--runtimeSettingsJson=${JSON.stringify(this.settings)}`],
      {
        stdio: 'pipe',
      }
    );

    this.sharedProcess.on('error', error => {
      this.logger.error('shared process failed to start', error);
    });

    this.sharedProcess.once('exit', code => {
      this.logger.info('shared process exited with code:', code);
    });
  }

  private _initResolvingChildProcessAddresses(): void {
    this.resolvedChildProcessAddresses = Promise.all([
      resolveNetworkAddress(
        this.settings.tshd.requestedNetworkAddress,
        this.tshdProcess
      ),
      resolveNetworkAddress(
        this.settings.sharedProcess.requestedNetworkAddress,
        this.sharedProcess
      ),
    ]).then(([tsh, shared]) => ({ tsh, shared }));
  }

  private _initIpc() {
    ipcMain.on('main-process-get-runtime-settings', event => {
      event.returnValue = this.settings;
    });

    ipcMain.handle('main-process-get-resolved-child-process-addresses', () => {
      return this.resolvedChildProcessAddresses;
    });

    subscribeToTerminalContextMenuEvent();
    subscribeToTabContextMenuEvent();
    subscribeToConfigServiceEvents(this.configService);
    subscribeToFileStorageEvents(this.fileStorage);
  }

  private _setAppMenu() {
    const isMac = this.settings.platform === 'darwin';

    const macTemplate: MenuItemConstructorOptions[] = [
      { role: 'appMenu' },
      { role: 'editMenu' },
      { role: 'viewMenu' },
      {
        label: 'Window',
        submenu: [{ role: 'minimize' }, { role: 'zoom' }],
      },
      {
        role: 'help',
        submenu: [{ label: 'Learn More', click: openDocsUrl }],
      },
    ];

    const otherTemplate: MenuItemConstructorOptions[] = [
      { role: 'fileMenu' },
      { role: 'editMenu' },
      { role: 'viewMenu' },
      { role: 'windowMenu' },
      {
        role: 'help',
        submenu: [
          { label: 'Learn More', click: openDocsUrl },
          {
            label: 'About Teleport Connect',
            click: app.showAboutPanel,
          },
        ],
      },
    ];

    const menu = Menu.buildFromTemplate(isMac ? macTemplate : otherTemplate);
    Menu.setApplicationMenu(menu);
  }

  private updateAboutPanelIfNeeded(): void {
    // There is no about menu for Linux. See https://github.com/electron/electron/issues/18918
    // On Windows default menu does not show copyrights.
    if (
      this.settings.platform === 'linux' ||
      this.settings.platform === 'win32'
    ) {
      app.setAboutPanelOptions({
        applicationName: app.getName(),
        applicationVersion: app.getVersion(),
        iconPath: getAssetPath('icon-linux/512x512.png'), //.ico is not supported
        copyright: `Copyright © ${new Date().getFullYear()} Gravitational, Inc.`,
      });
    }
  }
}

const DOCS_URL = 'https://goteleport.com/docs/use-teleport/teleport-connect/';

function openDocsUrl() {
  shell.openExternal(DOCS_URL);
}
