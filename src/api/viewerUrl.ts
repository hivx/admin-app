import { securedApi } from '@/lib/api';
import { transformResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { BaseEntity } from '@/types';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Return epoch time
     */
    getViewerUrl: builder.query<string, { orderIDs: BaseEntity['id'][] }>({
      query: ({ orderIDs }) => ({
        url: `${RESOURCES.VIEWER_URL}`,
        method: 'GET',
        params: { orderID: orderIDs.join(',') },
        useAsync: true,
        useHospitalID: true,
      }),
      transformResponse: transformResponseGeneric,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetViewerUrlQuery, useLazyGetViewerUrlQuery } = api;
