import { securedApi } from '@/lib/api';
import { transformListResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult } from '@/types/api';
import { IOrderRequestDTO, PatientRequestFilter } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListPatientRequests: builder.query<
      IGetManyResourceQueryResult<IOrderRequestDTO>,
      PatientRequestFilter
    >({
      query: ({ patientID, ...data }) => ({
        url: `${RESOURCES.PATIENT}/${patientID}/search/${RESOURCES.REQUEST}`,
        method: 'POST',
        useAsync: true,
        useHospitalID: true,
        data: { ...data, patientID },
      }),
      providesTags: (result, error) =>
        error
          ? []
          : [
              { type: RESOURCES.PATIENT_REQUEST, id: 'LIST' }, // generic tag for list
              ...(result?.list ?? []).map((patient) => ({
                type: RESOURCES.PATIENT_REQUEST,
                id: patient.id,
              })),
            ],
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListPatientRequestsQuery, useLazyGetListPatientRequestsQuery } = api;
