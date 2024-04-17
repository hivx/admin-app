import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { BaseEntity } from '@/types';
import {
  IGetManyResourcesQuery,
  IGetManyResourceQueryResult,
  IGetOneResourceQuery,
} from '@/types/api';
import {
  IOrderCreateDTO,
  IOrderDTO,
  IOrderLockDTOCreate,
  IOrderRequestDTOCreate,
  IOrderRequestDTOUpdate,
  IOrderUpdateDTO,
  ISearchOrderFilter,
} from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import { IOrderLockDTO, ISearchOrderHistoryFilter } from '../types/dto/order';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListOrders: builder.query<
      IGetManyResourceQueryResult<IOrderDTO>,
      IGetManyResourcesQuery<ISearchOrderFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, 'order');
        return request;
      },
      providesTags: (result, error) =>
        error
          ? []
          : [
              { type: RESOURCES.ORDER, id: 'LIST' }, // generic tag for list
              ...(result?.list ?? []).map((order) => ({
                type: RESOURCES.ORDER,
                id: order.id,
              })),
              ...(result?.list ?? []).map((order) => ({
                type: RESOURCES.PATIENT,
                id: order.patient?.id,
              })),
            ],
      transformResponse: transformListResponseGeneric,
    }),
    getListOrdersHistory: builder.query<
      IGetManyResourceQueryResult<IOrderDTO>,
      IGetManyResourcesQuery<ISearchOrderHistoryFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.ORDER_HISTORY);
        return request;
      },
      providesTags: (result, error) =>
        error
          ? []
          : [
              { type: RESOURCES.ORDER_HISTORY, id: 'LIST' }, // generic tag for list
            ],
      transformResponse: transformListResponseGeneric,
    }),
    getOneOrder: builder.query<IOrderDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.ORDER}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error
          ? []
          : [
              { type: RESOURCES.ORDER, id: result?.id },
              { type: RESOURCES.PATIENT, id: result?.patient?.id },
              ...(result?.requests ?? []).map((request) => ({
                type: RESOURCES.REQUEST,
                id: request.id,
              })),
            ],
      transformResponse: transformResponseGeneric,
    }),
    createOneOrder: builder.mutation<BaseEntity['id'], IOrderCreateDTO>({
      query: (body) => ({
        url: `${RESOURCES.ORDER}`,
        method: 'POST',
        data: body,
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: [
        { type: RESOURCES.ORDER, id: 'LIST' },
        { type: RESOURCES.ORDER_STATUS },
      ], // generic tag for list
      transformResponse: transformResponseGeneric,
    }),
    updateOrder: builder.mutation<BaseEntity['id'], IOrderUpdateDTO>({
      query: (body) => ({
        url: `${RESOURCES.ORDER}`,
        method: 'PUT',
        data: body,
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (result, error, arg) =>
        error
          ? []
          : [{ type: RESOURCES.ORDER, id: arg.id }, { type: RESOURCES.ORDER_STATUS }],
      transformResponse: transformResponseGeneric,
    }),
    createOrderRequest: builder.mutation<
      BaseEntity['id'],
      { orderID: BaseEntity['id'] } & IOrderRequestDTOCreate
    >({
      query: ({ orderID, ...requestDTOCreate }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.REQUEST}`,
        method: 'POST',
        data: requestDTOCreate,
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (result, error, arg) =>
        error
          ? []
          : [
              { type: RESOURCES.ORDER, id: 'LIST' },
              { type: RESOURCES.ORDER, id: arg.orderID },
              { type: RESOURCES.ORDER_STATUS },
            ],
      transformResponse: transformResponseGeneric,
    }),
    updateOrderRequest: builder.mutation<
      BaseEntity['id'],
      { orderID: BaseEntity['id'] } & IOrderRequestDTOUpdate
    >({
      query: ({ orderID, ...requestDTOUpdate }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.REQUEST}`,
        method: 'PUT',
        data: requestDTOUpdate,
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (result, error, arg) =>
        error
          ? []
          : [
              { type: RESOURCES.ORDER, id: 'LIST' },
              { type: RESOURCES.ORDER, id: arg.orderID },
              { type: RESOURCES.ORDER_STATUS },
            ],
      transformResponse: transformResponseGeneric,
    }),
    deleteOrderRequest: builder.mutation<
      BaseEntity['id'],
      { orderID: BaseEntity['id']; requestID: BaseEntity['id'] }
    >({
      query: ({ orderID, requestID }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.REQUEST}/${requestID}`,
        method: 'DELETE',
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (result, error, arg) =>
        error
          ? []
          : [
              { type: RESOURCES.ORDER, id: 'LIST' },
              { type: RESOURCES.ORDER, id: arg.orderID },
              { type: RESOURCES.ORDER_STATUS },
            ],
      transformResponse: transformResponseGeneric,
    }),
    createLock: builder.mutation<BaseEntity['id'], IOrderLockDTOCreate>({
      query: (data) => ({
        url: `${RESOURCES.LOCK}`,
        method: 'POST',
        data: data,
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (result, error, arg) =>
        error
          ? []
          : [
              { type: RESOURCES.ORDER, id: 'LIST' },
              { type: RESOURCES.ORDER, id: arg.id },
              { type: RESOURCES.LOCK },
            ],
      transformResponse: transformResponseGeneric,
    }),
    deleteLock: builder.mutation<BaseEntity['id'], BaseEntity['id']>({
      query: (id) => ({
        url: `${RESOURCES.LOCK}/${id}`,
        method: 'DELETE',
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (result, error, arg) =>
        error
          ? []
          : [
              { type: RESOURCES.ORDER, id: 'LIST' },
              { type: RESOURCES.ORDER, id: arg },
              { type: RESOURCES.LOCK },
            ],
      transformResponse: transformResponseGeneric,
    }),
    deleteOrder: builder.mutation<BaseEntity['id'], BaseEntity['id']>({
      query: (id) => ({
        url: `${RESOURCES.ORDER}/${id}`,
        method: 'DELETE',
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (result, error, arg) =>
        error
          ? []
          : [
              { type: RESOURCES.ORDER, id: 'LIST' },
              { type: RESOURCES.ORDER, id: arg },
              { type: RESOURCES.ORDER_STATUS },
            ],
      transformResponse: transformResponseGeneric,
    }),
    getOneLock: builder.query<IOrderLockDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.LOCK}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.LOCK, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    acceptOrder: builder.mutation<BaseEntity['id'], BaseEntity['id']>({
      query: (id) => ({
        url: `${RESOURCES.ORDER}/${id}/start`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (result, error, arg) =>
        error
          ? []
          : [
              { type: RESOURCES.ORDER, id: 'LIST' },
              { type: RESOURCES.ORDER, id: arg },
              { type: RESOURCES.ORDER_STATUS },
            ],
      transformResponse: transformResponseGeneric,
    }),
  }),
});

export const getListOrdersApi = api.endpoints.getListOrders;

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetListOrdersQuery,
  useLazyGetListOrdersQuery,
  useLazyGetOneOrderQuery,
  useGetOneOrderQuery,
  useCreateOneOrderMutation,
  useUpdateOrderMutation,
  useCreateOrderRequestMutation,
  useUpdateOrderRequestMutation,
  useDeleteOrderRequestMutation,
  useCreateLockMutation,
  useDeleteLockMutation,
  useGetOneLockQuery,
  useDeleteOrderMutation,
  useGetListOrdersHistoryQuery,
  useAcceptOrderMutation,
} = api;
