import { securedApi } from '@/lib/api';
import { transformResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getUrlJitsi: builder.query<string, undefined>({
      query: () => ({
        url: RESOURCES.JITSI,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      transformResponse: transformResponseGeneric,
    }),
  }),
});

export const { useGetUrlJitsiQuery, useLazyGetUrlJitsiQuery } = api;
