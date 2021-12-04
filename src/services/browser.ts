export function openUrl(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    (window as any).electron.browser.openUrl(url, (err: any, res: any) => {
      console.log('openUrl', err, res);
      if (err) reject(err);
      resolve(res);
    });
  });
}
export function downloadUrl(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    (window as any).electron.browser.downloadUrl(url, (err: any, res: any) => {
      console.log('downloadUrl', err, res);
      if (err) reject(err);
      resolve(res);
    });
  });
}
