import React, { useEffect } from 'react';
import { DevicePanel } from '../components/DevicePanel';
import { usePanels } from '../contexts/PanelsProvider';
import { View } from '../ui-components/view';

export function Device(): JSX.Element {
  const { panels, setPanels } = usePanels();

  useEffect(() => {
    setPanels([{ id: 'device', element: <DevicePanel key="device" panelId="device" /> }]);
  }, []);

  return <View>{panels.map((a) => a.element)}</View>;
}
