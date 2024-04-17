import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { ISearchUserActivityFilter, IUserActivityDTO } from '@/types/dto/userActivity';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListUserActivity: builder.query<
      IGetManyResourceQueryResult<IUserActivityDTO>,
      IGetManyResourcesQuery<ISearchUserActivityFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.USER_ACTIVITY);
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.USER_ACTIVITY },
        ...result.list.map((item) => ({
          type: RESOURCES.USER_ACTIVITY,
          id: item.id,
        })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

export const { useGetListUserActivityQuery, useLazyGetListUserActivityQuery } = api;
