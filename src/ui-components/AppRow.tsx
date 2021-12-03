import React from 'react';
import { useDevice } from '../contexts/DeviceProvider';
import { ClickableProps } from '../models/ClickableProps';
import { StoreApp } from '../models/StoreApp';
import { installApp } from '../services/device';
import styles from './AppRow.module.css';
import { Button } from './Button';

type Props = ClickableProps & {
  app: StoreApp;
};

export function AppRow(props: Props): JSX.Element {
  const { device } = useDevice();

  async function install() {
    console.log('install', props.app, device);
    console.log('start');

    await installApp(props.app.download.url);
    console.log('DONE!!!!!');

    // installApp('/Users/garredow/Downloads/PodLP_2.0.0.1/application2.zip');
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
        <Button text="Install" onClick={install} />
      </div>
    </div>
  );
}
