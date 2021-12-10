import React, { createContext, useContext, useEffect, useState } from 'react';
import { ComponentBaseProps } from '../models';

type Panel = {
  id: string;
  closeOnEsc?: boolean;
  element: JSX.Element;
};

type PanelContextValue = {
  panels: Panel[];
  activePanelId: string | undefined;
  setPanels: (panels: Panel[]) => void;
  addPanel: (srcPanelId: string, panel: Panel) => void;
  closePanel: (panelId: string) => void;
};

const defaultValue: PanelContextValue = {
  panels: [],
  activePanelId: undefined,
  setPanels: (panels) => {
    console.log(panels);
  },
  addPanel: (srcPanelId, panel) => {
    console.log(srcPanelId, panel);
  },
  closePanel: () => {
    console.log('close');
  },
};

const PanelContext = createContext<PanelContextValue>(defaultValue);

type PanelsProviderProps = ComponentBaseProps;

export function PanelsProvider(props: PanelsProviderProps): JSX.Element {
  const [panels, setPanels] = useState<Panel[]>([]);
  const activePanelId = panels[panels.length - 1]?.id;

  useEffect(() => {
    const handleKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape' && panels[panels.length - 1]?.closeOnEsc) {
        ev.preventDefault();
        ev.stopPropagation();
        closePanel(panels[panels.length - 1].id);
      }
    };

    document.addEventListener('keydown', handleKey);

    return () => document.removeEventListener('keydown', handleKey);
  }, [panels]);

  function addPanel(srcPanelId: string, panel: Panel) {
    const srcIndex = panels.findIndex((a) => a.id === srcPanelId);
    setPanels([...panels.slice(0, srcIndex + 1), panel]);
  }

  function closePanel(panelId: string) {
    const srcIndex = panels.findIndex((a) => a.id === panelId);
    setPanels(panels.slice(0, srcIndex));
  }

  return (
    <PanelContext.Provider
      value={{
        panels,
        activePanelId,
        setPanels,
        addPanel,
        closePanel,
      }}
    >
      {props.children}
    </PanelContext.Provider>
  );
}

export function usePanels(): PanelContextValue {
  const context = useContext(PanelContext);
  if (context === undefined) {
    throw new Error('usePanels must be used within a PanelsProvider');
  }
  return context;
}
