import React, { useEffect } from 'react';
import { SettingsPanel } from '../components/SettingsPanel';
import { usePanels } from '../contexts/PanelsProvider';
import { View } from '../ui-components/view';

export function AppSettings(): JSX.Element {
  const { panels, setPanels } = usePanels();

  useEffect(() => {
    setPanels([{ id: 'settings', element: <SettingsPanel key="settings" panelId="settings" /> }]);
  }, []);

  return <View>{panels.map((a) => a.element)}</View>;
}
