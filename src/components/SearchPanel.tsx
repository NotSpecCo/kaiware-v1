import React, { useState } from 'react';
import { usePanels } from '../contexts/PanelsProvider';
import { StoreApp } from '../models';
import { searchApps } from '../services/store';
import { IconButton } from '../ui-components/IconButton';
import { Input } from '../ui-components/Input';
import { Panel, PanelContent, PanelHeader } from '../ui-components/panel';
import { Typography } from '../ui-components/Typography';
import { AppPanel } from './AppPanel';
import { AppRow } from './AppRow';
import styles from './SearchPanel.module.css';

type Props = {
  panelId: string;
};

export function SearchPanel({ panelId }: Props): JSX.Element {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<StoreApp[]>();
  const { addPanel } = usePanels();

  async function search() {
    const res = await searchApps(query);

    setResults(res);
  }

  return (
    <Panel panelId={panelId}>
      <PanelHeader title="Search"></PanelHeader>
      <PanelContent>
        <form
          className={styles.form}
          onSubmit={(ev) => {
            ev.preventDefault();
            search();
          }}
        >
          <Input value={query} onInput={(val) => setQuery(val)} />
          <IconButton
            icon="search"
            onClick={() => {
              query.length >= 3 && search();
            }}
          />
        </form>
        {results?.length === 0 && <Typography padding="vertical">No results</Typography>}
        {results?.map((app) => (
          <AppRow
            key={app.slug}
            appId={app.slug}
            iconUrl={app.icon}
            name={app.name}
            author={app.author?.[0]}
            description={app.description}
            downloadUrl={app.download.url}
            showInstallBtn={false}
            onClick={() => {
              addPanel(panelId, {
                id: `app_${app.slug}`,
                closeOnEsc: true,
                element: (
                  <AppPanel
                    key={`app_${app.slug}`}
                    panelId={`app_${app.slug}`}
                    appSlug={app.slug}
                  />
                ),
              });
            }}
          />
        ))}
      </PanelContent>
    </Panel>
  );
}
