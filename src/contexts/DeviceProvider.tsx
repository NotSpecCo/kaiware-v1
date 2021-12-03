import React, { createContext, useContext, useState } from 'react';
import { ComponentBaseProps } from '../models';
// import { Device } from '../device';

type DeviceContextValue = {
  device?: any;
  connect: () => void;
  disconnect: () => void;
};

const defaultValue: DeviceContextValue = {
  device: undefined,
  connect: () => {
    console.log('connect');
  },
  disconnect: () => {
    console.log('connect');
  },
};

const DeviceContext = createContext<DeviceContextValue>(defaultValue);

type DeviceProviderProps = ComponentBaseProps;

export function DeviceProvider(props: DeviceProviderProps) {
  const [device, setDevice] = useState<any>();

  async function connect() {
    if (device) {
      console.log('already connected');
      return;
    }

    console.log('connect');
  }

  function disconnect() {
    if (!device) {
      console.log('no device to disconnect');
      return;
    }

    console.log('disconnect');
  }

  return (
    <DeviceContext.Provider
      value={{
        device,
        connect,
        disconnect,
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
