const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require("electron-updater");

let win

function createWindow () {
  // Create the browser window.

  win = new BrowserWindow({
    width: 360,
    height: 600,
    resizable: false,
    maximizable: false,
    show: false,
    icon: __dirname + '/app/assets/icon.jpg',
    webPreferences:{
      nodeIntegration: true
    },
  })
  win.setMenuBarVisibility(false)

  win.loadURL(`file://${__dirname}/app/app.html#v${app.getVersion()}`)

  // Auto updater
  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
  })
  autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.');
  })
  autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available.');
  })
  autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater. ' + err);
  })
  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
  })
  autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded');
  });
  // End of Updater Code


  win.on('ready-to-show', () => {
    win.show()
  })

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {

  if (win === null) {
    createWindow()
  }
})
