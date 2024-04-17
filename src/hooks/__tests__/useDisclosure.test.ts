import { renderHook } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import { describe, test } from 'vitest';

import { useDisclosure } from '../useDisclosure';

describe('Correct path', () => {
  test('should open the state', () => {
    const { result } = renderHook(() => useDisclosure());

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
  });

  test('should close the state', () => {
    const { result } = renderHook(() => useDisclosure());

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });

  test('should toggle the state', () => {
    const { result } = renderHook(() => useDisclosure());

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(false);
  });

  test('should define initial state', () => {
    const { result } = renderHook(() => useDisclosure(true));

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(false);
  });
});
