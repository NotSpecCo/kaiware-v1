import React, { useEffect, useState } from 'react';
import { usePanels } from '../contexts/PanelsProvider';
import { StoreCategory } from '../models';
import { getCategories } from '../services/store';
import { Panel, PanelContent, PanelHeader } from '../ui-components/panel';
import { CategoryPanel } from './CategoryPanel';
import { SidebarItem } from './SidebarItem';

type Props = {
  panelId: string;
};

export function CategoryListPanel({ panelId }: Props): JSX.Element {
  const [categories, setCategories] = useState<StoreCategory[]>([]);
  const { addPanel } = usePanels();

  useEffect(() => {
    console.log('catlist eff');

    getCategories().then(setCategories);
  }, [panelId]);

  return (
    <Panel panelId={panelId}>
      <PanelHeader title="Categories"></PanelHeader>
      <PanelContent>
        {categories.map((a) => (
          <SidebarItem
            key={a.id}
            primaryText={a.name}
            onClick={() => {
              addPanel(
                panelId,
                <CategoryPanel key={`cat_${a.id}`} panelId={`cat_${a.id}`} categoryId={a.id} />
              );
            }}
          />
        ))}
      </PanelContent>
    </Panel>
  );
}
