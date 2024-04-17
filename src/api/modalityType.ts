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
  IModalityTypeDTODelete,
  IModalityTypeCreateDTO,
  IModalityTypeDTO,
  IModalityTypeDTOFilter,
  IModalityTypeUpdateDTO,
} from '@/types/dto';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneModalityType: builder.query<IModalityTypeDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.MODALITY_TYPE}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.MODALITY_TYPE, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getOneModalityTypeByName: builder.query<
      IModalityTypeDTO,
      { name: IModalityTypeDTO['name'] }
    >({
      query: ({ name }) => ({
        url: `${RESOURCES.MODALITY_TYPE_BY_NAME}/${name}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.MODALITY_TYPE_BY_NAME, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getListModalityType: builder.query<
      IGetManyResourceQueryResult<IModalityTypeDTO>,
      IGetManyResourcesQuery<IModalityTypeDTOFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.MODALITY_TYPE);
        return request;
      },
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.MODALITY_TYPE, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.MODALITY_TYPE, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    createModalityType: builder.mutation<IModalityTypeDTO, IModalityTypeCreateDTO>({
      query: (data) => ({
        url: RESOURCES.MODALITY_TYPE,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.MODALITY_TYPE, id: 'LIST' }],
    }),
    updateModalityType: builder.mutation<IModalityTypeDTO, IModalityTypeUpdateDTO>({
      query: (data) => ({
        url: RESOURCES.MODALITY_TYPE,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.MODALITY_TYPE, id: arg.id }],
    }),
    deleteModalityType: builder.mutation<IModalityTypeDTO, IModalityTypeDTODelete>({
      query: (data) => ({
        url: `/${RESOURCES.MODALITY_TYPE}/${data?.id}`,
        method: 'DELETE',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.MODALITY_TYPE, id: arg.id }],
    }),
  }),
});

export const {
  useGetOneModalityTypeQuery,
  useGetListModalityTypeQuery,
  useCreateModalityTypeMutation,
  useUpdateModalityTypeMutation,
  useDeleteModalityTypeMutation,
  useLazyGetListModalityTypeQuery,
  useGetOneModalityTypeByNameQuery,
  useLazyGetOneModalityTypeByNameQuery,
} = api;
