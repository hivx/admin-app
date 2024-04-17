import { securedApi } from '@/lib/api';
import {
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { BaseEntity, IGetManyResourceQueryResult } from '@/types';
import {
  IDeleteOrderFileDTO,
  IDeleteOrderFilesDTO,
  IOrderFileDTO,
  IUploadOrderFileDTO,
} from '@/types/dto';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneOrderFile: builder.query<
      IOrderFileDTO,
      {
        orderID: BaseEntity['id'];
        fileID: BaseEntity['id'];
      }
    >({
      query: ({ orderID, fileID }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.ORDER_FILE}/${fileID}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) => (error ? [] : [{ type: RESOURCES.ORDER_FILE }]),
      transformResponse: transformResponseGeneric,
    }),
    getOneOrderFileData: builder.query<
      Blob,
      {
        orderID: BaseEntity['id'];
        fileID: BaseEntity['id'];
        contentType?: string; // convert to blob if pass
      }
    >({
      query: ({ orderID, fileID }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.ORDER_FILE}/${fileID}/data`,
        method: 'GET',
        responseType: 'arraybuffer',
        useAsync: true,
        useHospitalID: true,
      }),
      transformResponse: (res, meta, args) => {
        /**
         * To convert blob exactly type of file.
         * Ex: pdf need to convert with type application/pdf to preview with blob
         */
        if (args?.contentType) {
          return new Blob([res as ArrayBuffer], { type: args?.contentType });
        }
        return new Blob([res as ArrayBuffer]);
      },
    }),
    getListOrderFile: builder.query<
      IGetManyResourceQueryResult<IOrderFileDTO>,
      {
        orderID: BaseEntity['id'];
      }
    >({
      query: ({ orderID }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.ORDER_FILE}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: () => [{ type: RESOURCES.ORDER_FILE }],
      transformResponse: transformListResponseGeneric,
    }),
    uploadListOrderFile: builder.mutation<BaseEntity['id'], IUploadOrderFileDTO>({
      query: ({ orderID, files }) => {
        const formData = new FormData();
        if (files && files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
          }
        }
        return {
          url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.ORDER_FILE}`,
          method: 'POST',
          data: formData,
          useAsync: true,
          useHospitalID: true,
        };
      },
      invalidatesTags: (result, error) => (error ? [] : [{ type: RESOURCES.ORDER_FILE }]),
      transformResponse: transformResponseGeneric,
    }),
    deleteListOrderFile: builder.mutation<IOrderFileDTO, IDeleteOrderFilesDTO>({
      query: ({ orderID, fileIDs }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.ORDER_FILE}?id=${fileIDs.join(
          ',',
        )}`,
        method: 'DELETE',
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error) => (error ? [] : [{ type: RESOURCES.ORDER_FILE }]),
    }),
    deleteOrderFile: builder.mutation<IOrderFileDTO, IDeleteOrderFileDTO>({
      query: ({ orderID, fileID }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.ORDER_FILE}/${fileID}`,
        method: 'DELETE',
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error) => (error ? [] : [{ type: RESOURCES.ORDER_FILE }]),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetOneOrderFileQuery,
  useGetOneOrderFileDataQuery,
  useLazyGetOneOrderFileDataQuery,
  useGetListOrderFileQuery,
  useUploadListOrderFileMutation,
  useDeleteListOrderFileMutation,
  useDeleteOrderFileMutation,
} = api;
