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
  IModalityRoomDTO,
  IModalityRoomDTOCreate,
  IModalityRoomDTOUpdate,
  ISearchModalityRoomFilter,
  IModalityRoomDTODelete,
} from '@/types/dto';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneModalityRoom: builder.query<IModalityRoomDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.MODALITY_ROOM}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.MODALITY_ROOM, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getListModalityRoom: builder.query<
      IGetManyResourceQueryResult<IModalityRoomDTO>,
      IGetManyResourcesQuery<ISearchModalityRoomFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.MODALITY_ROOM);
        return request;
      },
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.MODALITY_ROOM, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.MODALITY_ROOM, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    createModalityRoom: builder.mutation<IModalityRoomDTO, IModalityRoomDTOCreate>({
      query: (data) => ({
        url: RESOURCES.MODALITY_ROOM,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.MODALITY_ROOM, id: 'LIST' }],
    }),
    updateModalityRoom: builder.mutation<IModalityRoomDTO, IModalityRoomDTOUpdate>({
      query: (data) => ({
        url: RESOURCES.MODALITY_ROOM,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.MODALITY_ROOM, id: arg.id }],
    }),
    deleteModalityRoom: builder.mutation<IModalityRoomDTO, IModalityRoomDTODelete>({
      query: (data) => ({
        url: `/${RESOURCES.MODALITY_ROOM}/${data?.id}`,
        method: 'DELETE',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.MODALITY_ROOM, id: arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetListModalityRoomQuery,
  useLazyGetOneModalityRoomQuery,
  useLazyGetListModalityRoomQuery,
  useGetOneModalityRoomQuery,
  useCreateModalityRoomMutation,
  useDeleteModalityRoomMutation,
  useUpdateModalityRoomMutation,
} = api;
