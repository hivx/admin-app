import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import {
  IDeleteResource,
  IGetManyResourceQueryResult,
  IGetManyResourcesQuery,
} from '@/types';
import {
  IConsumableCreateDTO,
  IConsumableDTO,
  IConsumableDTOSearch,
  IConsumableUpdateDTO,
} from '@/types/dto';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListConsumable: builder.query<
      IGetManyResourceQueryResult<IConsumableDTO>,
      IGetManyResourcesQuery<IConsumableDTOSearch>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.CONSUMABLE);
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * provides a general 'Content' tag for the whole list, as well as a specific
       * {type: 'Content', id} tag for each received post object
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.CONSUMABLE, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.CONSUMABLE, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    createConsumable: builder.mutation<IConsumableDTO, IConsumableCreateDTO>({
      query: (data) => ({
        url: `/${RESOURCES.CONSUMABLE}`,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      // invalidates the general 'department' tag, to refetch the whole list
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.CONSUMABLE, id: 'LIST' }],
    }),
    updateConsumable: builder.mutation<IConsumableDTO, IConsumableUpdateDTO[]>({
      query: (data) => ({
        url: `/${RESOURCES.CONSUMABLE}`,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      // invalidates the general 'department' tag, to refetch the whole list
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.CONSUMABLE, id: 'LIST' }],
    }),
    deleteConsumable: builder.mutation<IConsumableDTO, IDeleteResource>({
      query: ({ id }) => ({
        url: `/${RESOURCES.CONSUMABLE}/${id}`,
        method: 'DELETE',
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      // invalidates the general 'department' tag, to refetch the whole list
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.CONSUMABLE, id: 'LIST' }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetListConsumableQuery,
  useLazyGetListConsumableQuery,
  useCreateConsumableMutation,
  useUpdateConsumableMutation,
  useDeleteConsumableMutation,
} = api;
