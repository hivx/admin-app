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
  ICertificateDTO,
  ICertificateDTOCreate,
  ICertificateDTODelete,
  ICertificateDTOUpdate,
  ICertificateFilter,
} from '@/types/dto';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneCertificate: builder.query<ICertificateDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.CERTIFICATE}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.CERTIFICATE, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getListCertificate: builder.query<
      IGetManyResourceQueryResult<ICertificateDTO>,
      IGetManyResourcesQuery<ICertificateFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, 'certificate');
        return request;
      },
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.CERTIFICATE, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.CERTIFICATE, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    createCertificate: builder.mutation<ICertificateDTO, ICertificateDTOCreate>({
      query: (data) => ({
        url: RESOURCES.CERTIFICATE,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.CERTIFICATE, id: 'LIST' }],
    }),
    updateCertificate: builder.mutation<ICertificateDTO, ICertificateDTOUpdate>({
      query: (data) => ({
        url: RESOURCES.CERTIFICATE,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.CERTIFICATE, id: arg.id }],
    }),
    deleteCertificate: builder.mutation<ICertificateDTO, ICertificateDTODelete>({
      query: (data) => ({
        url: `/${RESOURCES.CERTIFICATE}/${data?.id}`,
        method: 'DELETE',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.CERTIFICATE, id: arg.id }],
    }),
  }),
});

export const {
  useGetListCertificateQuery,
  useLazyGetListCertificateQuery,
  useGetOneCertificateQuery,
  useCreateCertificateMutation,
  useUpdateCertificateMutation,
  useDeleteCertificateMutation,
} = api;
