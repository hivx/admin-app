import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { BaseEntity, IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { IUserActivityType } from '@/types/dto/userActivity';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListUserActivityType: builder.query<
      IGetManyResourceQueryResult<IUserActivityType>,
      IGetManyResourcesQuery<{ id?: BaseEntity }>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.USER_ACTIVITY_TYPE);
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.USER_ACTIVITY_TYPE },
        ...result.list.map((item) => ({
          type: RESOURCES.USER_ACTIVITY_TYPE,
          id: item.id,
        })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

export const { useLazyGetListUserActivityTypeQuery, useGetListUserActivityTypeQuery } =
  api;
