export interface AppsActor {
  launch: (manifestUrl: string, cb: any) => void;
  close: (manifestUrl: string, cb: any) => void;
  getApp: (manifestUrl: string, cb: any) => void;
  getInstalledApps: (cb: any) => void;
  installHosted: any;
  installPackaged: (path: string, appId: string, cb: any) => void;
  installPackagedWithADB: (path: string, appId: string, cb: any) => void;
  listRunningApps: (cb: any) => void;
  uninstall: (manifestUrl: string, cb: any) => void;
  unwatchApps: (cb: any) => void;
  watchApps: (cb: any) => void;
}
