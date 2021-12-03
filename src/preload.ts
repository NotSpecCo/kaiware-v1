import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  kaiDevice: {
    getInfo(cb: (err: any, res: any) => void) {
      ipcRenderer.send('device-info');
      ipcRenderer.on('device-info-reply', (event, err, result) => cb(err, result));
    },
    installApp(url: string, cb: (err: any, res: any) => void) {
      ipcRenderer.send('device-install', url);
      ipcRenderer.on('device-install-reply', (event, err, result) => cb(err, result));
    },
  },
});
