import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StoreApp } from '../models';
import { downloadUrl } from '../services/browser';
import { installApp } from '../services/device';
import { getAppBySlug } from '../services/store';
import { BrowserLink } from '../ui-components/BrowserLink';
import { Button } from '../ui-components/Button';
import { Typography } from '../ui-components/Typography';
import { View, ViewContent, ViewHeader } from '../ui-components/view';
import styles from './AppInfo.module.css';

type Params = {
  slug: string;
};

export function AppInfo(): JSX.Element {
  const [app, setApp] = useState<StoreApp | null>(null);
  const [working, setWorking] = useState(false);
  console.log('app', app);

  const { slug } = useParams<Params>();

  useEffect(() => {
    getAppBySlug(slug).then(setApp);
  }, []);

  async function install() {
    if (!app || working) return;

    setWorking(true);
    await installApp(app.download.url);
    setWorking(false);
  }

  if (!app) {
    return <View>Loading</View>;
    // TODO
    // Either make it not load by opening the component with the data it needs (so opener gets data and provides it to AppInfo via props)
    // Or make a skeleton-placeholder / loading screen that gets displayed while `app === null`
  }

  return (
    <View>
      <ViewHeader className={styles.header}>
        <img src={app.icon} alt="" />
        <div>
          <Typography type="titleLarge" padding="none">
            {app.name || ''}
          </Typography>
          {app.author ? (
            <Typography padding="none">Author: {app.author.join(', ')}</Typography>
          ) : null}
          {app.maintainer ? (
            <Typography padding="none">Maintainer: {app.maintainer.join(', ')}</Typography>
          ) : null}
        </div>
        <div className={styles.actions}>
          <Button
            text={working ? 'Installing' : 'Install'}
            fullWidth={true}
            disabled={working}
            onClick={install}
          />
          <Button text="Download" fullWidth={true} onClick={() => downloadUrl(app.download.url)} />
        </div>
      </ViewHeader>
      <ViewContent className={styles.content}>
        <div className={styles.screenshots}>
          {app.screenshots.map((a, i) => (
            <img key={i} src={a} alt="" />
          ))}
        </div>
        <section className={styles.section}>
          <Typography type="subtitle">Description</Typography>
          <Typography padding="horizontal">{app.description}</Typography>
        </section>
        <section className={styles.section}>
          <Typography type="subtitle">Links</Typography>
          <div className={styles.infoRow}>
            <Typography display="inline" type="bodyStrong">
              Website:
            </Typography>
            <BrowserLink url={app.website} text={app.website} />
          </div>
          <div className={styles.infoRow}>
            <Typography display="inline" type="bodyStrong">
              Donate:
            </Typography>
            <BrowserLink url={app.donation} text={app.donation} />
          </div>
        </section>
        <section className={styles.section}>
          <Typography type="subtitle">Meta</Typography>
          <div className={styles.infoRow}>
            <Typography display="inline" type="bodyStrong">
              Categories:
            </Typography>
            <Typography display="inline">{app.meta.categories.join(', ')}</Typography>
          </div>
          <div className={styles.infoRow}>
            <Typography display="inline" type="bodyStrong">
              Tags:
            </Typography>
            <Typography display="inline">{app.meta.tags.split('; ').join(', ')}</Typography>
          </div>
          <div className={styles.infoRow}>
            <Typography display="inline" type="bodyStrong">
              License:
            </Typography>
            <Typography display="inline">{app.license}</Typography>
          </div>
        </section>
      </ViewContent>
    </View>
  );
}
