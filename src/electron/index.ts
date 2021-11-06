import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import logger from './logger';
import win from './windowSettings';

const isDev = !app.isPackaged;

function createWindow() {
  const mainWindow = new BrowserWindow({
    ...win.getPos(),
    ...win.getSize(),
    show: false,
    // Always on top used only for hot reloading
    alwaysOnTop: true,
    icon: join(__dirname, '../public/icon128.ico'),
    webPreferences: {
      preload: join(app.getAppPath(), './build/preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile(join(__dirname, '../public/index.html'));

  if (isDev) mainWindow.webContents.openDevTools();

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.on('new-window', (e, url) => {
    console.log('here' + url);
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });

  // Save moving and resizing window
  mainWindow.on('resized', () => {
    const size = {} as Size;
    size.height = mainWindow.getSize()[1];
    size.width = mainWindow.getSize()[0];
    win.saveSize(size);
  });

  mainWindow.on('moved', () => {
    const pos = {} as Position;
    [pos.x, pos.y] = mainWindow.getPosition();
    win.savePos(pos);
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Context bridge
ipcMain.handle('get/version', () => {
  return app.getVersion();
});

// Prevent link opens
app.on('web-contents-created', (_e, contents) => {
  // logger.info(_e);
  // Security of webviews
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    logger.info(event, params);

    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload;

    // Disable Node.js integration
    webPreferences.nodeIntegration = false;

    // Verify URL being loaded
    if (!params.src.startsWith(`file://${join(__dirname)}`)) {
      event.preventDefault(); // We do not open anything now
      logger.info('Preveted window open from: ' + params.src);
    }
  });

  contents.on('will-navigate', (event, navigationUrl) => {
    let parsedURL = new URL(navigationUrl);

    if (parsedURL.host !== 'localhost:5000' && isDev) {
      logger.warn('Stopped attempt to open: ' + navigationUrl);
      event.preventDefault();
    } else if (!isDev) {
      logger.warn('Stopped attempt to open: ' + navigationUrl);
      event.preventDefault();
    }
  });
});
