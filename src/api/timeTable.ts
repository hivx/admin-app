import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import {
  ITimeTableUpdateDTO,
  ITimeTableDTO,
  ITimeTableSearchDTO,
} from '@/types/dto/timeTable';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListTimetable: builder.query<
      IGetManyResourceQueryResult<ITimeTableDTO>,
      IGetManyResourcesQuery<ITimeTableSearchDTO>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.TIMETABLE);
        return request;
      },
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.TIMETABLE, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.TIMETABLE, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    updateTimeTable: builder.mutation<ITimeTableDTO, ITimeTableUpdateDTO>({
      query: (data) => ({
        url: RESOURCES.TIMETABLE,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.TIMETABLE, id: 'LIST' }],
    }),
    getOneTimetable: builder.query<ITimeTableDTO, { id: string }>({
      query: ({ id }) => ({
        url: `${RESOURCES.TIMETABLE}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.TIMETABLE, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
  }),
});

export const {
  useGetListTimetableQuery,
  useLazyGetListTimetableQuery,
  useUpdateTimeTableMutation,
  useGetOneTimetableQuery,
} = api;
