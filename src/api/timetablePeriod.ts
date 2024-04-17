import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { BaseEntity, IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import {
  ITimeTablePeriodDTO,
  ITimeTablePeriodDTOUpdate,
} from '@/types/dto/timeTablePeriod';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListTimetablePeriod: builder.query<
      IGetManyResourceQueryResult<ITimeTablePeriodDTO>,
      IGetManyResourcesQuery<{ id?: BaseEntity['id'] }>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.TIMETABLE_PERIOD);
        return request;
      },
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.TIMETABLE_PERIOD, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.TIMETABLE_PERIOD, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    getOneTimetablePeriod: builder.query<ITimeTablePeriodDTO, { id: number }>({
      query: ({ id }) => ({
        url: `${RESOURCES.TIMETABLE_PERIOD}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.TIMETABLE_PERIOD, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    updateTimetablePeriod: builder.mutation<
      ITimeTablePeriodDTO,
      ITimeTablePeriodDTOUpdate
    >({
      query: (data) => ({
        url: RESOURCES.TIMETABLE_PERIOD,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.TIMETABLE_PERIOD, id: arg.id }],
    }),
  }),
});

export const {
  useGetListTimetablePeriodQuery,
  useLazyGetListTimetablePeriodQuery,
  useGetOneTimetablePeriodQuery,
  useUpdateTimetablePeriodMutation,
} = api;
