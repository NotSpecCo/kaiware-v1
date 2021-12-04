import React from 'react';
import { useSettings } from '../contexts/SettingsProvider';
import { Theme } from '../models';
import { Select } from '../ui-components/Select';
import { Typography } from '../ui-components/Typography';
import { View, ViewContent, ViewHeader } from '../ui-components/view';
import styles from './AppSettings.module.css';

export function AppSettings(): JSX.Element {
  const { settings, setSetting } = useSettings();

  return (
    <View>
      <ViewHeader>
        <Typography type="titleLarge" padding="none">
          Settings
        </Typography>
      </ViewHeader>
      <ViewContent>
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
      </ViewContent>
    </View>
  );
}
