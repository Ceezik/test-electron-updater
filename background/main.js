const { BrowserWindow, app, Menu, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;
Menu.setApplicationMenu(false);

async function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  await mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  autoUpdater.checkForUpdatesAndNotify();
  mainWindow.maximize();
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

autoUpdater.on("dowload-progress", (progress) => {
  mainWindow.webContents.send("DOWLOAD_PROGRESS", Math.round(progress.percent));
});

autoUpdater.on("update-downloaded", () => {
  mainWindow.webContents.send("UPDATE_DOWNLOADED");
  autoUpdater.quitAndInstall();
});

ipcMain.on("GET_APP_VERSION", () => {
  mainWindow.webContents.send("GET_APP_VERSION", app.getVersion());
});
