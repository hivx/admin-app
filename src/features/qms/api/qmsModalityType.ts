import { qmsApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { QMS_RESOURCES } from '@/types/resources';

import { IQmsModalityTypeDTOSearch, IQmsModalityTypeDTO } from '../types/qmsModalityType';

const api = qmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getListQmsModalityType: builder.query<
      IGetManyResourceQueryResult<IQmsModalityTypeDTO>,
      IGetManyResourcesQuery<IQmsModalityTypeDTOSearch>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(
          arg,
          QMS_RESOURCES.QMS_MODALITY_TYPE,
        );
        return {
          ...request,
          useHospitalID: false,
        };
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      transformResponse: transformListResponseGeneric,
      providesTags: (result, error) => (error ? [] : [QMS_RESOURCES.QMS_MODALITY_TYPE]),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListQmsModalityTypeQuery } = api;
