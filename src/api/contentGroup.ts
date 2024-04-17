import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import {
  IGetManyResourceQueryResult,
  IGetManyResourcesQuery,
  IGetOneResourceQuery,
} from '@/types';
import {
  IContentGroupDTOCreate,
  IContentGroupDTOUpdate,
  ISearchContentGroupFilter,
  IContentGroupDTODelete,
  IContentGroupDTO,
} from '@/types/dto';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneContentGroup: builder.query<IContentGroupDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.CONTENT_GROUP}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.CONTENT_GROUP, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getListContentGroups: builder.query<
      IGetManyResourceQueryResult<IContentGroupDTO>,
      IGetManyResourcesQuery<ISearchContentGroupFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.CONTENT_GROUP);
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * provides a general 'ContentGroup' tag for the whole list, as well as a specific
       * {type: 'ContentGroup', id} tag for each received post object
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.CONTENT_GROUP, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.CONTENT_GROUP, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    createContentGroup: builder.mutation<IContentGroupDTO, IContentGroupDTOCreate>({
      query: (data) => ({
        url: `${RESOURCES.CONTENT_GROUP}`,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      // invalidates the general 'ContentGroup' tag, to refetch the whole list
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.CONTENT_GROUP, id: 'LIST' }],
    }),
    updateContentGroup: builder.mutation<IContentGroupDTO, IContentGroupDTOUpdate>({
      query: (data) => ({
        url: `${RESOURCES.CONTENT_GROUP}`,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * invalidates the specific {type: 'contentGroup', id} tag.
       * This will force a refetch of both the individual ContentGroup object from getOneContentGroup(not implemented),
       * as well as the entire list of ContentGroups from getListContentGroups, because they both provide a tag that matches that {type, id} value.
       * If request resulted in error, don't invalidate anything
       */
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.CONTENT_GROUP, id: arg.id }],
    }),
    deleteContentGroup: builder.mutation<IContentGroupDTO, IContentGroupDTODelete>({
      query: (data) => ({
        url: `${RESOURCES.CONTENT_GROUP}/${data?.id}`,
        method: 'DELETE',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.CONTENT_GROUP, id: arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetListContentGroupsQuery,
  useGetOneContentGroupQuery,
  useCreateContentGroupMutation,
  useUpdateContentGroupMutation,
  useDeleteContentGroupMutation,
  useLazyGetListContentGroupsQuery,
} = api;
