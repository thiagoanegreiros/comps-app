import { useState, useEffect } from 'react';
import { storage } from '../core/storage/localStorageHandler';
import type { StorageTypes } from '../core/storage/types';

export function useStorage<K extends keyof StorageTypes>(
  key: K,
  initialValue: StorageTypes[K] | null = null,
): [StorageTypes[K] | null, (value: StorageTypes[K]) => void, () => void] {
  const [value, setValue] = useState<StorageTypes[K] | null>(() => {
    const stored = storage.getItem(key);
    return stored ?? initialValue;
  });

  useEffect(() => {
    const unsubscribe = storage.subscribe(key, setValue);
    return () => unsubscribe();
  }, [key]);

  const setStoredValue = (newValue: StorageTypes[K]) => {
    storage.setItem(key, newValue);
  };

  const removeStoredValue = () => {
    storage.removeItem(key);
  };

  return [value, setStoredValue, removeStoredValue];
}
