import React, { useEffect } from 'react';
import { SearchPanel } from '../components/SearchPanel';
import { usePanels } from '../contexts/PanelsProvider';
import { View } from '../ui-components/view';

export function Search(): JSX.Element {
  const { panels, setPanels } = usePanels();

  useEffect(() => {
    setPanels([{ id: 'search', element: <SearchPanel key="search" panelId="search" /> }]);

    return () => setPanels([]);
  }, []);

  return <View>{panels.map((a) => a.element)}</View>;
}
