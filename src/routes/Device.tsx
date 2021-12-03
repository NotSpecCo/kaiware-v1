import React, { useEffect, useState } from 'react';
import { AppRow } from '../components/AppRow';
import { DeviceApp, DeviceInfo } from '../models';
import { getDeviceInfo, getInstalledApps, getRunningApps } from '../services/device';
import { Typography } from '../ui-components/Typography';
import { View, ViewContent, ViewHeader } from '../ui-components/view';
import styles from './Device.module.css';

export function Device(): JSX.Element {
  const [info, setInfo] = useState<DeviceInfo>();
  const [installedApps, setInstalledApps] = useState<DeviceApp[]>([]);
  const [runningApps, setRunningApps] = useState<DeviceApp[]>([]);

  async function getData() {
    const inf = await getDeviceInfo();
    setInfo(inf);

    const running = await getRunningApps();
    setRunningApps(running);

    const installed = await getInstalledApps();
    setInstalledApps(installed);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <ViewHeader>
        <Typography type="titleLarge" padding="none">
          Device Info
        </Typography>
      </ViewHeader>
      <ViewContent>
        <div className={styles.container}>
          <img className={styles.device} src="/static/images/generic_device.png" alt="" />
          <div className={styles.info}>
            <Typography type="subtitle" padding="horizontal">
              {info?.name}
            </Typography>
            <Typography padding="horizontal" type="bodyLarge">
              KaiOS v{info?.version}
            </Typography>
            <Typography padding="horizontal" type="bodyLarge">
              Gecko v{info?.geckoversion}
            </Typography>
          </div>
        </div>
        <Typography type="title">Running Apps</Typography>
        {runningApps.map((app) => (
          <AppRow
            key={app.id}
            appId={app.id}
            name={app.manifest.name}
            author={app.manifest.developer.name}
            description={app.manifest.description}
            installed={true}
            onUninstall={() => {
              setRunningApps(runningApps.filter((a) => a.id !== app.id));
              setInstalledApps(installedApps.filter((a) => a.id !== app.id));
            }}
          />
        ))}
        <Typography type="title">Installed Apps</Typography>
        {installedApps.map((app) => (
          <AppRow
            key={app.id}
            appId={app.id}
            name={app.manifest.name}
            author={app.manifest.developer.name}
            description={app.manifest.description}
            installed={true}
            onUninstall={() => setInstalledApps(installedApps.filter((a) => a.id !== app.id))}
          />
        ))}
      </ViewContent>
    </View>
  );
}
