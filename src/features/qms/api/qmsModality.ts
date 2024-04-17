import { qmsApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { QMS_RESOURCES } from '@/types/resources';

import { IQmsModalityDTO, IQmsModalitySearch, IQmsModalityUpdateDTO } from '../types';

const api = qmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getListQmsModality: builder.query<
      IGetManyResourceQueryResult<IQmsModalityDTO>,
      IGetManyResourcesQuery<IQmsModalitySearch>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, QMS_RESOURCES.QMS_MODALITY);
        return {
          ...request,
          useHospitalID: false,
        };
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      transformResponse: transformListResponseGeneric,
      providesTags: (result, error) => (error ? [] : [QMS_RESOURCES.QMS_MODALITY]),
    }),
    updateQmsModality: builder.mutation<IQmsModalityDTO, IQmsModalityUpdateDTO>({
      query: (data) => ({
        url: `/${QMS_RESOURCES.QMS_MODALITY}`,
        method: 'PUT',
        data,
        useAsync: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error
          ? []
          : [
              QMS_RESOURCES.SUGGEST_MODALITY,
              QMS_RESOURCES.QMS_MODALITY,
              { type: QMS_RESOURCES.QMS_MODALITY, id: arg.id },
            ],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListQmsModalityQuery, useUpdateQmsModalityMutation } = api;
