import React from 'react';
import { useSettings } from '../contexts/SettingsProvider';
import { TextSize, Theme } from '../models';
import { Panel, PanelContent, PanelHeader } from '../ui-components/panel';
import { Select } from '../ui-components/Select';
import { Typography } from '../ui-components/Typography';
import styles from './SettingsPanel.module.css';

type Props = {
  panelId: string;
};

export function SettingsPanel({ panelId }: Props): JSX.Element {
  const { settings, setSetting } = useSettings();

  return (
    <Panel panelId={panelId}>
      <PanelHeader title="Settings" showCloseButton={false} />
      <PanelContent>
        <div className={styles.row}>
          <Typography type="bodyLarge" padding="none">
            Theme
          </Typography>
          <Select
            value={settings.theme}
            options={[
              { value: Theme.Light, label: 'Light' },
              { value: Theme.Warm, label: 'Warm' },
              { value: Theme.Blue, label: 'Blue' },
              { value: Theme.Dark, label: 'Dark' },
              { value: Theme.Darker, label: 'Darker' },
              { value: Theme.Darkest, label: 'Darkest' },
            ]}
            onChange={(val: Theme) => setSetting('theme', val)}
          />
        </div>
        <div className={styles.row}>
          <Typography type="bodyLarge" padding="none">
            Text Size
          </Typography>
          <Select
            value={settings.textSize}
            options={[
              { value: TextSize.Smallest, label: 'Smallest' },
              { value: TextSize.Small, label: 'Small' },
              { value: TextSize.Medium, label: 'Medium' },
              { value: TextSize.Large, label: 'Large' },
              { value: TextSize.Largest, label: 'Largest' },
            ]}
            onChange={(val: TextSize) => setSetting('textSize', val)}
          />
        </div>
      </PanelContent>
    </Panel>
  );
}
