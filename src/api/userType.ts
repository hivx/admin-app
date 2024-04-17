import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { IUserTypeDTO, IUserTypeDTOFilter } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListUserType: builder.query<
      IGetManyResourceQueryResult<IUserTypeDTO>,
      IGetManyResourcesQuery<IUserTypeDTOFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, 'userType');
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       *
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.USER_TYPE },
        ...result.list.map((item) => ({ type: RESOURCES.USER_TYPE, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

export const { useGetListUserTypeQuery, useLazyGetListUserTypeQuery } = api;
