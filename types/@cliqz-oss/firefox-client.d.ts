export = FirefoxClient;

// declare module 'firefox-client';
// declare module '@cliqz-oss/firefox-client';

declare class FirefoxClient {
  constructor(options?: any);
  addListener(type: any, listener: any): any;
  connect(port: any, host: any, cb: any): void;
  createJSObject(obj: any): any;
  disconnect(): void;
  emit(type: any, args: any): any;
  eventNames(): any;
  getDevice(cb: any): void;
  getMaxListeners(): any;
  getRoot(cb: any): void;
  getWebapps(cb: any): void;
  initialize(client: any, actor: any): void;
  listTabs(cb: any): void;
  listenerCount(type: any): any;
  listeners(type: any): any;
  off(type: any, listener: any): any;
  on(type: any, listener: any): any;
  onEnd(): void;
  onError(error: any): void;
  onTimeout(): void;
  once(type: any, listener: any): any;
  pluck(prop: any): any;
  prependListener(type: any, listener: any): any;
  prependOnceListener(type: any, listener: any): any;
  rawListeners(type: any): any;
  removeAllListeners(type: any, ...args: any[]): any;
  removeListener(type: any, listener: any): any;
  request(type: any, message: any, transform: any, callback: any): void;
  selectedTab(cb: any): void;
  setMaxListeners(n: any): any;
}
