import { qmsApi } from '@/lib/api';
import { transformResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { IGetManyResourcesQuery } from '@/types';
import { QMS_RESOURCES } from '@/types/resources';

import {
  IModalitySuggestionDTO,
  IProcedureSiteFilterDTO,
} from '../types/modalitySuggestion';

// Define a service using a base URL and expected endpoints
const api = qmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getModalitySuggestion: builder.query<
      IModalitySuggestionDTO,
      IGetManyResourcesQuery<IProcedureSiteFilterDTO>
    >({
      query: (args) => {
        const { filter } = args;
        return {
          url: `${QMS_RESOURCES.PROCEDURE}/${QMS_RESOURCES.SUGGEST_MODALITY}`,
          method: 'POST',
          data: filter,
          useAsync: true,
        };
      },
      transformResponse: transformResponseGeneric,
      providesTags: (result, error) => (error ? [] : [QMS_RESOURCES.SUGGEST_MODALITY]),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetModalitySuggestionQuery, useLazyGetModalitySuggestionQuery } = api;
