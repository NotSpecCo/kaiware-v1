import React, { useEffect, useState } from 'react';
import { useDevice } from '../contexts/DeviceProvider';
import { usePanels } from '../contexts/PanelsProvider';
import { StoreApp } from '../models';
import { downloadUrl } from '../services/browser';
import { installApp } from '../services/device';
import { fetchAppVersion, getAppBySlug } from '../services/store';
import { BrowserLink } from '../ui-components/BrowserLink';
import { Button } from '../ui-components/Button';
import { Panel, PanelContent, PanelHeader } from '../ui-components/panel';
import { Typography } from '../ui-components/Typography';
import styles from './AppPanel.module.css';
import { ImageScroller } from './ImageScroller';

type Props = {
  panelId: string;
  appSlug: string;
};

export function AppPanel({ panelId, appSlug }: Props): JSX.Element {
  const [app, setApp] = useState<StoreApp | null>();
  const [version, setVersion] = useState<string>('');
  const [working, setWorking] = useState(false);
  const { closePanel } = usePanels();
  const { info: device } = useDevice();

  useEffect(() => {
    getAppBySlug(appSlug).then((res) => {
      if (!res) return;

      setApp(res);
      fetchAppVersion(res?.download.manifest).then(setVersion);
    });
  }, [appSlug]);

  async function install() {
    if (!app || working) return;

    setWorking(true);
    await installApp(app.download.url);
    setWorking(false);
  }

  if (!app) {
    return <Panel panelId={panelId}>Loading</Panel>;
    // TODO
    // Either make it not load by opening the component with the data it needs (so opener gets data and provides it to AppInfo via props)
    // Or make a skeleton-placeholder / loading screen that gets displayed while `app === null`
  }

  return (
    <Panel panelId={panelId}>
      <PanelHeader
        title={app?.name}
        imageUrl={app?.icon}
        showCloseButton={true}
        onClose={() => closePanel(panelId)}
      >
        <div className={styles.subheader}>
          <div>
            {app?.author ? (
              <Typography padding="none">
                Author:{' '}
                {app?.people
                  .filter((a) => a.role === 'author')
                  .map((a) => a.name)
                  .join(', ')}
              </Typography>
            ) : null}
            {app?.maintainer ? (
              <Typography padding="none">
                Maintainer:{' '}
                {app?.people
                  .filter((a) => a.role === 'maintainer')
                  .map((a) => a.name)
                  .join(', ')}
              </Typography>
            ) : null}
          </div>
          {/* <Button text="Download" onClick={() => downloadUrl(app?.download.url)} /> */}
          <Button
            text={working ? 'Installing' : 'Install'}
            disabled={working || !device}
            onClick={install}
          />
        </div>
      </PanelHeader>
      <PanelContent className={styles.content}>
        <ImageScroller className={styles.screenshots} imageUrls={app?.screenshots} />
        <section className={styles.section}>
          <Typography type="subtitle">Description</Typography>
          <Typography padding="horizontal">{app?.description}</Typography>
        </section>
        <section className={styles.section}>
          <Typography type="subtitle">Links</Typography>
          <table>
            <tbody>
              <tr>
                <td>
                  <Typography type="bodyStrong" padding="horizontal">
                    Download:
                  </Typography>
                </td>
                <td>
                  <a
                    href=""
                    onClick={(ev) => {
                      ev.stopPropagation();
                      ev.preventDefault();
                      downloadUrl(app?.download.url);
                    }}
                  >
                    {app?.download.url}
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography type="bodyStrong" padding="horizontal">
                    Website:
                  </Typography>
                </td>
                <td>
                  <BrowserLink url={app?.website} text={app?.website} />
                </td>
              </tr>
              <tr>
                <td>
                  <Typography type="bodyStrong" padding="horizontal">
                    Donate:
                  </Typography>
                </td>
                <td>
                  <BrowserLink url={app?.donation} text={app?.donation} />
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className={styles.section}>
          <Typography type="subtitle">People</Typography>
          <table>
            <tbody>
              {app?.people.map((person, i) => (
                <tr key={i}>
                  <td className={styles.personRole}>
                    <Typography type="bodyStrong" padding="horizontal">
                      {person.role}:
                    </Typography>
                  </td>
                  <td>
                    <Typography padding="none">
                      {person.name}
                      {person.email ? (
                        <>
                          {`(`}
                          <BrowserLink url={`mailto:${person.email}`} text={person.email} />
                          {`)`}
                        </>
                      ) : null}
                      {person.website ? (
                        <>
                          {`(`}
                          <BrowserLink url={person.website} text={person.website} />
                          {`)`}
                        </>
                      ) : null}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className={styles.section}>
          <Typography type="subtitle">Meta</Typography>
          <table>
            <tbody>
              <tr>
                <td>
                  <Typography type="bodyStrong" padding="horizontal">
                    Version:
                  </Typography>
                </td>
                <td>{version}</td>
              </tr>
              <tr>
                <td>
                  <Typography type="bodyStrong" padding="horizontal">
                    Categories:
                  </Typography>
                </td>
                <td>{app?.meta.categories.join(', ')}</td>
              </tr>
              <tr>
                <td>
                  <Typography type="bodyStrong" padding="horizontal">
                    Tags:
                  </Typography>
                </td>
                <td>{app?.meta.tags.split('; ').join(', ')}</td>
              </tr>
              <tr>
                <td>
                  <Typography type="bodyStrong" padding="horizontal">
                    License:
                  </Typography>
                </td>
                <td>{app?.license}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </PanelContent>
    </Panel>
  );
}
