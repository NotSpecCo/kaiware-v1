import React, { useEffect, useState } from 'react';
import { AppRow } from '../components/AppRow';
import { useDevice } from '../contexts/DeviceProvider';
import { usePanels } from '../contexts/PanelsProvider';
import { DeviceApp } from '../models';
import { getInstalledApps, getRunningApps } from '../services/device';
import { IconButton } from '../ui-components/IconButton';
import { Panel, PanelContent, PanelFooter, PanelHeader } from '../ui-components/panel';
import { IconSize } from '../ui-components/SvgIcon';
import { Typography } from '../ui-components/Typography';
import styles from './DevicePanel.module.css';
import { InstalledAppPanel } from './InstalledAppPanel';

type Props = {
  panelId: string;
};

export function DevicePanel({ panelId }: Props): JSX.Element {
  const [installedApps, setInstalledApps] = useState<DeviceApp[]>([]);
  const [runningApps, setRunningApps] = useState<DeviceApp[]>([]);
  const [working, setWorking] = useState(false);
  const device = useDevice();
  const { addPanel } = usePanels();

  async function getData() {
    if (working) return;

    setWorking(true);
    await device.refresh();

    const running = await getRunningApps();
    setRunningApps(running);

    const installed = await getInstalledApps();
    setInstalledApps(installed);
    setWorking(false);
  }

  useEffect(() => {
    getData();
  }, [device.info]);

  if (!device.info) {
    return (
      <Panel panelId={panelId}>
        <PanelHeader title="Device Info" />
        <PanelContent>
          <Typography type="bodyLarge">No device connected</Typography>
        </PanelContent>
      </Panel>
    );
  }

  return (
    <Panel panelId={panelId}>
      <PanelHeader title="Device Info" />
      <PanelContent>
        <div className={styles.container}>
          <img className={styles.device} src="/static/images/generic_device.png" alt="" />
          <div className={styles.info}>
            <Typography type="subtitle" padding="horizontal">
              {device.info?.name}
            </Typography>
            <Typography padding="horizontal" type="bodyLarge">
              KaiOS v{device.info?.version}
            </Typography>
            <Typography padding="horizontal" type="bodyLarge">
              Gecko v{device.info?.geckoversion}
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
            onClick={() => {
              addPanel(panelId, {
                id: `app_${app.id}`,
                closeOnEsc: true,
                element: (
                  <InstalledAppPanel key={`app_${app.id}`} panelId={`app_${app.id}`} app={app} />
                ),
              });
            }}
          />
        ))}
      </PanelContent>
      <PanelFooter className={styles.footer}>
        {working ? 'Loading...' : ''}
        <IconButton
          className={styles.btnRefresh}
          icon="refresh"
          animation="spin"
          size={IconSize.Small}
          onClick={() => getData()}
        />
      </PanelFooter>
    </Panel>
  );
}
