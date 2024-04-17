import { securedApi } from '@/lib/api';
import { transformListResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult } from '@/types';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Return epoch time
     */
    getDicomImageByOrderID: builder.query<
      IGetManyResourceQueryResult<string>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `${RESOURCES.ORDER}/${id}/dicomImage`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetDicomImageByOrderIDQuery,
  useLazyGetDicomImageByOrderIDQuery,
  endpoints,
} = api;
