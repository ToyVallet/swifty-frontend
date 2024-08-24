'use client';

import type { PropsWithChildren } from 'react';
import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

import { createModelStore } from './model-store';
import { type ModleStore } from './model-store';

export type ModelStoreApi = ReturnType<typeof createModelStore>;

export const ModelStoreContext = createContext<ModelStoreApi | null>(null);

export function ModelStoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<ModelStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createModelStore();
  }

  return (
    <ModelStoreContext.Provider value={storeRef.current}>
      {children}
    </ModelStoreContext.Provider>
  );
}

export const useModelStore = <T,>(selector: (store: ModleStore) => T): T => {
  const modelStoreContext = useContext(ModelStoreContext);

  if (!modelStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(modelStoreContext, selector);
};
