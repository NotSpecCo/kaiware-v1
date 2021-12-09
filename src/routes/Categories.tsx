import React, { useEffect } from 'react';
import { CategoryListPanel } from '../components/CategoryListPanel';
import { usePanels } from '../contexts/PanelsProvider';
import { View } from '../ui-components/view';

export function Categories(): JSX.Element {
  const { panels, setPanels } = usePanels();

  useEffect(() => {
    setPanels([<CategoryListPanel key="catList" panelId="catList" />]);

    return () => setPanels([]);
  }, []);

  return <View>{panels}</View>;
}
