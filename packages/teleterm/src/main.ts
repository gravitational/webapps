const path = require('path');
const { app, BrowserWindow } = require('electron');
import startTshd from './services/startTshd';

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../../../assets');

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Teleport Terminal',
    icon: getAssetPath('icon.png'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('https://localhost:8080');
  } else {
    win.loadFile('./../renderer/index.html');
  }
}

const daemon = startTshd();

// node-pty is not yet context aware
app.allowRendererProcessReuse = false;
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

app.on('before-quit', () => {
  daemon.kill('SIGTERM');
});

app.whenReady().then(() => {
  createWindow();
});
