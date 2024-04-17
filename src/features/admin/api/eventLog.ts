import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import {
  BaseEntity,
  IGetManyResourceQueryResult,
  IGetManyResourcesQuery,
  IGetOneResourceQuery,
} from '@/types';
import { RESOURCES } from '@/types/resources';

import { IEventLogDTO, IEventLogDTOSearch } from '../types';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneEventLog: builder.query<IEventLogDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.EVENT_LOG}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.EVENT_LOG, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getListEventLog: builder.query<
      IGetManyResourceQueryResult<IEventLogDTO>,
      IGetManyResourcesQuery<IEventLogDTOSearch>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, 'eventLog');
        return request;
      },
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.EVENT_LOG, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.EVENT_LOG, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    resendEvent: builder.mutation<undefined, BaseEntity>({
      query(arg) {
        return {
          url: `${RESOURCES.EVENT_LOG}/${arg.id}/resend`,
          method: 'GET',
          useAsync: true,
          useHospitalID: true,
        };
      },
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.EVENT_LOG, id: arg.id }],
      transformResponse: transformResponseGeneric,
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
    }),
  }),
});

export const {
  useGetListEventLogQuery,
  useLazyGetListEventLogQuery,
  useGetOneEventLogQuery,
  useResendEventMutation,
} = api;
