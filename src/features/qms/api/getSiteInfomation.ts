import { qmsApi } from '@/lib/api';
import { transformResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { IGetOneResourceQuery } from '@/types';
import { QMS_RESOURCES } from '@/types/resources';

import { ISiteDTO } from '../types';

// Define a service using a base URL and expected endpoints
const api = qmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneSite: builder.query<ISiteDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${QMS_RESOURCES.QMS_SITE}/${id}`,
        method: 'GET',
        useAsync: true,
      }),
      transformResponse: transformResponseGeneric,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetOneSiteQuery } = api;
