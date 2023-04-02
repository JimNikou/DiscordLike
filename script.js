const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const Notifications = require('./js/notifications.js');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'js/preload.js'),
    },
  });
  win.setMinimumSize(920, 590);
  win.loadFile('index.html');
};



app.whenReady().then(() => {
  createWindow();
  
  
  Notifications.show('Basic Notification', 'Notification from the Main process')

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});