import { kioskApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { KIOSK_RESOURCES } from '@/types/resources';

import {
  IKioskModalityTypeDTOSearch,
  IKioskModalityTypeDTO,
} from '../types/kioskModalityType';

const api = kioskApi.injectEndpoints({
  endpoints: (builder) => ({
    getListKioskModalityType: builder.query<
      IGetManyResourceQueryResult<IKioskModalityTypeDTO>,
      IGetManyResourcesQuery<IKioskModalityTypeDTOSearch>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(
          arg,
          KIOSK_RESOURCES.KIOSK_MODALITY_TYPE,
        );
        return {
          ...request,
          useHospitalID: false,
        };
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      transformResponse: transformListResponseGeneric,
      providesTags: (result, error) =>
        error ? [] : [KIOSK_RESOURCES.KIOSK_MODALITY_TYPE],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListKioskModalityTypeQuery } = api;
