import React, { useRef, useState } from 'react';
import { installLocalApp } from '../services/device';
import { Button } from '../ui-components/Button';
import { Panel, PanelContent, PanelHeader } from '../ui-components/panel';
import { Typography } from '../ui-components/Typography';
import styles from './InstallPanel.module.css';

type Props = {
  panelId: string;
};

export function InstallPanel({ panelId }: Props): JSX.Element {
  const [file, setFile] = useState<File>();
  const [working, setWorking] = useState(false);
  const ref = useRef<HTMLInputElement>();

  function reset() {
    ref.current.value = null;
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
    <Panel panelId={panelId}>
      <PanelHeader title="Install a zip" showCloseButton={false} />
      <PanelContent>
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
            if (ev.target.files[0].name.endsWith('.zip')) {
              setFile(ev.target.files[0]);
            } else {
              ev.target.value = null;
            }
          }}
        />
        <div className={styles.actions}>
          <Button type="secondary" text="Reset" onClick={reset} />
          <Button text="Install" disabled={!file || working} onClick={install} />
        </div>
      </PanelContent>
    </Panel>
  );
}
