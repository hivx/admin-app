import { securedApi } from '@/lib/api';
import { transformResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { IOrderReportKey } from '@/stores/OrderRadiology';
import { BaseEntity } from '@/types';
import { IRadiologyReportPdfDTO } from '@/types/dto';
import { IRadiologyReportPdfDTOCreate } from '@/types/dto/radiologyReportPdf';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getOneRadiologyReportPdf: builder.query<
      IRadiologyReportPdfDTO,
      {
        reportID: BaseEntity['id'];
        pdfID: BaseEntity['id'];
      }
    >({
      query: ({ reportID, pdfID }) => ({
        url: `${RESOURCES.REPORT}/${reportID}/${RESOURCES.PDF}/${pdfID}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.PDF, id: result?.pdf?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getOneRadiologyReportPdfData: builder.query<
      IRadiologyReportPdfDTO,
      {
        reportID: BaseEntity['id'];
        pdfID: BaseEntity['id'];
      }
    >({
      query: ({ reportID, pdfID }) => ({
        url: `${RESOURCES.REPORT}/${reportID}/${RESOURCES.PDF}/${pdfID}/data`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.PDF, id: result?.pdf?.id }],
      transformResponse: transformResponseGeneric,
    }),
    createOneRadiologyReportPdf: builder.mutation<
      BaseEntity['id'],
      {
        reportID: BaseEntity['id'];
      } & IRadiologyReportPdfDTOCreate
    >({
      query: ({ reportID, ...radiologyReportPdfCreate }) => ({
        url: `${RESOURCES.REPORT}/${reportID}/${RESOURCES.PDF}`,
        method: 'POST',
        data: radiologyReportPdfCreate,
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (res, err) => {
        return err ? [] : [{ type: RESOURCES.PDF, id: 'LIST' }];
      },
      transformResponse: transformResponseGeneric,
    }),
    deleteRadiologyReportPdf: builder.mutation<
      IRadiologyReportPdfDTO,
      {
        reportID: BaseEntity['id'];
        pdfID: BaseEntity['id'];
      }
    >({
      query: ({ reportID, pdfID }) => ({
        url: `${RESOURCES.REPORT}/${reportID}/${RESOURCES.PDF}/${pdfID}`,
        method: 'DELETE',
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.PDF, id: result?.pdf?.id }],
    }),
    getOneRadiologyReportFileData: builder.query<
      Blob,
      {
        orderID: BaseEntity['id'];
        requestID: BaseEntity['id'];
        pdfID: BaseEntity['id'];
      }
    >({
      query: ({ orderID, requestID, pdfID }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.REQUEST}/${requestID}/${RESOURCES.PDF}/${pdfID}/data`,
        method: 'GET',
        useAsync: true,
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/pdf',
        },
        useHospitalID: true,
      }),
      transformResponse: (res) => {
        return new Blob([res as ArrayBuffer], { type: 'application/pdf' });
      },
    }),
    getFinalPdfFileData: builder.query<Blob, IOrderReportKey>({
      query: ({ orderID, requestID }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.REQUEST}/${requestID}/print`,
        method: 'GET',
        useAsync: true,
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/pdf',
        },
        useHospitalID: true,
      }),
      transformResponse: (res) => {
        return new Blob([res as ArrayBuffer], { type: 'application/pdf' });
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateOneRadiologyReportPdfMutation,
  useGetOneRadiologyReportPdfQuery,
  useDeleteRadiologyReportPdfMutation,
  useGetOneRadiologyReportPdfDataQuery,
  useGetOneRadiologyReportFileDataQuery,
  useLazyGetOneRadiologyReportFileDataQuery,
  useLazyGetFinalPdfFileDataQuery,
  useGetFinalPdfFileDataQuery,
} = api;
