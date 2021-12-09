import React, { useRef, useState } from 'react';
import { installLocalApp } from '../services/device';
import { Button } from '../ui-components/Button';
import { Typography } from '../ui-components/Typography';
import { View, ViewContent, ViewHeader } from '../ui-components/view';
import styles from './Home.module.css';

export function Home(): JSX.Element {
  const [file, setFile] = useState<File>();
  const [working, setWorking] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  function reset() {
    if (ref.current) {
      ref.current.value = '';
    }
    setFile(undefined);
  }

  async function install() {
    if (!file || working) return;

    setWorking(true);
    await installLocalApp(file.path).catch((err) => console.log('err', err));
    setWorking(false);
    reset();
  }

  return (
    <View>
      <ViewHeader>
        <Typography type="titleLarge" padding="none">
          Install a zip
        </Typography>
      </ViewHeader>
      <ViewContent>
        <Typography>
          Drag and drop a zipped app to the box below to install it to your device. Ensure the
          manifest.webapp file is at the root of the zip.
        </Typography>
        <input
          ref={ref}
          className={styles.input}
          type="file"
          accept="application/zip"
          onChange={(ev) => {
            const file = ev.target.files && ev.target.files[0];
            if (file?.name.endsWith('.zip')) {
              setFile(file);
            } else {
              ev.target.value = '';
            }
          }}
        />
        <div className={styles.actions}>
          <Button type="secondary" text="Reset" onClick={reset} />
          <Button text="Install" disabled={!file || working} onClick={install} />
        </div>
      </ViewContent>
    </View>
  );
}
