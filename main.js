const { app, BrowserWindow, Menu, shell } = require('electron')
const { join } = require('path')

// Thin desktop shell around the web app in app/ -- the same files that are served on GitHub Pages.
function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 960,
    minWidth: 420,
    minHeight: 600,
    show: false,
    backgroundColor: '#0e1412',
    icon: join(__dirname, 'resources', 'icon.png'),
    webPreferences: { sandbox: true, contextIsolation: true, nodeIntegration: false }
  })
  win.once('ready-to-show', () => win.show())
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })
  // Keep the app offline-only: never navigate away from the bundled page.
  win.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('file://')) event.preventDefault()
  })
  win.loadFile(join(__dirname, 'app', 'index.html'))
}

Menu.setApplicationMenu(null)

if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {
  app.whenReady().then(createWindow)
  app.on('window-all-closed', () => app.quit())
}
