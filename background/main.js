const { BrowserWindow, app, Menu, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;
Menu.setApplicationMenu(false);

function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.maximize();

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  isDev && mainWindow.webContents.openDevTools();

  mainWindow.once("ready-to-show", () => {
    autoUpdater.checkForUpdatesAndNotify();
    mainWindow.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

autoUpdater.on("update-available", () => {
  mainWindow.webContents.send("UPDATE_AVAILABLE");
});
autoUpdater.on("update-downloaded", () => {
  mainWindow.webContents.send("UPDATE_DOWNLOADED");
  autoUpdater.quitAndInstall();
});

ipcMain.on("GET_APP_VERSION", () => {
  mainWindow.webContents.send("GET_APP_VERSION", app.getVersion());
});
