import { qmsApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { QMS_RESOURCES } from '@/types/resources';

import { ITicketSummaryDTO, ITicketSummaryFilterDTO } from '../types/qmsTicketSummary';

const api = qmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getListTicketSummary: builder.query<
      IGetManyResourceQueryResult<ITicketSummaryDTO>,
      IGetManyResourcesQuery<ITicketSummaryFilterDTO>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(
          arg,
          QMS_RESOURCES.QMS_TICKET_SUMMARY,
        );
        return {
          ...request,
          useHospitalID: false,
        };
      },
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

export const { useGetListTicketSummaryQuery, useLazyGetListTicketSummaryQuery } = api;
