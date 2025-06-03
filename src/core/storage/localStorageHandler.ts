import type { Callback, StorageTypes } from './types';

export class LocalStorageHandler<T extends StorageTypes> {
  private subscribers: {
    [K in keyof T]?: Set<Callback<T[K]>>;
  } = {};

  private previousValues: Map<keyof T, string | null> = new Map();

  setItem<K extends keyof T>(key: K, value: T[K]): void {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key as string, serialized);
    this.notifySubscribers(key, value);
  }

  getItem<K extends keyof T>(key: K): T[K] | null {
    const raw = localStorage.getItem(key as string);
    return raw ? (JSON.parse(raw) as T[K]) : null;
  }

  removeItem<K extends keyof T>(key: K): void {
    localStorage.removeItem(key as string);
    this.notifySubscribers(key, null);
  }

  subscribe<K extends keyof T>(key: K, callback: Callback<T[K]>): () => void {
    if (!this.subscribers[key]) {
      this.subscribers[key] = new Set();
    }
    this.subscribers[key]!.add(callback);

    return () => {
      this.subscribers[key]?.delete(callback);
    };
  }

  private notifySubscribers<K extends keyof T>(
    key: K,
    value: T[K] | null,
  ): void {
    const subs = this.subscribers[key];
    subs?.forEach(cb => cb(value));
  }

  startPolling(interval: number = 500): void {
    setInterval(() => {
      (Object.keys(this.subscribers) as (keyof T)[]).forEach(key => {
        const rawValue = localStorage.getItem(key as string);
        const prevValue = this.previousValues.get(key);

        if (prevValue !== rawValue) {
          this.previousValues.set(key, rawValue);
          const parsed = rawValue ? JSON.parse(rawValue) : null;
          this.notifySubscribers(key, parsed);
        }
      });
    }, interval);
  }
}

export const storage = new LocalStorageHandler<StorageTypes>();
