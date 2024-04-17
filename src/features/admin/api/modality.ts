import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { IModalityDTO, ISearchModalityFilter } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListModality: builder.query<
      IGetManyResourceQueryResult<IModalityDTO>,
      IGetManyResourcesQuery<ISearchModalityFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.MODALITY);
        return request;
      },
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      providesTags: [RESOURCES.MODALITY],
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

export const { useGetListModalityQuery } = api;
