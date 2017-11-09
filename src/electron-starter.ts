import { app, BrowserWindow  } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as SocketServer from './socketServer';

let mainWindow: Electron.BrowserWindow;

function createWindow () {
    mainWindow = new BrowserWindow({width: 800, height: 600});
    console.log('start electron');
    const startUrl = process.env.ELECTRON_START_URL || url.format({
      pathname: path.join(__dirname, '/../public/index.html'),
      protocol: 'file:',
      slashes: true
    });
    mainWindow.loadURL(startUrl);

    mainWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
    });
    SocketServer.createSocket();
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
  SocketServer.closeSocket();
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});