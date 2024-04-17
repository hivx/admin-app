export const testResult = () => {
  return {};
};
import { clinicalApi } from '@/lib/api';
import { KQXN_RESOURCES } from '@/types/resources';

import { ITestResultFilterDTO } from '../types/testResult';

// Define a service using a base URL and expected endpoints
const api = clinicalApi.injectEndpoints({
  endpoints: (builder) => ({
    getTestResultData: builder.query<Blob, ITestResultFilterDTO>({
      query: ({ endDate, pid, startDate }) => ({
        url: KQXN_RESOURCES.KQXN,
        method: 'POST',
        data: { endDate, pid, startDate },
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/pdf',
        },
      }),
      transformResponse: (res) => {
        return new Blob([res as ArrayBuffer], { type: 'application/pdf' });
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTestResultDataQuery } = api;
