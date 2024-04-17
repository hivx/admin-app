import { securedApi } from '@/lib/api';
import { transformResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { IOrderDTO } from '@/types/dto';
import { IInsuranceConflictDTO } from '@/types/dto/insuranceConflict';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getInsuranceConflict: builder.query<IOrderDTO, IInsuranceConflictDTO>({
      query: ({ orderID, ...data }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.APPROVAL_CONFLICT}`,
        method: 'POST',
        useAsync: true,
        useHospitalID: true,
        data: data,
      }),
      transformResponse: transformResponseGeneric,
    }),
    getIsValidTime: builder.query<boolean, Omit<IInsuranceConflictDTO, 'by'>>({
      query: ({ orderID, ...data }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.IS_VALID_APPROVAL}`,
        method: 'POST',
        useAsync: true,
        useHospitalID: true,
        data: data,
      }),
      transformResponse: transformResponseGeneric,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetInsuranceConflictQuery,
  useLazyGetInsuranceConflictQuery,
  useGetIsValidTimeQuery,
  useLazyGetIsValidTimeQuery,
} = api;
