import { qmsApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import {
  IGetManyResourceQueryResult,
  IGetManyResourcesQuery,
  IGenericFilter,
} from '@/types';
import { QMS_RESOURCES } from '@/types/resources';

import { IMwlBase } from '../types';

// Define a service using a base URL and expected endpoints
const api = qmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getListApprovedDiagnosis: builder.query<
      IGetManyResourceQueryResult<IMwlBase>,
      IGetManyResourcesQuery<IGenericFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(
          arg,
          QMS_RESOURCES.QMS_APPROVED_DIAGNOSIS,
        );
        return {
          ...request,
          useHospitalID: false,
        };
      },
      //   providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
      //     { type: RESOURCES.QMS_APPROVED_DIAGNOSIS },
      //     ...result.list.map((item) => ({
      //       type: RESOURCES.QMS_APPROVED_DIAGNOSIS,
      //       id: item.ticketID,
      //     })),
      //   ],
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListApprovedDiagnosisQuery } = api;
