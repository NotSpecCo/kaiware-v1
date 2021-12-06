import { DeviceApp, DeviceInfo } from '../models';

export function getDeviceInfo(): Promise<DeviceInfo> {
  return (window as any).electron.kaiDevice.getInfo();
}

export function getRunningApps(): Promise<DeviceApp[]> {
  return (window as any).electron.kaiDevice.getRunningApps();
}

export function getInstalledApps(): Promise<DeviceApp[]> {
  return (window as any).electron.kaiDevice.getInstalledApps();
}

export function installApp(url: string): Promise<DeviceApp> {
  return (window as any).electron.kaiDevice.installApp(url);
}

export function uninstallApp(appId: string): Promise<void> {
  return (window as any).electron.kaiDevice.uninstallApp(appId);
}
