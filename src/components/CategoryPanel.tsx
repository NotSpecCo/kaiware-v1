import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { usePanels } from '../contexts/PanelsProvider';
import { StoreApp, StoreCategory } from '../models';
import { getAppsByCategory, getCategories } from '../services/store';
import { IconButton } from '../ui-components/IconButton';
import { Panel, PanelContent, PanelFooter, PanelHeader } from '../ui-components/panel';
import { IconSize } from '../ui-components/SvgIcon';
import { AppPanel } from './AppPanel';
import { AppRow } from './AppRow';
import styles from './CategoryPanel.module.css';

type Props = {
  panelId: string;
  categoryId: string;
};

export function CategoryPanel({ panelId, categoryId }: Props): JSX.Element {
  const [category, setCategory] = useState<StoreCategory>();
  const [data, setData] = useState<{
    category: StoreCategory;
    apps: StoreApp[];
    fetchedAt: number;
  }>();
  const { addPanel } = usePanels();

  useEffect(() => {
    getCategories().then((res) => setCategory(res.find((a) => a.id === categoryId)));
    getAppsByCategory(categoryId).then(setData);
  }, [categoryId]);

  async function getApps(forceRefresh = false) {
    setData(await getAppsByCategory(categoryId, { forceRefresh }));
  }

  return (
    <Panel panelId={panelId}>
      <PanelHeader title={category?.name} />
      <PanelContent>
        {data?.apps.map((app) => (
          <AppRow
            key={app.slug}
            appId={app.slug}
            iconUrl={app.icon}
            name={app.name}
            author={app.author?.[0]}
            description={app.description}
            downloadUrl={app.download.url}
            showInstallBtn={true}
            onClick={() => {
              addPanel(
                panelId,
                <AppPanel key={`app_${app.slug}`} panelId={`app_${app.slug}`} appSlug={app.slug} />
              );
            }}
          />
        ))}
      </PanelContent>
      <PanelFooter className={styles.footer}>
        {data === undefined ? 'Loading...' : `Updated ${format(data.fetchedAt, 'MMMM do p')}`}
        <IconButton
          className={styles.btnRefresh}
          icon="refresh"
          animation="spin"
          size={IconSize.Small}
          onClick={() => getApps(true)}
        />
      </PanelFooter>
    </Panel>
  );
}
