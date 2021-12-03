import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { StoreCategory } from '../models/StoreCategory';
import { getCategories } from '../services/store';
import { Typography } from '../ui-components/Typography';
import styles from './Sidebar.module.css';
import { SidebarItem } from './SitebarItem';

export function Sidebar(): JSX.Element {
  const [categories, setCategories] = useState<StoreCategory[]>([]);
  const history = useHistory();

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.titlebar} />
      <SidebarItem primaryText="Home" onClick={() => history.push(`/`)} />
      <Typography type="titleSmall">Categories</Typography>
      {categories.map((a) => (
        <SidebarItem
          key={a.id}
          primaryText={a.name}
          onClick={() => history.push(`/category/${a.id}`)}
        />
      ))}
      <div className={styles.spacer}></div>
      <Typography type="titleSmall">System</Typography>
      <SidebarItem primaryText="Settings" />
      <SidebarItem primaryText="About" />
      <Typography type="titleSmall">Device</Typography>
      {/* <div className={styles.device}>Nokia 6300</div> */}
      <SidebarItem primaryText="Nokia 6300" />
    </div>
  );
}
