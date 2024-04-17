import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import {
  IGenericFilter,
  IGetManyResourceQueryResult,
  IGetManyResourcesQuery,
  IGetOneResourceQuery,
} from '@/types';
import {
  IBookmarkFolderDTO,
  IBookmarkFolderDTOCreate,
  IBookmarkFolderDTODelete,
  IBookmarkFolderDTOUpdate,
} from '@/types/dto/bookmarkFolder';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneBookmarkFolder: builder.query<IBookmarkFolderDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.BOOKMARK_FOLDER}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.BOOKMARK_FOLDER, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getListBookmarkFolder: builder.query<
      IGetManyResourceQueryResult<IBookmarkFolderDTO>,
      IGetManyResourcesQuery<IGenericFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.BOOKMARK_FOLDER);
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * provides a general 'Bookmark' tag for the whole list, as well as a specific
       * {type: 'Bookmark', id} tag for each received post object
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.BOOKMARK_FOLDER, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.BOOKMARK_FOLDER, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    createBookmarkFolder: builder.mutation<IBookmarkFolderDTO, IBookmarkFolderDTOCreate>({
      query: (data) => ({
        url: `${RESOURCES.BOOKMARK_FOLDER}`,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      // invalidates the general 'Bookmark' tag, to refetch the whole list
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.BOOKMARK_FOLDER, id: 'LIST' }],
    }),
    updateBookmarkFolder: builder.mutation<IBookmarkFolderDTO, IBookmarkFolderDTOUpdate>({
      query: (data) => ({
        url: `${RESOURCES.BOOKMARK_FOLDER}`,
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
        error ? [] : [{ type: RESOURCES.BOOKMARK_FOLDER, id: arg.id }],
    }),
    deleteBookmarkFolder: builder.mutation<IBookmarkFolderDTO, IBookmarkFolderDTODelete>({
      query: (data) => ({
        url: `${RESOURCES.BOOKMARK_FOLDER}/${data?.id}`,
        method: 'DELETE',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.BOOKMARK_FOLDER, id: arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetListBookmarkFolderQuery,
  useLazyGetListBookmarkFolderQuery,
  useGetOneBookmarkFolderQuery,
  useLazyGetOneBookmarkFolderQuery,
  useDeleteBookmarkFolderMutation,
  useCreateBookmarkFolderMutation,
  useUpdateBookmarkFolderMutation,
} = api;
