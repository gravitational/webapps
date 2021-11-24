import { spawn } from 'child_process';
import { app, globalShortcut } from 'electron';
import MainProcess from 'teleterm/mainProcess';
import { getRuntimeSettings } from 'teleterm/mainProcess/runtimeSettings';
import { createLogger, initializeLogging } from 'teleterm/services/logger';

const settings = getRuntimeSettings();

initializeLogging({ isDev: settings.isDev, dir: settings.userDataDir });

const logger = createLogger('Main');

process.on('uncaughtException', error => {
  logger.error(error);
  throw error;
});

// init main process
const mainProcess = MainProcess.create({ settings, logger });

// node-pty is not yet context aware
app.allowRendererProcessReuse = false;
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  mainProcess.dispose();
});

app.whenReady().then(() => {
  if (mainProcess.settings.isDev) {
    // allow restarts on F6
    globalShortcut.register('F6', () => {
      mainProcess.dispose();
      const [bin, ...args] = process.argv;
      const child = spawn(bin, args, {
        env: process.env,
        detached: true,
        stdio: 'inherit',
      });
      child.unref();
      app.exit();
    });
  }

  mainProcess.createWindow();
});
