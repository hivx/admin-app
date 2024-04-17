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
  IDepartmentDTOCreate,
  IDepartmentDTOUpdate,
  ISearchDepartmentFilter,
  IDepartmentDTO,
} from '@/types/dto';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneDepartment: builder.query<IDepartmentDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.DEPARTMENT}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.DEPARTMENT, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getListDepartments: builder.query<
      IGetManyResourceQueryResult<IDepartmentDTO>,
      IGetManyResourcesQuery<ISearchDepartmentFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.DEPARTMENT);
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * provides a general 'department' tag for the whole list, as well as a specific
       * {type: 'department', id} tag for each received post object
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.DEPARTMENT, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.DEPARTMENT, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    createDepartment: builder.mutation<IDepartmentDTO, IDepartmentDTOCreate>({
      query: (data) => ({
        url: RESOURCES.DEPARTMENT,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      // invalidates the general 'department' tag, to refetch the whole list
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.DEPARTMENT, id: 'LIST' }],
    }),
    updateDepartment: builder.mutation<IDepartmentDTO, IDepartmentDTOUpdate>({
      query: (data) => ({
        url: RESOURCES.DEPARTMENT,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * invalidates the specific {type: 'department', id} tag.
       * This will force a refetch of both the individual department object from getOneDepartment(not implemented),
       * as well as the entire list of departments from getListDepartments, because they both provide a tag that matches that {type, id} value.
       * If request resulted in error, don't invalidate anything
       */
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.DEPARTMENT, id: arg.id }],
    }),
    deleteDepartment: builder.mutation<IDepartmentDTO, IDeleteResource>({
      query: (data) => ({
        url: `/${RESOURCES.DEPARTMENT}/${data?.id}`,
        method: 'DELETE',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.DEPARTMENT, id: arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetListDepartmentsQuery,
  useLazyGetListDepartmentsQuery,
  useGetOneDepartmentQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = api;
