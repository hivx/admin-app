import { securedApi } from '@/lib/api';
import { transformResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { IOrderReportKey } from '@/stores/OrderRadiology';
import { BaseEntity } from '@/types';
import { IOrderRequestDTO, IOrderRequestDTOUpdate } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getOneOrderRequest: builder.query<
      IOrderRequestDTO,
      {
        orderID: BaseEntity['id'];
        requestID: BaseEntity['id'];
      }
    >({
      query: ({ orderID, requestID }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.REQUEST}/${requestID}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error
          ? []
          : [
              { type: RESOURCES.REQUEST },
              { type: RESOURCES.REQUEST, id: result?.id },
              ...(result?.reports ?? []).map((report) => ({
                type: RESOURCES.REPORT,
                id: report.id,
              })),
            ],
      transformResponse: transformResponseGeneric,
    }),
    updateOrderRequest: builder.mutation<
      BaseEntity['id'],
      { orderID: BaseEntity['id'] } & IOrderRequestDTOUpdate
    >({
      query: ({ orderID, ...requestUpdate }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.REQUEST}`,
        method: 'PUT',
        data: requestUpdate,
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (result, error, arg) =>
        error
          ? []
          : [
              { type: RESOURCES.REQUEST, id: arg.id },
              { type: RESOURCES.ORDER, id: arg.orderID },
            ],
      transformResponse: transformResponseGeneric,
    }),
    cancelApprovedRequest: builder.mutation<BaseEntity['id'], IOrderReportKey>({
      query: ({ orderID, requestID }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.REQUEST}/${requestID}/approve`,
        method: 'DELETE',
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (result, error, arg) =>
        error
          ? []
          : [
              { type: RESOURCES.REQUEST, id: arg.requestID },
              { type: RESOURCES.ORDER, id: arg.orderID },
            ],
      transformResponse: transformResponseGeneric,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetOneOrderRequestQuery,
  useLazyGetOneOrderRequestQuery,
  useUpdateOrderRequestMutation,
  useCancelApprovedRequestMutation,
} = api;
