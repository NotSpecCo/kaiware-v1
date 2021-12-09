import { contextBridge, ipcRenderer } from 'electron';

// when updating this make also sure to update the type definitions in globals.d.ts as well
contextBridge.exposeInMainWorld('electron', {
  kaiDevice: {
    getInfo: () => ipcRenderer.invoke('device-info'),
    getRunningApps: () => ipcRenderer.invoke('device-running-apps'),
    getInstalledApps: () => ipcRenderer.invoke('device-installed-apps'),
    installApp: (url: string) => ipcRenderer.invoke('device-install', url),
    installLocalApp: (url: string) => ipcRenderer.invoke('device-install-local', url),
    uninstallApp: (appId: string) => ipcRenderer.invoke('device-uninstall', appId),
    launchApp: (appId: string) => ipcRenderer.invoke('device-launch-app', appId),
    closeApp: (appId: string) => ipcRenderer.invoke('device-close-app', appId),
  },
  browser: {
    openUrl: (url: string) => ipcRenderer.invoke('open-url', url),
    downloadUrl: (url: string) => ipcRenderer.invoke('download-url', url),
  },
});
