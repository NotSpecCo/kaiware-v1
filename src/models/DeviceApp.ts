export interface DeviceApp {
  origin: string;
  installOrigin: string;
  manifest: {
    name: string;
    description: string;
    subtitle: string;
    developer: {
      name: string;
      url: string;
    };
    version: string;
  };
  manifestURL: string;
  appStatus: number;
  receipts: any[];
  kind: string;
  installTime: number;
  installState: string;
  removable: true;
  id: string;
  basePath: string;
  localId: number;
  sideloaded: true;
  enabled: true;
  blockedStatus: number;
  name: string;
  csp: string;
  role: string;
  redirects: null;
  widgetPages: any[];
  installerAppId: number;
  installerIsBrowser: boolean;
  storeId: string;
  storeVersion: number;
  downloading: boolean;
  readyToApplyDownload: boolean;
}
