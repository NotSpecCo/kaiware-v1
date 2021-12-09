import React, { useState } from 'react';
import { ComponentBaseProps } from '../models';
import { ClickableProps } from '../models/ClickableProps';
import { closeApp, installApp, launchApp, uninstallApp } from '../services/device';
import { IconButton } from '../ui-components/IconButton';
import { joinClasses } from '../utils/classes';
import styles from './AppRow.module.css';

type Props = ComponentBaseProps &
  ClickableProps & {
    appId: string;
    iconUrl?: string;
    name: string;
    author: string;
    description: string;
    downloadUrl?: string;
    installed?: boolean;
    showInstallBtn?: boolean;
    showUninstallBtn?: boolean;
    showLaunchBtn?: boolean;
    showCloseBtn?: boolean;
    onInstall?: () => void;
    onUninstall?: () => void;
    onLaunch?: () => void;
    onClose?: () => void;
  };

export function AppRow({ ...props }: Props): JSX.Element {
  const [working, setWorking] = useState(false);

  async function install() {
    if (working) return;

    if (!props.downloadUrl) {
      console.error('App has no download url set!');
      return;
    }

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

  async function launch() {
    if (working) return;

    setWorking(true);
    await launchApp(props.appId);
    setWorking(false);
    props.onLaunch?.();
  }

  async function close() {
    if (working) return;

    setWorking(true);
    await closeApp(props.appId);
    setWorking(false);
    props.onClose?.();
  }

  return (
    <div
      className={joinClasses(styles.root, props.className)}
      style={{ gridTemplateColumns: props.iconUrl ? '48px auto max-content' : 'auto max-content' }}
      onClick={props.onClick}
    >
      {props.iconUrl ? <img className={styles.icon} src={props.iconUrl || ''} alt="" /> : null}
      <div className={styles.text}>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.author}>{props.author}</div>
        <div className={styles.description}>{props.description}</div>
      </div>
      <div className={styles.actions}>
        {props.showLaunchBtn && <IconButton icon="play" title="Launch" onClick={() => launch()} />}
        {props.showCloseBtn && <IconButton icon="cancel" title="Close" onClick={() => close()} />}
        {props.showInstallBtn && props.downloadUrl && (
          <IconButton icon="install" title="Install" onClick={() => install()} />
        )}
        {props.showUninstallBtn && (
          <IconButton icon="delete" title="Uninstall" onClick={() => uninstall()} />
        )}
      </div>
    </div>
  );
}
