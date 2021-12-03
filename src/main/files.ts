import extract from 'extract-zip';
// import https from 'https';
import { https } from 'follow-redirects';
import fs from 'fs';

function getFilePath(fileId: number) {
  return `/Users/garredow/code/kaiware/tmp/${fileId}.zip`;
}
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

// async function extractZip(fileId);

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
  console.log('__dirname', __dirname);

  const fileId = new Date().valueOf();
  const filePath = `/Users/garredow/code/kaiware/tmp/${fileId}.zip`;

  try {
    console.log('ENSURE FOLDER EXISTS');
    if (!fs.existsSync('/Users/garredow/code/kaiware/tmp')) {
      console.log('create dir');

      fs.mkdirSync('/Users/garredow/code/kaiware/tmp', { recursive: true });
    }
    console.log('DOWNLOAD');
    await download(url, filePath);
    console.log('EXTRACT');
    await extract(filePath, { dir: `/Users/garredow/code/kaiware/tmp/${fileId}` });
    console.log('FIND ZIP');
    const zipFileName = await findZip(`/Users/garredow/code/kaiware/tmp/${fileId}`);
    console.log('found zip', zipFileName);
    return `/Users/garredow/code/kaiware/tmp/${fileId}/${zipFileName}`;
  } catch (err) {
    console.error('FAILED', err);
  }
}
