import type { StorageTypes } from './types';

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];
type Callback<T> = (value: T | null) => void;

export class LocalStorageHandler<Types extends Record<string, JSONValue>> {
  private subscribers: {
    [K in keyof Types]?: Set<Callback<Types[K]>>;
  } = {};

  private previousValues: Map<keyof Types, string | null> = new Map();

  setItem<K extends keyof Types>(key: K, value: Types[K]): void {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key as string, serialized);
    this.notifySubscribers(key, value);
  }

  getItem<K extends keyof Types>(key: K): Types[K] | null {
    const raw = localStorage.getItem(key as string);
    return raw ? (JSON.parse(raw) as Types[K]) : null;
  }

  removeItem<K extends keyof Types>(key: K): void {
    localStorage.removeItem(key as string);
    this.notifySubscribers(key, null);
  }

  subscribe<K extends keyof Types>(
    key: K,
    callback: Callback<Types[K]>,
  ): () => void {
    if (!this.subscribers[key]) {
      this.subscribers[key] = new Set();
    }
    this.subscribers[key]!.add(callback);

    return () => {
      this.subscribers[key]?.delete(callback);
    };
  }

  private notifySubscribers<K extends keyof Types>(
    key: K,
    value: Types[K] | null,
  ): void {
    const subs = this.subscribers[key];
    subs?.forEach(cb => cb(value));
  }

  startPolling(interval: number = 500): void {
    setInterval(() => {
      (Object.keys(this.subscribers) as (keyof Types)[]).forEach(key => {
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
