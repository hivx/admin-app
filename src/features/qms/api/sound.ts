import { qmsApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { QMS_RESOURCES } from '@/types/resources';

import { ISoundDTO, ISoundDTOCreate, ISoundDTOSearch } from '../types/sound';

const api = qmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getListSound: builder.query<
      IGetManyResourceQueryResult<ISoundDTO>,
      IGetManyResourcesQuery<ISoundDTOSearch>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, QMS_RESOURCES.QMS_SOUND);
        return {
          ...request,
          useHospitalID: false,
          useAsync: false,
        };
      },
      transformResponse: transformListResponseGeneric,
    }),
    createSound: builder.mutation<ISoundDTO, ISoundDTOCreate>({
      query: (data) => ({
        url: `${QMS_RESOURCES.QMS_SOUND}`,
        method: 'POST',
        data,
        useAsync: false,
      }),
      transformResponse: transformResponseGeneric,
      invalidatesTags: (result, error) => (error ? [] : [QMS_RESOURCES.QMS_SOUND]),
    }),
  }),
});

export const { useCreateSoundMutation, useGetListSoundQuery, useLazyGetListSoundQuery } =
  api;
