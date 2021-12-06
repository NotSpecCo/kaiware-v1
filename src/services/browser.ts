export function openUrl(url: string): Promise<void> {
  return (window as any).electron.browser.openUrl(url);
}
export function downloadUrl(url: string): Promise<void> {
  return (window as any).electron.browser.downloadUrl(url);
}
