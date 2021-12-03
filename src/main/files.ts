import isDev from 'electron-is-dev';
import extract from 'extract-zip';
import { https } from 'follow-redirects';
import fs from 'fs';

const basePath = isDev ? `${__dirname}/../../tmp` : __dirname;
console.log('basePath', basePath);

function download(url: string, filePath: string) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https
      .get(url, (res) => {
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
      })
      .on('error', (err) => fs.unlink(filePath, () => reject(err)));
  });
}

async function findZip(dirPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, function (err, files) {
      if (err) {
        return reject(err);
      }
      console.log('files:', files);

      const zip = files.find((file) => file.endsWith('.zip'));
      resolve(zip);
    });
  });
}

export async function getZipFromUrl(url: string): Promise<string> {
  console.log('BASE PATH', basePath);

  const fileId = new Date().valueOf();
  const filePath = `${basePath}/${fileId}.zip`;

  try {
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }
    await download(url, filePath);
    await extract(filePath, { dir: `${basePath}/${fileId}` });
    const zipFileName = await findZip(`${basePath}/${fileId}`);
    return `${basePath}/${fileId}/${zipFileName}`;
  } catch (err) {
    console.error('getZipFromUrl failed', err);
  }
}
