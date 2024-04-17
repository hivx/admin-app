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
  IContentDTOCreate,
  IContentDTOUpdate,
  ISearchContentFilter,
  IContentDTO,
  IContentDTODelete,
} from '@/types/dto';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneContent: builder.query<IContentDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.CONTENT}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.CONTENT, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getListContents: builder.query<
      IGetManyResourceQueryResult<IContentDTO>,
      IGetManyResourcesQuery<ISearchContentFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.CONTENT);
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * provides a general 'Content' tag for the whole list, as well as a specific
       * {type: 'Content', id} tag for each received post object
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.CONTENT, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.CONTENT, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    createContent: builder.mutation<IContentDTO, IContentDTOCreate>({
      query: (data) => ({
        url: `${RESOURCES.CONTENT}`,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      // invalidates the general 'Content' tag, to refetch the whole list
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.CONTENT, id: 'LIST' }],
    }),
    updateContent: builder.mutation<IContentDTO, IContentDTOUpdate>({
      query: (data) => ({
        url: `${RESOURCES.CONTENT}`,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * invalidates the specific {type: 'content', id} tag.
       * This will force a refetch of both the individual Content object from getOneContent(not implemented),
       * as well as the entire list of Contents from getListContents, because they both provide a tag that matches that {type, id} value.
       * If request resulted in error, don't invalidate anything
       */
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.CONTENT, id: arg.id }],
    }),
    deleteContent: builder.mutation<IContentDTO, IContentDTODelete>({
      query: (data) => ({
        url: `${RESOURCES.CONTENT}/${data?.id}`,
        method: 'DELETE',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.CONTENT, id: arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetListContentsQuery,
  useGetOneContentQuery,
  useLazyGetListContentsQuery,
  useLazyGetOneContentQuery,
  useCreateContentMutation,
  useUpdateContentMutation,
  useDeleteContentMutation,
  endpoints,
} = api;
