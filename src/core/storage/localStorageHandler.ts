type Callback<T> = (value: T | null) => void;

export class LocalStorageHandler {
  private subscribers: Map<string, Set<Callback<unknown>>> = new Map();
  private previousValues: Map<string, string | null> = new Map();

  setItem<T>(key: string, value: T): void {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    this.notifySubscribers(key, value);
  }

  getItem<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
    this.notifySubscribers(key, null);
  }

  subscribe<T>(key: string, callback: Callback<T>): () => void {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    this.subscribers.get(key)!.add(callback as Callback<unknown>);

    return () => {
      this.subscribers.get(key)!.delete(callback as Callback<unknown>);
    };
  }

  private notifySubscribers<T>(key: string, value: T | null): void {
    const subs = this.subscribers.get(key);
    subs?.forEach((cb) => (cb as Callback<T>)(value));
  }

  startPolling(interval: number = 500): void {
    setInterval(() => {
      for (const [key] of this.subscribers) {
        const rawValue = localStorage.getItem(key);
        const prevValue = this.previousValues.get(key);

        if (prevValue !== rawValue) {
          this.previousValues.set(key, rawValue);
          const parsed = rawValue ? JSON.parse(rawValue) : null;
          this.notifySubscribers(key, parsed);
        }
      }
    }, interval);
  }
}

export const storage = new LocalStorageHandler();
