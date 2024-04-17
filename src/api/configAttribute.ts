import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { BaseEntity, IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { IConfigAttributeDTO } from '@/types/dto/configAttribute';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneConfigAttribute: builder.query<IConfigAttributeDTO, { id: string }>({
      query: ({ id }) => ({
        url: `${RESOURCES.CONFIG_ATTRIBUTE}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.CONFIG_ATTRIBUTE, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getListConfigAttribute: builder.query<
      IGetManyResourceQueryResult<IConfigAttributeDTO>,
      IGetManyResourcesQuery<Partial<BaseEntity>>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.CONFIG_ATTRIBUTE);
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * provides a general 'CONFIG_ATTRIBUTE' tag for the whole list, as well as a specific
       * {type: 'CONFIG_ATTRIBUTE', id} tag for each received post object
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) =>
        result.list
          ? [
              { type: RESOURCES.CONFIG_ATTRIBUTE, id: 'LIST' },
              ...result.list.map((item) => ({
                type: RESOURCES.CONFIG_ATTRIBUTE,
                id: item.id,
              })),
            ]
          : [],
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetListConfigAttributeQuery,
  useLazyGetListConfigAttributeQuery,
  useGetOneConfigAttributeQuery,
  useLazyGetOneConfigAttributeQuery,
} = api;
