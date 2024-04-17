import { analyticsApi } from '@/lib/api';
import { transformListResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { DATA, IGetManyResourceQueryResult } from '@/types';
import {
  IAnalyticsFilter,
  ISummaryDataDTO,
  ANALYTIC_ID,
  IApprovalByModalityDTO,
} from '@/types/dto/analytics';
import { RESOURCES } from '@/types/resources';

// currently 4 API for same URI but different param ID with different result type => need to create 4 different query
const api = analyticsApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSummaryStatusData: builder.query<
      ISummaryDataDTO[ANALYTIC_ID.STATUS_COUNT],
      IAnalyticsFilter
    >({
      query: ({ fromDate, toDate, id }) => ({
        url: `/${RESOURCES.ANALYTIC}/${id}/${DATA}`,
        method: 'POST',
        useAsync: true,
        useHospitalID: true,
        data: { fromDate, toDate },
      }),
      providesTags: (result, error, args) =>
        error ? [] : [{ type: RESOURCES.ANALYTIC, id: args.id }],
    }),
    getSummaryModalityData: builder.query<
      ISummaryDataDTO[ANALYTIC_ID.MODALITY_COUNT],
      IAnalyticsFilter
    >({
      query: ({ fromDate, toDate, id }) => ({
        url: `/${RESOURCES.ANALYTIC}/${id}/${DATA}`,
        method: 'POST',
        useAsync: true,
        useHospitalID: true,
        data: { fromDate, toDate },
      }),
      providesTags: (result, error, args) =>
        error ? [] : [{ type: RESOURCES.ANALYTIC, id: args.id }],
    }),
    getSummaryApproverData: builder.query<
      ISummaryDataDTO[ANALYTIC_ID.APPROVER_COUNT],
      IAnalyticsFilter
    >({
      query: ({ fromDate, toDate, id }) => ({
        url: `/${RESOURCES.ANALYTIC}/${id}/${DATA}`,
        method: 'POST',
        useAsync: true,
        useHospitalID: true,
        data: { fromDate, toDate },
      }),
      providesTags: (result, error, args) =>
        error ? [] : [{ type: RESOURCES.ANALYTIC, id: args.id }],
    }),
    getSummaryDayOfWeekData: builder.query<
      ISummaryDataDTO[ANALYTIC_ID.DAYOFWEEK_COUNT],
      IAnalyticsFilter
    >({
      query: ({ fromDate, toDate, id }) => ({
        url: `/${RESOURCES.ANALYTIC}/${id}/${DATA}`,
        method: 'POST',
        useAsync: true,
        useHospitalID: true,
        data: { fromDate, toDate },
      }),
      providesTags: (result, error, args) =>
        error ? [] : [{ type: RESOURCES.ANALYTIC, id: args.id }],
    }),
    getSummaryProcedureData: builder.query<
      ISummaryDataDTO[ANALYTIC_ID.PROCEDURE_COUNT],
      IAnalyticsFilter
    >({
      query: ({ fromDate, toDate, id }) => ({
        url: `/${RESOURCES.ANALYTIC}/${id}/${DATA}`,
        method: 'POST',
        useAsync: true,
        useHospitalID: true,
        data: { fromDate, toDate },
      }),
      providesTags: (result, error, args) =>
        error ? [] : [{ type: RESOURCES.ANALYTIC, id: args.id }],
    }),
    getSummaryModalityGroupData: builder.query<
      ISummaryDataDTO[ANALYTIC_ID.MODALITY_GROUP_COUNT],
      IAnalyticsFilter
    >({
      query: ({ fromDate, toDate, id }) => ({
        url: `/${RESOURCES.ANALYTIC}/${id}/${DATA}`,
        method: 'POST',
        useAsync: true,
        useHospitalID: true,
        data: { fromDate, toDate },
      }),
      providesTags: (result, error, args) =>
        error ? [] : [{ type: RESOURCES.ANALYTIC, id: args.id }],
    }),
    getListCountRequestByModality: builder.query<
      IGetManyResourceQueryResult<IApprovalByModalityDTO>,
      undefined
    >({
      query: (filter) => ({
        url: RESOURCES.COUNT_REQUEST_BY_MODALITY,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * provides a general 'modality' tag for the whole list, as well as a specific
       * {type: 'modality', id} tag for each received post object
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) =>
        result.list
          ? [
              { type: RESOURCES.COUNT_REQUEST_BY_MODALITY, id: 'LIST' },
              ...result.list.map((item) => ({
                type: RESOURCES.COUNT_REQUEST_BY_MODALITY,
                id: item.id,
              })),
            ]
          : [],
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

export const {
  useGetSummaryStatusDataQuery,
  useGetSummaryModalityDataQuery,
  useGetSummaryApproverDataQuery,
  useGetSummaryDayOfWeekDataQuery,
  useGetListCountRequestByModalityQuery,
  useLazyGetListCountRequestByModalityQuery,
  useLazyGetSummaryApproverDataQuery,
  useLazyGetSummaryStatusDataQuery,
  useLazyGetSummaryModalityDataQuery,
  useLazyGetSummaryProcedureDataQuery,
  useLazyGetSummaryModalityGroupDataQuery,
} = api;
