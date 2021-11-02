import { spawn } from 'child_process';
import { app, globalShortcut } from 'electron';
import MainProcess from 'teleterm/mainProcess';

const isDev =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

// init main process
const mainProcess = MainProcess.init({ isDev });

// node-pty is not yet context aware
app.allowRendererProcessReuse = false;
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  mainProcess.kill();
});

app.whenReady().then(() => {
  // allow process restart on F6
  globalShortcut.register('F6', () => {
    mainProcess.kill();
    const child = spawn(process.argv[0], [process.argv[1]], {
      env: process.env,
      detached: true,
      stdio: 'inherit',
    });
    child.unref();
    app.exit();
  });

  mainProcess.createWindow();
});
