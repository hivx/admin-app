import { RawAxiosRequestHeaders } from 'axios';

import { kioskApi } from '@/lib/api';
import { transformListResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { KIOSK_RESOURCES } from '@/types/resources';

import { IMwlBase, IMwlSearch } from '../types';

// Define a service using a base URL and expected endpoints
const api = kioskApi.injectEndpoints({
  endpoints: (builder) => ({
    getListMwl: builder.query<
      IGetManyResourceQueryResult<IMwlBase>,
      IGetManyResourcesQuery<IMwlSearch> & {
        header?: RawAxiosRequestHeaders;
      }
    >({
      query: (arg) => {
        const { filter } = arg;
        // const resource = 'mwl';
        if (Object.keys(filter).length === 0) {
          // empty filter, use GET ALL if API is available
          return {
            url: `${KIOSK_RESOURCES.KIOSK_MWL}`,
            method: 'GET',
            useAsync: true,
          };
        }
        return {
          url: `search/${KIOSK_RESOURCES.KIOSK_MWL}`,
          method: 'POST',
          data: filter,
          useAsync: true,
          headers: arg.header,
        };
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListMwlQuery, useLazyGetListMwlQuery } = api;
