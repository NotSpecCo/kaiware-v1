import React, { useEffect, useState } from 'react';
import { usePanels } from '../contexts/PanelsProvider';
import { StoreApp } from '../models';
import { downloadUrl } from '../services/browser';
import { installApp } from '../services/device';
import { getAppBySlug } from '../services/store';
import { BrowserLink } from '../ui-components/BrowserLink';
import { Button } from '../ui-components/Button';
import { Panel, PanelContent, PanelHeader } from '../ui-components/panel';
import { Typography } from '../ui-components/Typography';
import styles from './AppPanel.module.css';

type Props = {
  panelId: string;
  appSlug: string;
};

export function AppPanel({ panelId, appSlug }: Props): JSX.Element {
  const [app, setApp] = useState<StoreApp>();
  const [working, setWorking] = useState(false);
  const { closePanel } = usePanels();

  useEffect(() => {
    getAppBySlug(appSlug).then(setApp);
  }, [appSlug]);

  async function install() {
    if (!app || working) return;

    setWorking(true);
    await installApp(app.download.url);
    setWorking(false);
  }

  return (
    <Panel panelId={panelId}>
      <PanelHeader title={app?.name} imageUrl={app?.icon} onClose={() => closePanel(panelId)}>
        <div className={styles.subheader}>
          <div>
            {app?.author ? (
              <Typography padding="none">Author: {app?.author.join(', ')}</Typography>
            ) : null}
            {app?.maintainer ? (
              <Typography padding="none">Maintainer: {app?.maintainer.join(', ')}</Typography>
            ) : null}
          </div>
          <Button text="Download" onClick={() => downloadUrl(app?.download.url)} />
          <Button text={working ? 'Installing' : 'Install'} disabled={working} onClick={install} />
        </div>
      </PanelHeader>
      <PanelContent className={styles.content}>
        <div className={styles.screenshots}>
          {app?.screenshots.map((a, i) => (
            <img key={i} src={a} alt="" />
          ))}
        </div>
        <section className={styles.section}>
          <Typography type="subtitle">Description</Typography>
          <Typography padding="horizontal">{app?.description}</Typography>
        </section>
        <section className={styles.section}>
          <Typography type="subtitle">Links</Typography>
          <div className={styles.infoRow}>
            <Typography display="inline" type="bodyStrong">
              Website:
            </Typography>
            <BrowserLink url={app?.website} text={app?.website} />
          </div>
          <div className={styles.infoRow}>
            <Typography display="inline" type="bodyStrong">
              Donate:
            </Typography>
            <BrowserLink url={app?.donation} text={app?.donation} />
          </div>
        </section>
        <section className={styles.section}>
          <Typography type="subtitle">Meta</Typography>
          <div className={styles.infoRow}>
            <Typography display="inline" type="bodyStrong">
              Categories:
            </Typography>
            <Typography display="inline">{app?.meta.categories.join(', ')}</Typography>
          </div>
          <div className={styles.infoRow}>
            <Typography display="inline" type="bodyStrong">
              Tags:
            </Typography>
            <Typography display="inline">{app?.meta.tags.split('; ').join(', ')}</Typography>
          </div>
          <div className={styles.infoRow}>
            <Typography display="inline" type="bodyStrong">
              License:
            </Typography>
            <Typography display="inline">{app?.license}</Typography>
          </div>
        </section>
      </PanelContent>
    </Panel>
  );
}
