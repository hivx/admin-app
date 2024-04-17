import { securedApi } from '@/lib/api';
import { transformResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { BaseEntity } from '@/types';
import {} from '@/types/api';
import { IOrderStudyDTOUpdate } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    updateOrderStudy: builder.mutation<BaseEntity['id'], IOrderStudyDTOUpdate>({
      query: (body) => ({
        url: `${RESOURCES.ORDER_STUDY}`,
        method: 'PUT',
        data: body,
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (result, error, arg) =>
        error
          ? []
          : [
              { type: RESOURCES.ORDER, id: arg.orderID },
              { type: RESOURCES.ORDER, id: 'LIST' },
              { type: RESOURCES.ORDER_STUDY, id: 'LIST' },
              { type: RESOURCES.ORDER_STATUS }, // fetch lai API reportStatusCount
            ],
      transformResponse: transformResponseGeneric,
    }),
    deleteStudyInOrder: builder.mutation<BaseEntity['id'], { orderID: BaseEntity['id'] }>(
      {
        query: ({ orderID }) => ({
          url: `${RESOURCES.ORDER_STUDY}/${orderID}`,
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
                { type: RESOURCES.ORDER_STATUS }, // fetch lai API reportStatusCount
              ],
        transformResponse: transformResponseGeneric,
      },
    ),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUpdateOrderStudyMutation, useDeleteStudyInOrderMutation } = api;
