import React, { createContext, useContext, useState } from 'react';
import { ComponentBaseProps, Settings, Theme } from '../models';
import { getStorageItem, setStorageItem, StorageKey } from '../utils/storage';

const defaultSettings: Settings = {
  theme: Theme.Dark,
};

type SettingsContextValue = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

const defaultValue: SettingsContextValue = {
  settings: defaultSettings,
  setSettings: (settings) => {
    console.log('default', settings);
  },
};

const SettingsContext = createContext<SettingsContextValue>(defaultValue);

type SettingsProviderProps = ComponentBaseProps;

export function SettingsProvider(props: SettingsProviderProps) {
  const [settings, setSettingsInternal] = useState<Settings>({
    ...defaultSettings,
    ...getStorageItem<Settings>(StorageKey.Settings),
  });

  function setSettings(val: Settings): void {
    setStorageItem<Settings>(StorageKey.Settings, val);
    setSettingsInternal(val);
  }

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
