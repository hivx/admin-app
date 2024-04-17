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
  ILayoutDTO,
  ILayoutDTOCreate,
  ILayoutDTOUpdate,
  ISearchLayoutFilter,
} from '@/types/dto/layout';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneLayout: builder.query<ILayoutDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.LAYOUT}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.LAYOUT, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    createLayout: builder.mutation<ILayoutDTO, ILayoutDTOCreate>({
      query: (data) => ({
        url: `${RESOURCES.LAYOUT}`,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      // invalidates the general 'Content' tag, to refetch the whole list
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.LAYOUT, id: 'LIST' }],
    }),

    updateLayout: builder.mutation<ILayoutDTO, ILayoutDTOUpdate>({
      query: (data) => ({
        url: `${RESOURCES.LAYOUT}`,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }), // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      // invalidates the general 'Content' tag, to refetch the whole list
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.LAYOUT, id: arg.id }],
    }),
    getListLayout: builder.query<
      IGetManyResourceQueryResult<ILayoutDTO>,
      IGetManyResourcesQuery<ISearchLayoutFilter>
    >({
      query: (arg) => {
        const newFilter: ISearchLayoutFilter = {
          modalityType: arg.filter.modalityType,
          procedureID: arg.filter.procedureID,
        };
        const request = getManyResourcesRequestParams(
          { ...arg, filter: newFilter },
          RESOURCES.LAYOUT,
        );
        const { url, method, params, data, useHospitalID, useAsync } = request;
        return {
          url: arg.filter.departmentID
            ? `${RESOURCES.DEPARTMENT}/${arg.filter.departmentID}/${url}`
            : url,
          method,
          params,
          data,
          useHospitalID,
          useAsync,
        };
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       *
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.LAYOUT, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.LAYOUT, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    deleteLayout: builder.mutation<ILayoutDTO, IDeleteResource>({
      query: (data) => ({
        url: `/${RESOURCES.LAYOUT}/${data?.id}`,
        method: 'DELETE',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.LAYOUT, id: arg.id }],
    }),
    /**
     * Query to get only one relevant layout template,
     * Use to get layout for sign report logic
     *
     * 02/11/2023 đã bỏ API
     */
    // getOneRelevantLayout: builder.query<ILayoutDTO, ISearchLayoutFilter>({
    //   query: (data) => ({
    //     url: `/first/${RESOURCES.LAYOUT}`,
    //     method: 'POST',
    //     data,
    //     useAsync: true,
    //     useHospitalID: true,
    //   }),
    //   transformResponse: transformResponseGeneric,
    // }),
  }),
});

export const {
  useGetListLayoutQuery,
  useLazyGetListLayoutQuery,
  useGetOneLayoutQuery,
  useLazyGetOneLayoutQuery,
  useDeleteLayoutMutation,
  useCreateLayoutMutation,
  useUpdateLayoutMutation,
} = api;
