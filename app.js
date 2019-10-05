const { app, BrowserWindow } = require('electron');

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

  win.loadURL(`file://${__dirname}/app/app.html`)

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
