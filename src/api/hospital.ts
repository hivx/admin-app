import { securedApi } from '@/lib/api';
import { transformResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { IHospitalDTO } from '@/types/dto';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getHospitalConfig: builder.query<IHospitalDTO, undefined>({
      query: () => ({
        url: '',
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      transformResponse: transformResponseGeneric,
    }),
  }),
});

export const { useGetHospitalConfigQuery, useLazyGetHospitalConfigQuery } = api;
