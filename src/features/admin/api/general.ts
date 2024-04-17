import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { IBodyPartDTO, ISearchBodyPartFilter } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListBodyParts: builder.query<
      IGetManyResourceQueryResult<IBodyPartDTO>,
      IGetManyResourcesQuery<ISearchBodyPartFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, 'bodyPart');
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      providesTags: [RESOURCES.BODY_PART],
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListBodyPartsQuery } = api;
