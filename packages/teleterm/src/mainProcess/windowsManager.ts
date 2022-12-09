import path from 'path';

import { app, BrowserWindow, Menu, Rectangle, screen } from 'electron';

import { FileStorage } from 'teleterm/services/fileStorage';
import { RuntimeSettings } from 'teleterm/mainProcess/types';
import theme from 'teleterm/ui/ThemeProvider/theme';

type WindowState = Rectangle;

export class WindowsManager {
  private storageKey = 'windowState';
  private selectionContextMenu: Menu;
  private inputContextMenu: Menu;
  private window?: BrowserWindow;

  constructor(
    private fileStorage: FileStorage,
    private settings: RuntimeSettings
  ) {
    this.selectionContextMenu = Menu.buildFromTemplate([{ role: 'copy' }]);

    this.inputContextMenu = Menu.buildFromTemplate([
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
    ]);
  }

  createWindow(): void {
    const windowState = this.getWindowState();
    const window = new BrowserWindow({
      x: windowState.x,
      y: windowState.y,
      width: windowState.width,
      height: windowState.height,
      backgroundColor: theme.colors.primary.darker,
      minWidth: 400,
      minHeight: 300,
      autoHideMenuBar: true,
      title: 'Teleport Connect Preview',
      webPreferences: {
        devTools: this.settings.dev,
        webgl: false,
        enableWebSQL: false,
        safeDialogs: true,
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: false,
        preload: path.join(__dirname, 'preload.js'),
      },
    });

    window.once('close', () => {
      this.saveWindowState(window);
    });

    if (this.settings.dev) {
      window.loadURL('https://localhost:8080');
    } else {
      window.loadFile(path.join(__dirname, '../renderer/index.html'));
    }

    window.webContents.on('context-menu', (_, props) => {
      this.popupUniversalContextMenu(window, props);
    });

    window.webContents.session.setPermissionRequestHandler(
      (webContents, permission, callback) => {
        // deny all permissions requests, we currently do not require any
        return callback(false);
      }
    );

    this.window = window;
  }

  /**
   * focusWindow is for situations where the app has privileges to do so, for example in a scenario
   * where the user attempts to launch a second instance of the app – the same process that the user
   * interacted with asks for its window to receive focus.
   */
  focusWindow(): void {
    if (!this.window) {
      return;
    }

    if (this.window.isMinimized()) {
      this.window.restore();
    }

    this.window.focus();
  }

  /**
   * forceFocusWindow if for situations where Connect wants to essentially steal focus.
   *
   * One example would be 3rd party apps interacting with resources exposed by Connect, e.g.
   * gateways. If the user attempts to make a connection through a gateway but the certs have
   * expired, Connect should receive focus and show an appropriate message to the user.
   */
  forceFocusWindow(): void {
    if (!this.window) {
      return;
    }

    if (this.window.isFocused()) {
      return;
    }

    // What follows is a special focus handler for windows.
    //
    // On Windows, app.focus() doesn't work as expected so instead we call win.focus().
    // If the window is minimized, win.focus() will bring it to the front and give it focus.
    // If the window is not minimized but simply covered by other another window, win.focus() will
    // flash the icon of Connect in the task bar.
    //
    // Ideally, we'd like the not minimized window to receive focus too. We considered two
    // workarounds to bring focus to a window that's not minimized:
    //
    // * win.minimized() followed by win.focus() – this reportedly doesn't work anymore (see the
    // comment linked below) though it did work at the time of implementing forceFocusWindow.
    // Admittedly, this seems like a hack and does cause the window to first minimize and then show
    // up which feels weird.
    // * win.setAlwaysOnTop(true) followed by win.show() – this does bring the window to the top
    // but doesn't give it focus. Super awkward because Connect shows up over another app that you
    // were using, you start typing to fill out whatever form Connect has shown you. But your
    // keystrokes go to the app that the Connect window just covered.
    //
    // Since we cannot reliably steal focus, let's just not attempt to do it and instead defer to
    // flashing the icon in the task bar.
    //
    // https://github.com/electron/electron/issues/2867#issuecomment-1080573240
    //
    // I don't understand why calling win.focus() on a minimized window gives it focus in the
    // first place. In theory it shouldn't work, see the links below:
    //
    // https://stackoverflow.com/a/72620653/742872
    // https://devblogs.microsoft.com/oldnewthing/20090220-00/?p=19083
    // https://github.com/electron/electron/issues/2867#issuecomment-142480964
    // https://github.com/electron/electron/issues/2867#issuecomment-142511956
    if (this.settings.platform === 'win32') {
      this.window.focus();
      return;
    }

    app.dock?.bounce('informational');
    // app.focus() alone doesn't un-minimize the window if the window is minimized.
    this.window.show();
    app.focus({ steal: true });
  }

  private saveWindowState(window: BrowserWindow): void {
    const windowState: WindowState = {
      ...window.getNormalBounds(),
    };

    this.fileStorage.put(this.storageKey, windowState);
  }

  private popupUniversalContextMenu(
    window: BrowserWindow,
    props: Electron.ContextMenuParams
  ): void {
    // Taken from https://github.com/electron/electron/issues/4068#issuecomment-274159726
    // selectall was removed from menus because it doesn't make sense in our context.
    const { selectionText, isEditable } = props;

    if (isEditable) {
      this.inputContextMenu.popup({ window });
    } else if (selectionText && selectionText.trim() !== '') {
      this.selectionContextMenu.popup({ window });
    }
  }

  private getWindowState(): WindowState {
    const windowState = this.fileStorage.get<WindowState>(this.storageKey);
    const getDefaults = () => ({
      height: 720,
      width: 1280,
      x: undefined,
      y: undefined,
    });

    if (!windowState) {
      return getDefaults();
    }

    const getPositionAndSize = () => {
      const displayBounds = screen.getDisplayNearestPoint({
        x: windowState.x,
        y: windowState.y,
      }).bounds;

      const isWindowWithinDisplayBounds =
        windowState.x >= displayBounds.x &&
        windowState.y >= displayBounds.y &&
        windowState.x + windowState.width <=
          displayBounds.x + displayBounds.width &&
        windowState.y + windowState.height <=
          displayBounds.y + displayBounds.height;

      if (isWindowWithinDisplayBounds) {
        return {
          x: windowState.x,
          y: windowState.y,
          width: windowState.width,
          height: windowState.height,
        };
      }
    };

    return {
      ...getDefaults(),
      ...getPositionAndSize(),
    };
  }
}
