import React, { useState } from 'react';
import { ClickableProps } from '../models/ClickableProps';
import { StoreApp } from '../models/StoreApp';
import { installApp } from '../services/device';
import { Button } from '../ui-components/Button';
import styles from './AppRow.module.css';

type Props = ClickableProps & {
  app: StoreApp;
};

export function AppRow(props: Props): JSX.Element {
  const [installing, setInstalling] = useState(false);

  async function install() {
    if (installing) return;

    setInstalling(true);
    await installApp(props.app.download.url);
    setInstalling(false);
  }

  return (
    <div className={styles.root} onClick={props.onClick}>
      <img className={styles.icon} src={props.app.icon} alt="" />
      <div className={styles.text}>
        <div className={styles.name}>{props.app.name}</div>
        <div className={styles.author}>{props.app.author}</div>
        <div className={styles.description}>{props.app.description}</div>
      </div>
      <div className={styles.actions}>
        <Button
          className={styles.install}
          text={installing ? 'Installing' : 'Install'}
          disabled={installing}
          onClick={install}
        />
      </div>
    </div>
  );
}
