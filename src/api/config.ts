import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { BaseEntity, IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { IConfigCreateDTO, IConfigDTO, IConfigUpdateDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import { IDeleteResource, IGetOneResourceQuery } from '../types/api';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneConfig: builder.query<IConfigDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.CONFIG}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.CONFIG, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getListConfig: builder.query<
      IGetManyResourceQueryResult<IConfigDTO>,
      IGetManyResourcesQuery<Partial<BaseEntity>>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.CONFIG);
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * provides a general 'CONFIG' tag for the whole list, as well as a specific
       * {type: 'CONFIG', id} tag for each received post object
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) =>
        result.list
          ? [
              { type: RESOURCES.CONFIG, id: 'LIST' },
              ...result.list.map((item) => ({ type: RESOURCES.CONFIG, id: item.id })),
            ]
          : [],
      transformResponse: transformListResponseGeneric,
    }),

    createConfig: builder.mutation<IConfigDTO, IConfigCreateDTO>({
      query: (data) => ({
        url: `/${RESOURCES.CONFIG}`,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      // invalidates the general 'department' tag, to refetch the whole list
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.CONFIG, id: 'LIST' }],
    }),

    updateConfig: builder.mutation<IConfigDTO, IConfigUpdateDTO>({
      query: (data) => ({
        url: `/${RESOURCES.CONFIG}`,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.CONFIG, id: arg.id }],
    }),

    deleteConfig: builder.mutation<IConfigDTO, IDeleteResource>({
      query: (data) => ({
        url: `/${RESOURCES.CONFIG}/${data.id}`,
        method: 'DELETE',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.CONFIG, id: arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateConfigMutation,
  useDeleteConfigMutation,
  useGetListConfigQuery,
  useGetOneConfigQuery,
  useLazyGetListConfigQuery,
  useLazyGetOneConfigQuery,
  useUpdateConfigMutation,
} = api;
