import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import {
  IGetManyResourcesQuery,
  IGetManyResourceQueryResult,
  IGetOneResourceQuery,
  IDeleteResource,
} from '@/types';
import { ISearchUserFilter, IUserCreateDTO, IUserDTO, IUserUpdateDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListUsers: builder.query<
      IGetManyResourceQueryResult<IUserDTO>,
      IGetManyResourcesQuery<ISearchUserFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.USER);
        return request;
      },
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.USER, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.USER, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    getOneUser: builder.query<IUserDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.USER}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.USER, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    createUser: builder.mutation<IUserDTO, IUserCreateDTO>({
      query: (data) => ({
        url: RESOURCES.USER,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: [{ type: RESOURCES.USER, id: 'LIST' }],
    }),
    updateUser: builder.mutation<IUserDTO, IUserUpdateDTO>({
      query: (data) => ({
        url: RESOURCES.USER,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.USER, id: arg.id }],
    }),
    deleteUser: builder.mutation<IUserDTO, IDeleteResource>({
      query: (data) => ({
        url: `/${RESOURCES.USER}/${data?.id}`,
        method: 'DELETE',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.USER, id: arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetListUsersQuery,
  useLazyGetListUsersQuery,
  useGetOneUserQuery,
  useLazyGetOneUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = api;
