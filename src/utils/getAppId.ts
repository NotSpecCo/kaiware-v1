export function getAppId(manifestUrl: string) {
  if (!manifestUrl) {
    throw new Error('No manifestUrl specified');
  }

  const matches = manifestUrl.match(/^app:\/\/(.*)\/manifest\.webapp$/);

  if (!matches || !matches[1]) {
    throw new Error(`Unable to find app ID in manifestUrl ${manifestUrl}`);
  }

  return matches[1];
}
