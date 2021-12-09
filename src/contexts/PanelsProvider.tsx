import React, { createContext, useContext, useState } from 'react';
import { ComponentBaseProps } from '../models';

type PanelContextValue = {
  panels: JSX.Element[];
  setPanels: (panels: JSX.Element[]) => void;
  addPanel: (srcPanelId: string, panel: JSX.Element) => void;
  closePanel: (panelId: string) => void;
};

const defaultValue: PanelContextValue = {
  panels: [],
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
  const [panels, setPanels] = useState<JSX.Element[]>([]);

  function addPanel(srcPanelId: string, panel: JSX.Element) {
    const srcIndex = panels.findIndex((a) => a.props.panelId === srcPanelId);
    setPanels([...panels.slice(0, srcIndex + 1), panel]);
  }

  function closePanel(panelId: string) {
    const srcIndex = panels.findIndex((a) => a.props.panelId === panelId);
    setPanels(panels.slice(0, srcIndex));
  }

  return (
    <PanelContext.Provider
      value={{
        panels,
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
