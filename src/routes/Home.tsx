import React, { useEffect } from 'react';
import { InstallPanel } from '../components/InstallPanel';
import { usePanels } from '../contexts/PanelsProvider';
import { View } from '../ui-components/view';

export function Home(): JSX.Element {
  const { panels, setPanels } = usePanels();

  useEffect(() => {
    setPanels([
      { id: 'installZip', element: <InstallPanel key="installZip" panelId="installZip" /> },
    ]);
  }, []);

  return <View>{panels.map((a) => a.element)}</View>;
}
