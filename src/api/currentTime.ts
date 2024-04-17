import { securedApi } from '@/lib/api';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Return epoch time
     */
    getCurrentTime: builder.query<number, undefined>({
      query: () => ({
        url: `${RESOURCES.CURRENT_TIME}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCurrentTimeQuery, useLazyGetCurrentTimeQuery } = api;
