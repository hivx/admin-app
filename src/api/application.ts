import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import {
  BaseEntity,
  IDeleteResource,
  IGetManyResourceQueryResult,
  IGetManyResourcesQuery,
  IGetOneResourceQuery,
} from '@/types';
import {
  IApplicationCreateDTO,
  IApplicationDTO,
  IApplicationUpdateDTO,
} from '@/types/dto/application';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneApplication: builder.query<IApplicationDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.APPLICATION}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.APPLICATION, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getListApplications: builder.query<
      IGetManyResourceQueryResult<IApplicationDTO>,
      IGetManyResourcesQuery<Partial<BaseEntity>>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.APPLICATION);
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * provides a general 'application' tag for the whole list, as well as a specific
       * {type: 'application', id} tag for each received post object
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.APPLICATION, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.APPLICATION, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    createApplication: builder.mutation<IApplicationDTO, IApplicationCreateDTO>({
      query: (data) => ({
        url: RESOURCES.APPLICATION,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      // invalidates the general 'application' tag, to refetch the whole list
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.APPLICATION, id: 'LIST' }],
    }),
    updateApplication: builder.mutation<IApplicationDTO, IApplicationUpdateDTO>({
      query: (data) => ({
        url: RESOURCES.APPLICATION,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * invalidates the specific {type: 'application', id} tag.
       * This will force a refetch of both the individual application object from getOneApplication(not implemented),
       * as well as the entire list of applications from getListApplications, because they both provide a tag that matches that {type, id} value.
       * If request resulted in error, don't invalidate anything
       */
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.APPLICATION, id: arg.id }],
    }),
    deleteApplication: builder.mutation<IApplicationDTO, IDeleteResource>({
      query: (data) => ({
        url: `/${RESOURCES.APPLICATION}/${data?.id}`,
        method: 'DELETE',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.APPLICATION, id: arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetListApplicationsQuery,
  useLazyGetListApplicationsQuery,
  useGetOneApplicationQuery,
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
} = api;
