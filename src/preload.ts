import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  kaiDevice: {
    getInfo(cb: (err: any, res: any) => void) {
      ipcRenderer.send('device-info');
      ipcRenderer.on('device-info-reply', (event, err, result) => cb(err, result));
    },
    getRunningApps(cb: (err: any, res: any) => void) {
      ipcRenderer.send('device-running-apps');
      ipcRenderer.on('device-running-apps-reply', (event, err, result) => cb(err, result));
    },
    getInstalledApps(cb: (err: any, res: any) => void) {
      ipcRenderer.send('device-installed-apps');
      ipcRenderer.on('device-installed-apps-reply', (event, err, result) => cb(err, result));
    },
    installApp(url: string, cb: (err: any, res: any) => void) {
      ipcRenderer.send('device-install', url);
      ipcRenderer.on('device-install-reply', (event, err, result) => cb(err, result));
    },
    uninstallApp(appId: string, cb: (err: any, res: any) => void) {
      ipcRenderer.send('device-uninstall', appId);
      ipcRenderer.on('device-uninstall-reply', (event, err, result) => cb(err, result));
    },
  },
});
