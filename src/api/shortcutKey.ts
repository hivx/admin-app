import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { BaseEntity, IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { IShortcutKeyDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListShortcutKey: builder.query<
      IGetManyResourceQueryResult<IShortcutKeyDTO>,
      IGetManyResourcesQuery<Partial<BaseEntity>>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.SHORTCUT_KEY);
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * provides a general 'store' tag for the whole list, as well as a specific
       * {type: 'store', id} tag for each received post object
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) =>
        result.list
          ? [
              { type: RESOURCES.SHORTCUT_KEY, id: 'LIST' },
              ...result.list.map((item) => ({
                type: RESOURCES.SHORTCUT_KEY,
                id: item.id,
              })),
            ]
          : [],
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

export const { useGetListShortcutKeyQuery, useLazyGetListShortcutKeyQuery } = api;
