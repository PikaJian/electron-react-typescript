const electron = require('electron');
const app  = electron.app;
const BrowserWindow  = electron.BrowserWindow;
const Menu  = electron.Menu;
const MenuItem  = electron.MenuItem;
const ipcMain  = electron.ipcMain;
const dialog  = electron.dialog;

let mainWindow;
let template = [{
  label: 'edit',
  submenu: [{
    label: 'fuck',
    accelerator: '',
    click: function () {
      console.log('shit')
    }
  }],
}]
const menu = new Menu()
menu.append(new MenuItem({ label: 'Hello', click: function () {dialog.showErrorBox('', 'don\'t touch me')} }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'Electron', type: 'checkbox', checked: true }))

ipcMain.on('show-context-menu', function (event) {
  const win = BrowserWindow.fromWebContents(event.sender)
  menu.popup(win)
})

app.on('browser-window-created', function (event, win) {
  win.webContents.on('context-menu', function (e, params) {
    menu.popup(win, params.x, params.y)
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  //set menu
  //const menu = Menu.buildFromTemplate(template);
  //Menu.setApplicationMenu(menu);

  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1024, height: 768});
  BrowserWindow.addDevToolsExtension('/home/pikachien/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/2.5.2_0/')
  // and load the index.html of the app.
  mainWindow.webContents.session.setProxy({}, function () {
    //mainWindow.loadURL('http://localhost:8888');
    mainWindow.loadURL('file://' + __dirname + '/dist/index.html');
  });
  //mainwindow.loadurl('file://' + __dirname + '/src/index.html');
  //mainwindow.loadurl("http://github.com");

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
