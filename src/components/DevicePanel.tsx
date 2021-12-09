import React, { useEffect, useState } from 'react';
import { AppRow } from '../components/AppRow';
import { DeviceApp, DeviceInfo } from '../models';
import { getDeviceInfo, getInstalledApps, getRunningApps } from '../services/device';
import { Panel, PanelContent, PanelHeader } from '../ui-components/panel';
import { Typography } from '../ui-components/Typography';
import styles from './DevicePanel.module.css';

type Props = {
  panelId: string;
};

export function DevicePanel({ panelId }: Props): JSX.Element {
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
    <Panel panelId={panelId}>
      <PanelHeader title="Device Info" />
      <PanelContent>
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
            author={app.manifest.developer?.name}
            description={app.manifest.description}
            installed={true}
            showCloseBtn={true}
            showUninstallBtn={true}
            onClose={() => {
              setRunningApps(runningApps.filter((a) => a.id !== app.id));
            }}
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
            showLaunchBtn={true}
            showUninstallBtn={true}
            onLaunch={() => setRunningApps([...runningApps, app])}
            onUninstall={() => setInstalledApps(installedApps.filter((a) => a.id !== app.id))}
          />
        ))}
      </PanelContent>
    </Panel>
  );
}
