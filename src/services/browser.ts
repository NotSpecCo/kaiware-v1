export function openUrl(url: string): Promise<void> {
  return window.electron.browser.openUrl(url);
}
export function downloadUrl(url: string): Promise<void> {
  return window.electron.browser.downloadUrl(url);
}
