
import { useState, useEffect } from "react";
import { storage } from "../core/storage/localStorageHandler";

export function useStorage<T>(key: string, initialValue: T | null = null): [
  T | null,
  (value: T) => void,
  () => void
] {
  const [value, setValue] = useState<T | null>(() => {
    const stored = storage.getItem<T>(key);
    return stored !== null ? stored : initialValue;
  });

  useEffect(() => {
    const unsubscribe = storage.subscribe<T>(key, setValue);
    return () => unsubscribe();
  }, [key]);

  const setStoredValue = (newValue: T) => {
    storage.setItem<T>(key, newValue);
  };

  const removeStoredValue = () => {
    storage.removeItem(key);
  };

  return [value, setStoredValue, removeStoredValue];
}
