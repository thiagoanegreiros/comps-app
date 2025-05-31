import { renderHook, act } from '@testing-library/react';
import { useDialog } from '../../hooks/useDialog';

describe('useDialog hook', () => {
  it('should initialize with isOpen = false', () => {
    const { result } = renderHook(() => useDialog());
    expect(result.current.isOpen).toBe(false);
  });

  it('should open dialog when open() is called', () => {
    const { result } = renderHook(() => useDialog());

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('should close dialog when close() is called', () => {
    const { result } = renderHook(() => useDialog());

    act(() => {
      result.current.open();
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should toggle correctly multiple times', () => {
    const { result } = renderHook(() => useDialog());

    act(() => {
      result.current.open();
      result.current.close();
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
  });
});
