import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import {
  BaseEntity,
  IGetManyResourceQueryResult,
  IGetManyResourcesQuery,
  IGetOneResourceQuery,
} from '@/types';
import {
  IBookmarkDTOCreate,
  IBookmarkDTOUpdate,
  ISearchBookmarkFilter,
  IBookmarkDTO,
  IBookmarkDTODelete,
} from '@/types/dto';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneBookmark: builder.query<IBookmarkDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.BOOKMARK}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.BOOKMARK, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getListBookmarkByFolderID: builder.query<
      IGetManyResourceQueryResult<IBookmarkDTO>,
      { folderID: BaseEntity['id'] }
    >({
      query: ({ folderID }) => ({
        url: `${RESOURCES.BOOKMARK_FOLDER}/${folderID}/${RESOURCES.BOOKMARK}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error
          ? []
          : [
              { type: RESOURCES.BOOKMARK, id: 'LIST' }, // generic tag for list
            ],
      transformResponse: transformListResponseGeneric,
    }),
    getListBookmark: builder.query<
      IGetManyResourceQueryResult<IBookmarkDTO>,
      IGetManyResourcesQuery<ISearchBookmarkFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.BOOKMARK);
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * provides a general 'Bookmark' tag for the whole list, as well as a specific
       * {type: 'Bookmark', id} tag for each received post object
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.BOOKMARK, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.BOOKMARK, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    createBookmark: builder.mutation<IBookmarkDTO, IBookmarkDTOCreate>({
      query: (data) => ({
        url: `${RESOURCES.BOOKMARK}`,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      // invalidates the general 'Bookmark' tag, to refetch the whole list
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.BOOKMARK, id: 'LIST' }],
    }),
    updateBookmark: builder.mutation<IBookmarkDTO, IBookmarkDTOUpdate>({
      query: (data) => ({
        url: `${RESOURCES.BOOKMARK}`,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * invalidates the specific {type: 'content', id} tag.
       * This will force a refetch of both the individual Bookmark object from getOneBookmark(not implemented),
       * as well as the entire list of Bookmarks from getListBookmarks, because they both provide a tag that matches that {type, id} value.
       * If request resulted in error, don't invalidate anything
       */
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.BOOKMARK, id: arg.id }],
    }),
    deleteBookmark: builder.mutation<IBookmarkDTO, IBookmarkDTODelete>({
      query: (data) => ({
        url: `${RESOURCES.BOOKMARK}/${data?.id}`,
        method: 'DELETE',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.BOOKMARK, id: arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateBookmarkMutation,
  useUpdateBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetListBookmarkQuery,
  useLazyGetListBookmarkQuery,
  useGetOneBookmarkQuery,
  useLazyGetOneBookmarkQuery,
  useGetListBookmarkByFolderIDQuery,
  useLazyGetListBookmarkByFolderIDQuery,
} = api;
