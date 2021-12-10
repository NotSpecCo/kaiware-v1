import React from 'react';
import { useSettings } from '../contexts/SettingsProvider';
import { TextSize, Theme } from '../models';
import { themes } from '../themes';
import { ColorInput } from '../ui-components/ColorInput';
import { Panel, PanelContent, PanelHeader } from '../ui-components/panel';
import { Select } from '../ui-components/Select';
import { Typography } from '../ui-components/Typography';
import styles from './SettingsPanel.module.css';
import { SettingsRow } from './SettingsRow';

type Props = {
  panelId: string;
};

export function SettingsPanel({ panelId }: Props): JSX.Element {
  const { settings, setSetting, setSettings } = useSettings();

  return (
    <Panel panelId={panelId}>
      <PanelHeader title="Settings" />
      <PanelContent>
        <section className={styles.section}>
          <Typography type="title">Display</Typography>
          <SettingsRow title="Text Size">
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
          </SettingsRow>
        </section>
        <section className={styles.section}>
          <Typography type="title">Theme</Typography>
          <SettingsRow title="Base Theme">
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
              onChange={(val: Theme) => {
                const theme = themes.find((a) => a.id === val) || themes[0];
                setSettings({
                  theme: val,
                  accentColor: theme.values.appAccentColor,
                });
              }}
            />
          </SettingsRow>
          <SettingsRow title="Accent Color">
            <ColorInput
              value={settings.accentColor}
              onChange={(val) => setSetting('accentColor', val)}
            />
          </SettingsRow>
          <SettingsRow
            title="Accent Text Color"
            description="The color of text displayed on top of accent color"
          >
            <Select
              value={settings.accentTextColor}
              options={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
              ]}
              onChange={(val: string) => setSetting('accentTextColor', val)}
            />
          </SettingsRow>
        </section>
      </PanelContent>
    </Panel>
  );
}
