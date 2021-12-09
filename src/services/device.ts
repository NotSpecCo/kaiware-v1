import { DeviceApp, DeviceInfo } from '../models';

export function getDeviceInfo(): Promise<DeviceInfo> {
  return window.electron.kaiDevice.getInfo();
}

export function getRunningApps(): Promise<DeviceApp[]> {
  return window.electron.kaiDevice.getRunningApps();
}

export function getInstalledApps(): Promise<DeviceApp[]> {
  return window.electron.kaiDevice.getInstalledApps();
}

export function installApp(url: string): Promise<DeviceApp> {
  return window.electron.kaiDevice.installApp(url);
}

export function installLocalApp(filePath: string): Promise<DeviceApp> {
  return window.electron.kaiDevice.installLocalApp(filePath);
}

export function uninstallApp(appId: string): Promise<void> {
  return window.electron.kaiDevice.uninstallApp(appId);
}

export function launchApp(appId: string): Promise<void> {
  return window.electron.kaiDevice.launchApp(appId);
}

export function closeApp(appId: string): Promise<void> {
  return window.electron.kaiDevice.closeApp(appId);
}
