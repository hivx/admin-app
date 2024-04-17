import { securedApi } from '@/lib/api';
import { IUpdatePasswordDTO } from '@/types/dto/password';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    updatePassword: builder.mutation<undefined, IUpdatePasswordDTO>({
      query: (data) => ({
        url: '/me/password',
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * invalidates the specific {type: 'content', id} tag.
       * This will force a refetch of both the individual Content object from getOneContent(not implemented),
       * as well as the entire list of Contents from getListContents, because they both provide a tag that matches that {type, id} value.
       * If request resulted in error, don't invalidate anything
       */
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUpdatePasswordMutation } = api;
