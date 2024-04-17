import { IGetManyResourceQueryResult } from '@/types';

export const getListMockResources = <T>(
  generator: () => T,
  numRecords: number,
): IGetManyResourceQueryResult<T> => {
  const res: T[] = [];
  for (let i = 0; i < numRecords; ++i) {
    res.push(generator());
  }
  return {
    list: res,
    meta: {
      totalRecords: numRecords,
    },
  };
};
