export function getDeviceInfo(): any {
  return new Promise((resolve, reject) => {
    (window as any).electron.kaiDevice.getInfo((err: any, res: any) => {
      console.log('getDeviceInfo', err, res);
      if (err) reject(err);
      resolve(res);
    });
  });
}

export function getInstalledApps(): any {
  return new Promise((resolve, reject) => {
    (window as any).electron.kaiDevice.getInstalledApps((err: any, res: any) => {
      console.log('getInstalledApps', err, res);
      if (err) reject(err);
      resolve(res);
    });
  });
}

export function installApp(url: string): any {
  return new Promise((resolve, reject) => {
    (window as any).electron.kaiDevice.installApp(url, (err: any, res: any) => {
      console.log('installApp', err, res);
      if (err) reject(err);
      resolve(res);
    });
  });
}

export function uninstallApp(appId: string): any {
  return new Promise((resolve, reject) => {
    (window as any).electron.kaiDevice.uninstallApp(appId, (err: any, res: any) => {
      console.log('uninstallApp', err, res);
      if (err) reject(err);
      resolve(res);
    });
  });
}
