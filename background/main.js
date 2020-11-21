const { BrowserWindow, app, Menu, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;
Menu.setApplicationMenu(false);

async function createWindow() {
  mainWindow = new BrowserWindow({
    title: "Hueraki",
    minWidth: 600,
    minHeight: 800,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.maximize();
  await mainWindow.loadURL(
    isDev
      ? `file://${path.join(__dirname, "../build/index.html")}`
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  autoUpdater.checkForUpdates();
  mainWindow.show();
  isDev && mainWindow.webContents.openDevTools();

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

autoUpdater.on("update-not-available", () => {
  mainWindow.webContents.send("UPDATE_NOT_AVAILABLE");
});

autoUpdater.on("update-downloaded", () => {
  mainWindow.webContents.send("UPDATE_DOWNLOADED");
  autoUpdater.quitAndInstall();
});

ipcMain.on("GET_APP_VERSION", () => {
  mainWindow.webContents.send("GET_APP_VERSION", app.getVersion());
});
