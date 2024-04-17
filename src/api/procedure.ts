import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import {
  IDeleteResource,
  IGetManyResourceQueryResult,
  IGetManyResourcesQuery,
  IGetOneResourceQuery,
} from '@/types';
import {
  IProcedureDTO,
  ISearchProcedureFilter,
  IProcedureDTOCreate,
  IProcedureDTOUpdate,
} from '@/types/dto';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneProcedure: builder.query<IProcedureDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.PROCEDURE}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.PROCEDURE, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getListProcedure: builder.query<
      IGetManyResourceQueryResult<IProcedureDTO>,
      IGetManyResourcesQuery<ISearchProcedureFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.PROCEDURE);
        return request;
      },
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.PROCEDURE, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.PROCEDURE, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    createProcedure: builder.mutation<IProcedureDTO, IProcedureDTOCreate>({
      query: (data) => ({
        url: RESOURCES.PROCEDURE,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.PROCEDURE, id: 'LIST' }],
    }),
    updateProcedure: builder.mutation<IProcedureDTO, IProcedureDTOUpdate>({
      query: (data) => ({
        url: RESOURCES.PROCEDURE,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.PROCEDURE, id: arg.id }],
    }),
    deleteProcedure: builder.mutation<IProcedureDTO, IDeleteResource>({
      query: (data) => ({
        url: `/${RESOURCES.PROCEDURE}/${data?.id}`,
        method: 'DELETE',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.PROCEDURE, id: arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateProcedureMutation,
  useDeleteProcedureMutation,
  useGetListProcedureQuery,
  useUpdateProcedureMutation,
  useLazyGetListProcedureQuery,
  useGetOneProcedureQuery,
} = api;
