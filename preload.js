const os = require("os");
const path = require("path");
const { contextBridge, ipcRenderer } = require("electron");
const toastify = require("toastify-js");
const { channel } = require("diagnostics_channel");

contextBridge.exposeInMainWorld("os", {
  homedir: () => os.homedir(),
});

contextBridge.exposeInMainWorld("path", {
  join: (...args) => path.join(...args),
});

contextBridge.exposeInMainWorld("Toastify", {
  toast: (options) => toastify(options).showToast(),
});

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) => ipcRenderer.on(channel, (e, ...args) => func(...args)),
});
