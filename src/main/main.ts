import { BrowserWindow, app } from "electron";
import path from "node:path";
import { RunRepository } from "./database";
import { registerGameIpc } from "./ipc";

const isDev = Boolean(process.env.VITE_DEV_SERVER_URL);

function registerProcessLogging(): void {
  process.on("uncaughtException", (err) => {
    console.error("[main] Uncaught exception", err);
  });
  process.on("unhandledRejection", (reason) => {
    console.error("[main] Unhandled rejection", reason);
  });
}

function createWindow(): void {
  const window = new BrowserWindow({
    width: 1220,
    height: 760,
    minWidth: 980,
    minHeight: 640,
    backgroundColor: "#0b0f18",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (isDev) {
    window.loadURL(process.env.VITE_DEV_SERVER_URL as string);
  } else {
    window.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}

registerProcessLogging();

app.whenReady().then(() => {
  const repository = new RunRepository();
  registerGameIpc(repository);
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
