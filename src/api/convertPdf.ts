import { securedApi } from '@/lib/api';
import { ConvertHTMLToPDFArgs } from '@/types/pdf';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getPdf: builder.query<Blob, ConvertHTMLToPDFArgs>({
      query: (arg) => {
        return {
          url: `convert`,
          method: 'POST',
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/pdf',
          },
          data: arg,
          useAsync: true,
          useHospitalID: true,
        };
      },
      transformResponse: (res) => {
        return new Blob([res as ArrayBuffer], { type: 'application/pdf' });
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPdfQuery, useLazyGetPdfQuery } = api;
