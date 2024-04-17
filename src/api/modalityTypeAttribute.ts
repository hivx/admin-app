import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { IModalityTypeAttribute } from '@/types/dto/modalityTypeAttribute';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListModalityTypeAttribute: builder.query<
      IGetManyResourceQueryResult<IModalityTypeAttribute>,
      IGetManyResourcesQuery<{ id?: string }>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(
          arg,
          RESOURCES.MODALITY_TYPE_ATTRIBUTE,
        );
        return request;
      },
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.MODALITY_TYPE_ATTRIBUTE, id: 'LIST' },
        ...result.list.map((item) => ({
          type: RESOURCES.MODALITY_TYPE_ATTRIBUTE,
          id: item.id,
        })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

export const {
  useGetListModalityTypeAttributeQuery,
  useLazyGetListModalityTypeAttributeQuery,
} = api;
