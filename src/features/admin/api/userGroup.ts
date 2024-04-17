import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import {
  IDeleteResource,
  IGetManyResourceQueryResult,
  IGetManyResourcesQuery,
  IGetOneResourceQuery,
} from '@/types';
import {
  IGroupDTO,
  IGroupDTOCreate,
  IGroupDTOUpdate,
  ISearchGroupFilter,
} from '@/types/dto';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneUserGroup: builder.query<IGroupDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.USER_GROUP}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.USER_GROUP, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    createUserGroup: builder.mutation<IGroupDTO, IGroupDTOCreate>({
      query: (data) => ({
        url: `${RESOURCES.USER_GROUP}`,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      // invalidates the general 'Content' tag, to refetch the whole list
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.USER_GROUP, id: 'LIST' }],
    }),

    updateUserGroup: builder.mutation<IGroupDTO, IGroupDTOUpdate>({
      query: (data) => ({
        url: `${RESOURCES.USER_GROUP}`,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }), // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      // invalidates the general 'Content' tag, to refetch the whole list
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.USER_GROUP, id: arg.id }],
    }),
    getListUserGroup: builder.query<
      IGetManyResourceQueryResult<IGroupDTO>,
      IGetManyResourcesQuery<ISearchGroupFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, 'group');
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       *
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.USER_GROUP, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.USER_GROUP, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    deleteUserGroup: builder.mutation<IGroupDTO, IDeleteResource>({
      query: (data) => ({
        url: `/${RESOURCES.USER_GROUP}/${data?.id}`,
        method: 'DELETE',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.USER_GROUP, id: arg.id }],
    }),
  }),
});

export const {
  useGetListUserGroupQuery,
  useLazyGetListUserGroupQuery,
  useGetOneUserGroupQuery,
  useLazyGetOneUserGroupQuery,
  useDeleteUserGroupMutation,
  useCreateUserGroupMutation,
  useUpdateUserGroupMutation,
} = api;
