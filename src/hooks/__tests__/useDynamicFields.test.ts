import { act, renderHook } from '@testing-library/react';
import { describe, test } from 'vitest';

import useDynamicFields from '../useDynamicFields';

describe('Correct path', () => {
  const mock = {
    fieldNames: ['testOne', 'testTwo', 'testThree'],
    numFilters: 1,
  };

  test('should result in useDynamicFields', () => {
    const { result } = renderHook(() => useDynamicFields(mock));

    const expectTest = [
      {
        defaultName: 'testOne',
        menuItems: [{ value: 'testOne' }, { value: 'testTwo' }, { value: 'testThree' }],
        onChange: result.current[0].onChange,
      },
    ];

    expect(result.current).toStrictEqual(expectTest);
  });

  test('should result two fields', () => {
    const initialMock = { ...mock, numFilters: 2 };
    const { result } = renderHook(() => useDynamicFields(initialMock));

    const expectTest = [
      {
        defaultName: 'testOne',
        menuItems: [{ value: 'testOne' }, { value: 'testThree' }],
        onChange: result.current[0].onChange,
      },
      {
        defaultName: 'testTwo',
        menuItems: [{ value: 'testTwo' }, { value: 'testThree' }],
        onChange: result.current[1].onChange,
      },
    ];

    expect(result.current).toStrictEqual(expectTest);
  });

  test('should params numFilters is zero', () => {
    const initialMock = { ...mock, numFilters: 0 };
    const { result } = renderHook(() => useDynamicFields(initialMock));

    expect(result.current).toStrictEqual([]);
  });

  test('should params excludedFields is empty', () => {
    const initialMock = { ...mock, excludedFields: [] };
    const { result } = renderHook(() => useDynamicFields(initialMock));

    const expectTest = [
      {
        defaultName: 'testOne',
        menuItems: [{ value: 'testOne' }, { value: 'testTwo' }, { value: 'testThree' }],
        onChange: result.current[0].onChange,
      },
    ];

    expect(result.current).toStrictEqual(expectTest);
  });

  test('should params fieldNames is empty', () => {
    const initialMock = { ...mock, fieldNames: [] };
    const { result } = renderHook(() => useDynamicFields(initialMock));

    expect(result.current).toStrictEqual([]);
  });

  test('should params default field names is exist', () => {
    const initialMock = { ...mock, defaultFieldNames: ['testThree'] };
    const { result } = renderHook(() => useDynamicFields(initialMock));

    const expectTest = [
      {
        defaultName: 'testThree',
        menuItems: [{ value: 'testThree' }, { value: 'testOne' }, { value: 'testTwo' }],
        onChange: result.current[0].onChange,
      },
    ];

    expect(result.current).toStrictEqual(expectTest);
  });

  test('should onChange value', () => {
    const { result } = renderHook(() => useDynamicFields(mock));

    expect(result.current[0].defaultName).toBe('testOne');

    act(() => {
      result.current[0].onChange && result.current[0].onChange('testThree');
    });

    setTimeout(() => {
      expect(result.current[0].defaultName).toBe('testThree');
    }, 100);
  });

  test('should render fieldNames', () => {
    const initialMock = {
      ...mock,
      fieldNames: [
        'testFour',
        'testFive',
        'testSix',
        'testSeven',
        'testEight',
        'testNine',
      ],
    };
    const { result } = renderHook(() => useDynamicFields(initialMock));

    const expectTest = [
      {
        defaultName: 'testFour',
        menuItems: [
          { value: 'testFour' },
          { value: 'testFive' },
          { value: 'testSix' },
          { value: 'testSeven' },
          { value: 'testEight' },
          { value: 'testNine' },
        ],
        onChange: result.current[0].onChange,
      },
    ];

    expect(result.current).toStrictEqual(expectTest);
  });
});
