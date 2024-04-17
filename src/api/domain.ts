import { permitAllApi } from '@/lib/api';
import { transformResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { IDomainDTO } from '@/types/dto/domain';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = permitAllApi.injectEndpoints({
  endpoints: (builder) => ({
    getHospitalCommonByDomain: builder.query<IDomainDTO, { id: string }>({
      query: ({ id }) => ({
        url: `${RESOURCES.DOMAIN}/${id}`,
        method: 'GET',
        useAsync: false,
        useHospitalID: false,
      }),
      transformResponse: transformResponseGeneric,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetHospitalCommonByDomainQuery,
  useLazyGetHospitalCommonByDomainQuery,
} = api;
