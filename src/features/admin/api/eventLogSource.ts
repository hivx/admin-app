import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { BaseEntity, IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { RESOURCES } from '@/types/resources';

import { IEventLogSource } from '../types';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListEventLogSource: builder.query<
      IGetManyResourceQueryResult<IEventLogSource>,
      IGetManyResourcesQuery<{ id?: BaseEntity }>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.EVENT_LOG_SOURCE);
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.EVENT_LOG_SOURCE },
        ...result.list.map((item) => ({
          type: RESOURCES.EVENT_LOG_SOURCE,
          id: item.id,
        })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

export const { useGetListEventLogSourceQuery, useLazyGetListEventLogSourceQuery } = api;
