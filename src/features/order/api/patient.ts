import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  getOneResourceRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { BaseEntity } from '@/types';
import {
  IGetManyResourcesQuery,
  IGetManyResourceQueryResult,
  IGenericFilter,
} from '@/types/api';
import { IPatientDTO, IPatientDTOCreate, IPatientDTOUpdate } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListPatients: builder.query<
      IGetManyResourceQueryResult<IPatientDTO>,
      IGetManyResourcesQuery<IGenericFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, 'patient');
        return request;
      },
      providesTags: (result, error) =>
        error
          ? []
          : [
              { type: RESOURCES.PATIENT, id: 'LIST' }, // generic tag for list
              ...(result?.list ?? []).map((patient) => ({
                type: RESOURCES.PATIENT,
                id: patient.id,
              })),
            ],
      transformResponse: transformListResponseGeneric,
    }),
    getOnePatient: builder.query<IPatientDTO, BaseEntity>({
      query: (arg) => {
        const request = getOneResourceRequestParams(arg, 'patient');
        return request;
      },
      providesTags: (result, error) =>
        error
          ? []
          : [
              { type: RESOURCES.PATIENT, id: result?.id }, // generic tag for list
            ],
      transformResponse: transformResponseGeneric,
    }),
    createOnePatient: builder.mutation<BaseEntity['id'], IPatientDTOCreate>({
      query: (body) => ({
        url: `${RESOURCES.PATIENT}`,
        method: 'POST',
        data: body,
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: [{ type: RESOURCES.PATIENT, id: 'LIST' }],
      transformResponse: transformResponseGeneric,
    }),
    updatePatientInfo: builder.mutation<BaseEntity['id'], IPatientDTOUpdate>({
      query: (body) => ({
        url: `${RESOURCES.PATIENT}`,
        method: 'PUT',
        data: body,
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (result, error, arg) =>
        error
          ? []
          : [{ type: RESOURCES.PATIENT }, { type: RESOURCES.PATIENT, id: arg.id }],
      transformResponse: transformResponseGeneric,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetListPatientsQuery,
  useLazyGetListPatientsQuery,
  useCreateOnePatientMutation,
  useUpdatePatientInfoMutation,
  useGetOnePatientQuery,
} = api;
