import { securedApi } from '@/lib/api';
import {
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { base64Coded } from '@/lib/dataHelper/base64FileHelper';
import { CommonReportImages } from '@/lib/dataHelper/radiologyReport/getPatientPortalURL';
import { IOrderReportKey } from '@/stores/OrderRadiology';
import { BaseEntity, IGetManyResourceQueryResult } from '@/types';
import {
  EXPORT,
  IRadilogyReportDTOApprove,
  IRadilogyReportDTOCreate,
  IRadilogyReportDTOQuickApprove,
  IRadilogyReportDTOUpdate,
  IRadilogyReportPdfDTOCreate,
  IRadiologyReportDTO,
  IRadiologyReportDTOExport,
} from '@/types/dto';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneRadiologyReport: builder.query<
      IRadiologyReportDTO,
      {
        orderID: BaseEntity['id'];
        requestID: BaseEntity['id'];
        reportID: BaseEntity['id'];
      }
    >({
      query: ({ orderID, requestID, reportID }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.REQUEST}/${requestID}/${RESOURCES.REPORT}/${reportID}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.REPORT, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getListRadiologyReport: builder.query<
      IGetManyResourceQueryResult<IRadiologyReportDTO>,
      IOrderReportKey
    >({
      query: ({ orderID, requestID }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.REQUEST}/${requestID}/${RESOURCES.REPORT}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error
          ? []
          : [
              { type: RESOURCES.REPORT, id: 'LIST' },
              ...(result?.list ?? []).map((report) => ({
                type: RESOURCES.REPORT,
                id: report.id,
              })),
            ],
      transformResponse: transformListResponseGeneric,
    }),
    createOneRadiologyReport: builder.mutation<
      BaseEntity['id'],
      IOrderReportKey & IRadilogyReportDTOCreate
    >({
      query: ({ orderID, requestID, ...radilogyReportCreate }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.REQUEST}/${requestID}/${RESOURCES.REPORT}`,
        method: 'POST',
        data: {
          ...radilogyReportCreate,
          images: getImagesDataSubmit(radilogyReportCreate.images),
        },
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (res, err, arg) => {
        return err
          ? []
          : [
              { type: RESOURCES.ORDER, id: arg.orderID }, // fetch lai order
              { type: RESOURCES.REQUEST, id: arg.requestID }, // fetch lai request
              { type: RESOURCES.REPORT, id: 'LIST' },
              { type: RESOURCES.ORDER_STATUS }, // fetch lai reportStatusCount
            ];
      },
      transformResponse: transformResponseGeneric,
    }),
    approveOneRadiologyReport: builder.mutation<
      BaseEntity['id'],
      IOrderReportKey & IRadilogyReportDTOApprove
    >({
      query: ({ orderID, requestID, ...radilogyReportApproveData }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.REQUEST}/${requestID}/approve`,
        method: 'POST',
        data: {
          ...radilogyReportApproveData,
          images: getImagesDataSubmit(radilogyReportApproveData.images),
        },
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (res, err, arg) => {
        return err
          ? []
          : [
              { type: RESOURCES.ORDER, id: arg.orderID }, // fetch lai order
              { type: RESOURCES.REQUEST, id: arg.requestID }, // fetch lai request
              { type: RESOURCES.REPORT, id: 'LIST' },
              { type: RESOURCES.ORDER_STATUS }, // fetch lai reportStatusCount
            ];
      },
      transformResponse: transformResponseGeneric,
    }),
    quickApproveOneRadiologyReport: builder.mutation<
      BaseEntity['id'],
      IOrderReportKey & IRadilogyReportDTOQuickApprove
    >({
      query: ({ orderID, requestID, ...radilogyReportQuickApproveData }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.REQUEST}/${requestID}/approve`,
        method: 'PUT',
        data: radilogyReportQuickApproveData,
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (res, err, arg) => {
        return err
          ? []
          : [
              { type: RESOURCES.ORDER, id: arg.orderID }, // fetch lai order
              { type: RESOURCES.REQUEST, id: arg.requestID }, // fetch lai request
              { type: RESOURCES.REPORT, id: 'LIST' },
              { type: RESOURCES.ORDER_STATUS }, // fetch lai reportStatusCount
            ];
      },
      transformResponse: transformResponseGeneric,
    }),
    createOneRadiologyReportPdf: builder.mutation<
      BaseEntity['id'],
      IOrderReportKey & IRadilogyReportPdfDTOCreate
    >({
      query: ({ orderID, requestID, ...radilogyReportPdfCreate }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.REQUEST}/${requestID}/${RESOURCES.PDF}`,
        method: 'POST',
        data: radilogyReportPdfCreate,
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (res, err, arg) => {
        return err
          ? []
          : [
              { type: RESOURCES.ORDER, id: arg.orderID }, // fetch lai order
              { type: RESOURCES.REQUEST, id: arg.requestID }, // fetch lai request
              { type: RESOURCES.PDF, id: 'LIST' },
            ];
      },
      transformResponse: transformResponseGeneric,
    }),
    updateOneRadiologyReport: builder.mutation<
      BaseEntity['id'],
      IOrderReportKey & IRadilogyReportDTOUpdate
    >({
      query: ({ orderID, requestID, ...radilogyReportUpdate }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.REQUEST}/${requestID}/${RESOURCES.REPORT}`,
        method: 'PUT',
        data: radilogyReportUpdate,
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (res, err, arg) =>
        err
          ? []
          : [
              { type: RESOURCES.REPORT, id: res },
              { type: RESOURCES.ORDER, id: arg.orderID },
              { type: RESOURCES.ORDER_STATUS }, // fetch lai reportStatusCount
            ],
      transformResponse: transformResponseGeneric,
    }),
    exportOneRadiologyReport: builder.mutation<Blob, IRadiologyReportDTOExport>({
      query: ({ orderID, requestID, reportID, ...params }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.REQUEST}/${requestID}/${RESOURCES.REPORT}/${reportID}/${EXPORT}`,
        method: 'POST',
        data: params,
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/pdf',
        },
        useAsync: true,
        useHospitalID: true,
      }),
      transformResponse: (res) => {
        return new Blob([res as ArrayBuffer], { type: 'application/pdf' });
      },
    }),
    signOneRadiologyReport: builder.mutation<Blob, IRadiologyReportDTOExport>({
      query: ({ orderID, requestID, reportID, ...params }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.REQUEST}/${requestID}/${RESOURCES.REPORT}/${reportID}/sign`,
        method: 'POST',
        data: { ...params, images: getImagesDataSubmit(params.images) },
        useAsync: true,
        useHospitalID: true,
      }),
      transformResponse: transformResponseGeneric,
      invalidatesTags: (res, err, arg) => {
        return err
          ? []
          : [
              { type: RESOURCES.ORDER, id: arg.orderID }, // fetch lai order
              { type: RESOURCES.REQUEST, id: arg.requestID }, // fetch lai request
              { type: RESOURCES.REPORT, id: 'LIST' },
            ];
      },
    }),
    getOneRadiologyReportImageData: builder.mutation<
      Blob,
      { id: BaseEntity['id'] } & Pick<
        IRadiologyReportDTOExport,
        'orderID' | 'reportID' | 'requestID'
      >
    >({
      query: ({ orderID, requestID, reportID, id }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.REQUEST}/${requestID}/${RESOURCES.REPORT}/${reportID}/image/${id}/data`,
        method: 'GET',
        responseType: 'arraybuffer',
        useAsync: true,
        useHospitalID: true,
      }),
      transformResponse: (res) => {
        return new Blob([res as ArrayBuffer], { type: 'application/jpeg' });
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateOneRadiologyReportPdfMutation,
  useLazyGetOneRadiologyReportQuery,
  useGetOneRadiologyReportQuery,
  useCreateOneRadiologyReportMutation,
  useApproveOneRadiologyReportMutation,
  useQuickApproveOneRadiologyReportMutation,
  useUpdateOneRadiologyReportMutation,
  useGetListRadiologyReportQuery,
  useExportOneRadiologyReportMutation,
  useSignOneRadiologyReportMutation,
  useGetOneRadiologyReportImageDataMutation,
} = api;

const getImagesDataSubmit = (images: IRadilogyReportDTOCreate['images'] | null) => {
  const execImages = images;
  const imagesToSubmit: Record<string, string> = {};
  execImages &&
    Object.keys(execImages).forEach((key, index) => {
      if (execImages[key]) {
        if (Object.values(CommonReportImages).includes(key as CommonReportImages)) {
          imagesToSubmit[key] = base64Coded(execImages[key]);
        } else {
          const newKey = `image${index + 1}`;
          imagesToSubmit[newKey] = base64Coded(execImages[key]);
        }
      }
    });

  return imagesToSubmit;
};
