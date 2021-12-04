import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { DeviceInfo } from '../models';
import { StoreCategory } from '../models/StoreCategory';
import { getDeviceInfo } from '../services/device';
import { getCategories } from '../services/store';
import { Typography } from '../ui-components/Typography';
import { delay } from '../utils/delay';
import styles from './Sidebar.module.css';
import { SidebarItem } from './SitebarItem';

export function Sidebar(): JSX.Element {
  const [categories, setCategories] = useState<StoreCategory[]>([]);
  const [device, setDevice] = useState<DeviceInfo>();
  const [searching, setSearching] = useState(false);
  const history = useHistory();

  useEffect(() => {
    refreshDevice();
    getCategories().then(setCategories);
  }, []);

  async function refreshDevice() {
    if (searching) return;

    setSearching(true);
    await delay(500);
    const res = await getDeviceInfo().catch((err) => console.log('init err', err));
    if (res) {
      setDevice(res);
    }
    setSearching(false);
  }

  return (
    <div className={styles.root}>
      <div className={styles.titlebar} />
      <SidebarItem primaryText="Home" onClick={() => history.push(`/`)} />
      <Typography type="titleSmall">Apps</Typography>
      {categories.map((a) => (
        <SidebarItem
          key={a.id}
          primaryText={a.name}
          onClick={() => history.push(`/category/${a.id}`)}
        />
      ))}
      <div className={styles.spacer} />
      <Typography type="titleSmall">System</Typography>
      <SidebarItem primaryText="Settings" />
      <SidebarItem primaryText="About" />
      <Typography type="titleSmall">Device</Typography>
      {device ? (
        <SidebarItem
          primaryText={device.name}
          secondaryText="Connected"
          onClick={() => history.push(`/device`)}
        />
      ) : (
        <SidebarItem
          primaryText="No Device"
          secondaryText={searching ? 'Searching...' : 'Click to refresh'}
          onClick={() => refreshDevice()}
        />
      )}
    </div>
  );
}
