import { DeviceInfo, DeviceApp } from './models';

declare global {
  interface Window {
    // see preload.ts for implementation
    electron: {
      kaiDevice: {
        getInfo: () => Promise<DeviceInfo>;
        getRunningApps: () => Promise<DeviceApp[]>;
        getInstalledApps: () => Promise<DeviceApp[]>;
        installApp: (url: string) => Promise<DeviceApp>;
        installLocalApp: (url: string) => Promise<DeviceApp>;
        uninstallApp: (appId: string) => Promise<void>;
        launchApp: (appId: string) => Promise<void>;
        closeApp: (appId: string) => Promise<void>;
      };
      browser: {
        openUrl: (url: string) => Promise<void>;
        downloadUrl: (url: string) => Promise<void>;
      };
    };
  }
}

export {};
