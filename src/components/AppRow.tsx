import React, { useState } from 'react';
import { ClickableProps } from '../models/ClickableProps';
import { installApp, uninstallApp } from '../services/device';
import { Button } from '../ui-components/Button';
import styles from './AppRow.module.css';

type Props = ClickableProps & {
  appId: string;
  iconUrl?: string;
  name: string;
  author: string;
  description: string;
  downloadUrl?: string;
  installed?: boolean;
  onInstall?: () => void;
  onUninstall?: () => void;
};

export function AppRow(props: Props): JSX.Element {
  const [working, setWorking] = useState(false);

  async function install() {
    if (working) return;

    setWorking(true);
    await installApp(props.downloadUrl);
    setWorking(false);
    props.onInstall?.();
  }

  async function uninstall() {
    if (working) return;

    setWorking(true);
    await uninstallApp(props.appId);
    setWorking(false);
    props.onUninstall?.();
  }

  return (
    <div className={styles.root} onClick={props.onClick}>
      <img className={styles.icon} src={props.iconUrl || ''} alt="" />
      <div className={styles.text}>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.author}>{props.author}</div>
        <div className={styles.description}>{props.description}</div>
      </div>
      <div className={styles.actions}>
        <Button
          className={styles.install}
          text={`${props.installed ? 'Uninstall' : 'Install'}${working ? 'ing' : ''}`}
          disabled={working}
          onClick={() => (props.installed ? uninstall() : install())}
        />
      </div>
    </div>
  );
}
