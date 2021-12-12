import React, { createContext, useContext, useState } from 'react';
import { ComponentBaseProps, DeviceInfo } from '../models';
import { getDeviceInfo } from '../services/device';

type DeviceContextValue = {
  info: DeviceInfo | null;
  refresh: () => Promise<void>;
};

const defaultValue: DeviceContextValue = {
  info: null,
  refresh: async () => console.log('refresh'),
};

const DeviceContext = createContext<DeviceContextValue>(defaultValue);

type DeviceProviderProps = ComponentBaseProps;

export function DeviceProvider(props: DeviceProviderProps) {
  const [info, setInfo] = useState<DeviceInfo | null>(null);

  async function refresh() {
    const info = await getDeviceInfo().catch((err) => {
      console.error('Failed to get device', err);
      return null;
    });
    setInfo(info);
  }

  return (
    <DeviceContext.Provider
      value={{
        info,
        refresh,
      }}
    >
      {props.children}
    </DeviceContext.Provider>
  );
}

export function useDevice(): DeviceContextValue {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
}
