import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { IConsumableMaterialDTO, IModalityTypeDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListConsumableMaterial: builder.query<
      IGetManyResourceQueryResult<IConsumableMaterialDTO>,
      IGetManyResourcesQuery<{ id?: number; modalityType?: IModalityTypeDTO['name'] }>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.CONSUMABLE_MATERIAL);
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * provides a general 'Content' tag for the whole list, as well as a specific
       * {type: 'Content', id} tag for each received post object
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.CONSUMABLE_MATERIAL, id: 'LIST' },
        ...result.list.map((item) => ({
          type: RESOURCES.CONSUMABLE_MATERIAL,
          id: item.id,
        })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetListConsumableMaterialQuery,
  useLazyGetListConsumableMaterialQuery,
} = api;
