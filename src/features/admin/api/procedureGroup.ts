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
  IProcedureGroupDTO,
  ISearchProcedureGroupFilter,
  IProcedureGroupDTOCreate,
  IProcedureGroupDTOUpdate,
  IProcedureGroupDTODelete,
} from '@/types/dto';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneProcedureGroup: builder.query<IProcedureGroupDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.PROCEDURE_GROUP}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.PROCEDURE_GROUP, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getListProcedureGroup: builder.query<
      IGetManyResourceQueryResult<IProcedureGroupDTO>,
      IGetManyResourcesQuery<ISearchProcedureGroupFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, 'procedureGroup');
        return request;
      },
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.PROCEDURE_GROUP, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.PROCEDURE_GROUP, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    createProcedureGroup: builder.mutation<IProcedureGroupDTO, IProcedureGroupDTOCreate>({
      query: (data) => ({
        url: RESOURCES.PROCEDURE_GROUP,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.PROCEDURE_GROUP, id: 'LIST' }],
    }),
    updateProcedureGroup: builder.mutation<IProcedureGroupDTO, IProcedureGroupDTOUpdate>({
      query: (data) => ({
        url: RESOURCES.PROCEDURE_GROUP,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.PROCEDURE_GROUP, id: arg.id }],
    }),
    deleteProcedureGroup: builder.mutation<IProcedureGroupDTO, IProcedureGroupDTODelete>({
      query: (data) => ({
        url: `${RESOURCES.PROCEDURE_GROUP}/${data?.id}`,
        method: 'DELETE',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.PROCEDURE_GROUP, id: arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetListProcedureGroupQuery,
  useGetOneProcedureGroupQuery,
  useCreateProcedureGroupMutation,
  useDeleteProcedureGroupMutation,
  useUpdateProcedureGroupMutation,
} = api;
