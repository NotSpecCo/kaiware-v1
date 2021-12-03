import React, { useEffect, useState } from 'react';
import { AppRow } from '../components/AppRow';
import { DeviceApp, DeviceInfo } from '../models';
import { getDeviceInfo, getInstalledApps } from '../services/device';
import { Typography } from '../ui-components/Typography';
import { View, ViewContent, ViewHeader } from '../ui-components/view';
import { delay } from '../utils/delay';
import styles from './Device.module.css';

export function Device(): JSX.Element {
  const [info, setInfo] = useState<DeviceInfo>();
  const [apps, setApps] = useState<DeviceApp[]>([]);

  async function getData() {
    const res1 = await getDeviceInfo();
    setInfo(res1);

    await delay(500);

    const res2 = await getInstalledApps();
    setApps(res2);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <ViewHeader>
        <Typography type="titleLarge" padding="none">
          Device
        </Typography>
      </ViewHeader>
      <ViewContent>
        <div className={styles.container}>
          <img className={styles.device} src="/static/images/generic_device.png" alt="" />
          <div className={styles.info}>
            <Typography type="subtitle" padding="horizontal">
              {info?.name}
            </Typography>
            <Typography padding="horizontal">KaiOS v{info?.version}</Typography>
            <Typography padding="horizontal">Gecko v{info?.geckoversion}</Typography>
          </div>
        </div>
        <Typography type="title">Installed Apps</Typography>

        {apps.map((app) => (
          <AppRow
            key={app.id}
            appId={app.id}
            name={app.manifest.name}
            author={app.manifest.developer.name}
            description={app.manifest.description}
            installed={true}
            onUninstall={() => setApps(apps.filter((a) => a.id !== app.id))}
          />
        ))}
      </ViewContent>
    </View>
  );
}
