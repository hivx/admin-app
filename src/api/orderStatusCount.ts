import { securedApi } from '@/lib/api';
import { transformResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { IGetManyResourcesQuery } from '@/types';
import {
  IOrderStatusCountDTO,
  IOrderStatusCountFilter,
} from '@/types/dto/reportStatusCount';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderStatusCount: builder.query<
      IOrderStatusCountDTO[],
      IGetManyResourcesQuery<IOrderStatusCountFilter>
    >({
      query: (args) => ({
        url: `/count/${RESOURCES.ORDER_STATUS}`,
        method: 'POST',
        useAsync: true,
        data: args.filter,
        useHospitalID: true,
      }),
      providesTags: [RESOURCES.ORDER_STATUS],
      transformResponse: transformResponseGeneric,
    }),
  }),
});

export const { useGetOrderStatusCountQuery, useLazyGetOrderStatusCountQuery } = api;
