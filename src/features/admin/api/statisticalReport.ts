import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import {
  IStatisticalReportDTO,
  ISearchStatisticalReportFilter,
} from '@/types/dto/statisticalReport';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListStatisticsReport: builder.query<
      IGetManyResourceQueryResult<IStatisticalReportDTO>,
      IGetManyResourcesQuery<ISearchStatisticalReportFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.STATISTICS_REPORT);
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       *
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.STATISTICS_REPORT },
        ...result.list.map((item) => ({
          type: RESOURCES.STATISTICS_REPORT,
          id: item.id,
        })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

export const { useGetListStatisticsReportQuery } = api;
