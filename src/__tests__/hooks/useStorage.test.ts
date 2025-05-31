import { renderHook, act } from '@testing-library/react';
import { useStorage } from '../../hooks/useStorage';
import { storage } from '../../core/storage/localStorageHandler';

describe('useStorage hook', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should return initial value when storage is empty', () => {
    const { result } = renderHook(() => useStorage('token', 'initial-token'));

    const [value] = result.current;
    expect(value).toBe('initial-token');
  });

  it('should return null when no initialValue is provided and storage is empty', () => {
    const { result } = renderHook(() => useStorage('token'));

    const [value] = result.current;
    expect(value).toBeNull();
  });

  it('should read existing value from localStorage', () => {
    localStorage.setItem('token', JSON.stringify('stored-token'));

    const { result } = renderHook(() => useStorage('token', 'initial-token'));

    const [value] = result.current;
    expect(value).toBe('stored-token');
  });

  it('should update value and write to storage', () => {
    const { result } = renderHook(() => useStorage('token', 'initial-token'));

    const [, setValue] = result.current;

    act(() => {
      setValue('new-token');
    });

    const [value] = result.current;
    expect(value).toBe('new-token');

    const stored = JSON.parse(localStorage.getItem('token')!);
    expect(stored).toBe('new-token');
  });

  it('should remove value from storage', () => {
    const { result } = renderHook(() => useStorage('token', 'initial-token'));

    const [, setValue, remove] = result.current;

    act(() => {
      setValue('new-token');
    });

    act(() => {
      remove();
    });

    const [value] = result.current;
    expect(value).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should react to external storage changes (via polling)', () => {
    storage.startPolling(500);

    const { result } = renderHook(() => useStorage('token', 'initial-token'));

    act(() => {
      localStorage.setItem('token', JSON.stringify('external-token'));
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    const [value] = result.current;
    expect(value).toBe('external-token');
  });
});
