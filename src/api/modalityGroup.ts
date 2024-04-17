import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import {
  IGetManyResourceQueryResult,
  IGetManyResourcesQuery,
  IGetOneResourceQuery,
} from '@/types';
import {
  IModalityGroupDTO,
  IModalityGroupDTOCreate,
  IModalityGroupDTODelete,
  IModalityGroupDTOUpdate,
  ISearchModalityGroupFilter,
} from '@/types/dto';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneModalityGroup: builder.query<IModalityGroupDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.MODALITY_GROUP}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.MODALITY_GROUP, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getListModalityGroup: builder.query<
      IGetManyResourceQueryResult<IModalityGroupDTO>,
      IGetManyResourcesQuery<ISearchModalityGroupFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.MODALITY_GROUP);
        return request;
      },
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.MODALITY_GROUP, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.MODALITY_GROUP, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    createModalityGroup: builder.mutation<IModalityGroupDTO, IModalityGroupDTOCreate>({
      query: (data) => ({
        url: RESOURCES.MODALITY_GROUP,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.MODALITY_GROUP, id: 'LIST' }],
    }),
    updateModalityGroup: builder.mutation<IModalityGroupDTO, IModalityGroupDTOUpdate>({
      query: (data) => ({
        url: RESOURCES.MODALITY_GROUP,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * invalidates the specific {type: 'modalityGroup', id} tag.
       * This will force a refetch of both the individual modalityGroup object from getOneModalityGroup(not implemented),
       * as well as the entire list of modalityGroups from getListmodalityGroups, because they both provide a tag that matches that {type, id} value.
       * If request resulted in error, don't invalidate anything
       */
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.MODALITY_GROUP, id: arg.id }],
    }),
    deleteModalityGroup: builder.mutation<IModalityGroupDTO, IModalityGroupDTODelete>({
      query: (data) => ({
        url: `/${RESOURCES.MODALITY_GROUP}/${data?.id}`,
        method: 'DELETE',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * invalidates the specific {type: 'modalityGroup', id} tag.
       * This will force a refetch of both the individual modalityGroup object from getOneModalityGroup(not implemented),
       * as well as the entire list of modalityGroups from getListmodalityGroups, because they both provide a tag that matches that {type, id} value.
       * If request resulted in error, don't invalidate anything
       */
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.MODALITY_GROUP, id: arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetListModalityGroupQuery,
  useLazyGetListModalityGroupQuery,
  useGetOneModalityGroupQuery,
  useCreateModalityGroupMutation,
  useUpdateModalityGroupMutation,
  useDeleteModalityGroupMutation,
} = api;
