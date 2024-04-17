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
} from '@/types';
import {
  IRoleDTO,
  IRoleDTOCreate,
  IRoleDTODelete,
  IRoleDTOUpdate,
  IRoleNameDTO,
  ISearchRoleFilter,
} from '@/types/dto/role';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneRole: builder.query<IRoleDTO, { id: string }>({
      query: ({ id }) => ({
        url: `${RESOURCES.ROLE}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.ROLE, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getListRole: builder.query<
      IGetManyResourceQueryResult<IRoleDTO>,
      IGetManyResourcesQuery<ISearchRoleFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, 'role');
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       *
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.ROLE, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.ROLE, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    getListRoleName: builder.query<
      IGetManyResourceQueryResult<IRoleNameDTO>,
      IGetManyResourcesQuery<IGenericFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, 'roleName');
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       *
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.ROLE_NAME },
        ...result.list.map((item) => ({ type: RESOURCES.ROLE_NAME, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    createRole: builder.mutation<IRoleDTO, IRoleDTOCreate>({
      query: (data) => ({
        url: `${RESOURCES.ROLE}`,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      // invalidates the general 'Role' tag, to refetch the whole list
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.ROLE, id: 'LIST' }],
    }),
    updateRole: builder.mutation<IRoleDTO, IRoleDTOUpdate>({
      query: (data) => ({
        url: `${RESOURCES.ROLE}`,
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
        error ? [] : [{ type: RESOURCES.ROLE, id: arg.id }],
    }),
    deleteRole: builder.mutation<IRoleDTO, IRoleDTODelete>({
      query: (data) => ({
        url: `${RESOURCES.ROLE}/${data?.id}`,
        method: 'DELETE',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.ROLE, id: arg.id }],
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useGetOneRoleQuery,
  useGetListRoleNameQuery,
  useLazyGetOneRoleQuery,
  useDeleteRoleMutation,
  useUpdateRoleMutation,
  useGetListRoleQuery,
  useLazyGetListRoleQuery,
  useLazyGetListRoleNameQuery,
} = api;
