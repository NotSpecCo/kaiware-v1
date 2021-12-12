import { format } from 'date-fns';
import React from 'react';
import { usePanels } from '../contexts/PanelsProvider';
import { DeviceApp } from '../models';
import { BrowserLink } from '../ui-components/BrowserLink';
import { Panel, PanelContent, PanelHeader } from '../ui-components/panel';
import { Typography } from '../ui-components/Typography';
import styles from './InstalledAppPanel.module.css';

type Props = {
  panelId: string;
  app: DeviceApp;
};

export function InstalledAppPanel({ panelId, app }: Props): JSX.Element {
  const { closePanel } = usePanels();

  return (
    <Panel panelId={panelId}>
      <PanelHeader
        title={app?.name}
        showCloseButton={true}
        onClose={() => closePanel(panelId)}
      ></PanelHeader>
      <PanelContent className={styles.content}>
        <section className={styles.section}>
          <Typography type="subtitle">Description</Typography>
          <Typography padding="horizontal">{app.manifest.description}</Typography>
        </section>
        <section className={styles.section}>
          <Typography type="subtitle">People</Typography>
          <table>
            <tbody>
              <tr>
                <td>
                  <Typography type="bodyStrong" padding="horizontal">
                    Author:
                  </Typography>
                </td>
                <td>
                  <Typography padding="none">
                    {app.manifest.developer.name}
                    {app.manifest.developer.url ? (
                      <>
                        {` (`}
                        <BrowserLink
                          url={app.manifest.developer.url}
                          text={app.manifest.developer.url}
                        />
                        {`)`}
                      </>
                    ) : null}
                  </Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className={styles.section}>
          <Typography type="subtitle">Permissions</Typography>
          {app.manifest.permissions ? (
            <table>
              <tbody>
                {Object.keys(app.manifest.permissions).map((key, i, arr) => (
                  <tr key={key}>
                    <td>
                      <Typography type="bodyStrong" padding="horizontal">
                        {key}:
                      </Typography>
                    </td>
                    <td>
                      <Typography padding="none">
                        {app.manifest.permissions[key].description || 'No description'}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Typography>No permissions</Typography>
          )}
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
                <td>{app.manifest.version}</td>
              </tr>
              <tr>
                <td>
                  <Typography type="bodyStrong" padding="horizontal">
                    Installed at:
                  </Typography>
                </td>
                <td>{format(app.installTime, 'MMMM do yyyy p')}</td>
              </tr>
              <tr>
                <td>
                  <Typography type="bodyStrong" padding="horizontal">
                    Type:
                  </Typography>
                </td>
                <td>{app.manifest.type}</td>
              </tr>
              <tr>
                <td>
                  <Typography type="bodyStrong" padding="horizontal">
                    Kind:
                  </Typography>
                </td>
                <td>{app.kind}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </PanelContent>
    </Panel>
  );
}
