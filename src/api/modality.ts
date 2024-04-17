import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import {
  IModalityDTO,
  ISearchModalityFilter,
  IModalityDTOCreate,
  IModalityDTOUpdate,
} from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import { IDeleteResource, IGetOneResourceQuery } from '../types/api';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneModality: builder.query<IModalityDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.MODALITY}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.MODALITY, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getListModality: builder.query<
      IGetManyResourceQueryResult<IModalityDTO>,
      IGetManyResourcesQuery<ISearchModalityFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.MODALITY);
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * provides a general 'modality' tag for the whole list, as well as a specific
       * {type: 'modality', id} tag for each received post object
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) =>
        result.list
          ? [
              { type: RESOURCES.MODALITY, id: 'LIST' },
              ...result.list.map((item) => ({ type: RESOURCES.MODALITY, id: item.id })),
            ]
          : [],
      transformResponse: transformListResponseGeneric,
    }),

    createModality: builder.mutation<IModalityDTO, IModalityDTOCreate>({
      query: (data) => ({
        url: `/${RESOURCES.MODALITY}`,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      // invalidates the general 'department' tag, to refetch the whole list
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.MODALITY, id: 'LIST' }],
    }),

    updateModality: builder.mutation<IModalityDTO, IModalityDTOUpdate>({
      query: (data) => ({
        url: `/${RESOURCES.MODALITY}`,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.MODALITY, id: arg.id }],
    }),

    deleteModality: builder.mutation<IModalityDTO, IDeleteResource>({
      query: (data) => ({
        url: `/${RESOURCES.MODALITY}/${data.id}`,
        method: 'DELETE',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.MODALITY, id: arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetOneModalityQuery,
  useLazyGetOneModalityQuery,
  useGetListModalityQuery,
  useLazyGetListModalityQuery,
  useCreateModalityMutation,
  useUpdateModalityMutation,
  useDeleteModalityMutation,
} = api;
