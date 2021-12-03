import FirefoxClient from '@cliqz-oss/firefox-client';
// console.log(FirefoxClient);
import promisify from 'util.promisify';
import { AppsActor, DeviceActor, DeviceApp, DeviceInfo } from '../models';
import { getManifestUrl, logger } from '../utils';
import { getZipFromUrl } from './files';

export class Device {
  private _client: FirefoxClient;
  private _deviceActor: DeviceActor | undefined;
  private _appsActor: AppsActor | undefined;

  constructor() {
    this._client = new FirefoxClient();
  }

  public connect(port = 6000) {
    return new Promise((resolve, reject) => {
      this._client.connect(port, 'localhost', async (err: any) => {
        if (err) {
          logger.error('Unable to connect to device');
          return reject(err);
        }

        this._deviceActor = await this.getDeviceActor();
        this._appsActor = await this.getWebappsActor();

        resolve(null);
      });
      this._client.on('error', (err: any) => {
        logger.error('Unable to connect to device');
        reject(err);
      });
      this._client.on('timeout', (err: any) => {
        logger.error('Unable to connect to device');
        reject(err);
      });
    });
  }

  public disconnect() {
    this._client.disconnect();
  }

  private getDeviceActor(): Promise<DeviceActor> {
    return new Promise((resolve) => {
      this._client.getDevice((err: any, result: DeviceActor) => {
        resolve(result);
      });
    });
  }

  private getWebappsActor(): Promise<AppsActor> {
    return new Promise((resolve, reject) => {
      this._client.getWebapps((err: any, result: AppsActor) => {
        resolve(result);
      });
    });
  }

  public async getApp(appId: string): Promise<DeviceApp | undefined> {
    const apps = await this.getInstalledApps();
    const app = apps.find((a) => a.id === appId);

    if (!app) throw new Error(`Unable to find app for id ${appId}`);

    return app;
  }

  public async launchApp(appId: string): Promise<void> {
    const manifestUrl = getManifestUrl(appId);
    const launchApp = promisify(this._appsActor!.launch.bind(this._appsActor));

    await launchApp(manifestUrl).catch((err: any) => logger.error(err));
  }

  public async closeApp(appId: string): Promise<void> {
    const manifestUrl = getManifestUrl(appId);
    const closeApp = promisify(this._appsActor!.close.bind(this._appsActor));

    await closeApp(manifestUrl);
  }

  public async getInstalledApps(): Promise<DeviceApp[]> {
    const getInstalledApps = promisify<DeviceApp[]>(
      this._appsActor!.getInstalledApps.bind(this._appsActor)
    );

    const apps = await getInstalledApps();

    return apps;
  }

  public async getRunningApps(): Promise<DeviceApp[]> {
    const getRunningApps = promisify<string[]>(
      this._appsActor!.listRunningApps.bind(this._appsActor)
    );

    const manifestUrls = await getRunningApps();
    const allApps = await this.getInstalledApps();
    const runningApps = allApps.filter((a) => manifestUrls.includes(a.manifestURL));

    return runningApps;
  }

  public async installPackagedApp(path: string, appId: string): Promise<DeviceApp> {
    const installPackagedApp = promisify<string, string, string>(
      this._appsActor!.installPackaged.bind(this._appsActor)
    );

    const installedAppId = await installPackagedApp(path, appId);
    const installedApp = (await this.getApp(installedAppId)) as DeviceApp;

    return installedApp;
  }

  public async installPackagedAppFromUrl(url: string, appId: string): Promise<DeviceApp> {
    const zipFilePath = await getZipFromUrl(url);
    const installedApp = await this.installPackagedApp(zipFilePath, appId);

    return installedApp;
  }

  public async uninstallApp(appId: string): Promise<DeviceApp> {
    const manifestUrl = getManifestUrl(appId);
    const uninstallApp = promisify<string, DeviceApp>(
      this._appsActor!.uninstall.bind(this._appsActor)
    );

    const uninstalledApp = await uninstallApp(manifestUrl);

    return uninstalledApp;
  }

  public async getDeviceInfo(): Promise<DeviceInfo> {
    const getDeviceInfo = promisify<DeviceInfo>(
      this._deviceActor!.getDescription.bind(this._deviceActor)
    );

    const device = await getDeviceInfo();
    device.name = device.useragent?.match(/Mobile; (.*);/)?.[1] || 'Generic Device';

    return device;
  }
}

export async function useDevice(fn: (device: Device) => void) {
  const device = new Device();
  await device.connect();
  const result = await fn(device);
  device.disconnect();
  return result;
}
