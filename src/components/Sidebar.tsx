import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { StoreCategory } from '../models/StoreCategory';
import { getCategories } from '../services/storedb';
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
      <SidebarItem primaryText="Home" onClick={() => history.push(`/`)} />
      <div className={styles.subtitle}>Categories</div>
      {categories.map((a) => (
        <SidebarItem
          key={a.id}
          primaryText={a.name}
          onClick={() => history.push(`/category/${a.id}`)}
        />
      ))}
      <div className={styles.spacer}></div>
      <div className={styles.subtitle}>System</div>
      <SidebarItem primaryText="Settings" />
      <SidebarItem primaryText="About" />
      <div className={styles.subtitle}>Device</div>
      {/* <div className={styles.device}>Nokia 6300</div> */}
      <SidebarItem primaryText="Nokia 6300" />
    </div>
  );
}
