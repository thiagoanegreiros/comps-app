import { LocalStorageHandler } from '../../../core/storage/localStorageHandler';
import type { StorageTypes } from '../../../core/storage/types';

describe('LocalStorageHandler (typed)', () => {
  let handler: LocalStorageHandler<StorageTypes>;

  beforeEach(() => {
    handler = new LocalStorageHandler<StorageTypes>();
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should handle polling when key does not exist in localStorage', () => {
    const callback = jest.fn();
    handler.subscribe('user', callback);
    handler.startPolling(500);

    localStorage.removeItem('user');

    jest.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledWith(null);
  });

  it('should set and get user item correctly', () => {
    const user = { name: 'John', age: 30 };
    handler.setItem('user', user);
    const result = handler.getItem('user');
    expect(result).toEqual(user);
  });

  it('should set and get settings item correctly', () => {
    const settings = { darkMode: true };
    handler.setItem('settings', settings);
    const result = handler.getItem('settings');
    expect(result).toEqual(settings);
  });

  it('should set and get token item correctly', () => {
    handler.setItem('token', 'abcdef');
    const result = handler.getItem('token');
    expect(result).toBe('abcdef');
  });

  it('should remove item correctly', () => {
    handler.setItem('token', 'abcdef');
    handler.removeItem('token');
    const result = handler.getItem('token');
    expect(result).toBeNull();
  });

  it('should call subscribers when item is set', () => {
    const callback = jest.fn();
    handler.subscribe('token', callback);
    handler.setItem('token', 'secret');
    expect(callback).toHaveBeenCalledWith('secret');
  });

  it('should call subscribers with null when item is removed', () => {
    const callback = jest.fn();
    handler.subscribe('settings', callback);
    handler.removeItem('settings');
    expect(callback).toHaveBeenCalledWith(null);
  });

  it('should unsubscribe correctly', () => {
    const callback = jest.fn();
    const unsubscribe = handler.subscribe('token', callback);
    unsubscribe();
    handler.setItem('token', 'test');
    expect(callback).not.toHaveBeenCalled();
  });

  it('should detect external changes via polling', () => {
    const callback = jest.fn();
    handler.subscribe('user', callback);
    handler.startPolling(500);

    const externalUser = { name: 'Jane', age: 25 };
    localStorage.setItem('user', JSON.stringify(externalUser));

    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledWith(externalUser);
  });

  it('should not call subscribers if value did not change during polling', () => {
    const callback = jest.fn();
    const user = { name: 'Alice', age: 40 };

    handler.setItem('user', user);
    handler.subscribe('user', callback);
    handler.startPolling(500);

    jest.advanceTimersByTime(500);
    callback.mockClear();

    localStorage.setItem('user', JSON.stringify(user));
    jest.advanceTimersByTime(500);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle multiple subscribers', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    handler.subscribe('settings', callback1);
    handler.subscribe('settings', callback2);
    handler.setItem('settings', { darkMode: true });

    expect(callback1).toHaveBeenCalledWith({ darkMode: true });
    expect(callback2).toHaveBeenCalledWith({ darkMode: true });
  });
});
