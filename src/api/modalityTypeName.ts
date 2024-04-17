import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import {
  IModalityTypeNameDTO,
  IModalityTypeNameDTOCreate,
  IModalityTypeNameDTODelete,
  IModalityTypeNameDTOUpdate,
  IModalityTypeNameFilterDTO,
} from '@/types/dto';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneModalityTypeName: builder.query<IModalityTypeNameDTO, { id: string }>({
      query: ({ id }) => ({
        url: `${RESOURCES.MODALITY_TYPE_NAME}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.MODALITY_TYPE_NAME, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
    getListModalityTypeName: builder.query<
      IGetManyResourceQueryResult<IModalityTypeNameDTO>,
      IGetManyResourcesQuery<IModalityTypeNameFilterDTO>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.MODALITY_TYPE_NAME);
        return request;
      },
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.MODALITY_TYPE_NAME, id: 'LIST' },
        ...result.list.map((item) => ({
          type: RESOURCES.MODALITY_TYPE_NAME,
          id: item.id,
        })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
    createModalityTypeName: builder.mutation<
      IModalityTypeNameDTO,
      IModalityTypeNameDTOCreate
    >({
      query: (data) => ({
        url: `${RESOURCES.MODALITY_TYPE_NAME}`,
        method: 'POST',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      // invalidates the general 'Modality type name' tag, to refetch the whole list
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.MODALITY_TYPE_NAME, id: 'LIST' }],
    }),
    updateModalityTypeName: builder.mutation<
      IModalityTypeNameDTO,
      IModalityTypeNameDTOUpdate
    >({
      query: (data) => ({
        url: `${RESOURCES.MODALITY_TYPE_NAME}`,
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
        error ? [] : [{ type: RESOURCES.MODALITY_TYPE_NAME, id: arg.id }],
    }),
    deleteModalityTypeName: builder.mutation<
      IModalityTypeNameDTO,
      IModalityTypeNameDTODelete
    >({
      query: (data) => ({
        url: `${RESOURCES.MODALITY_TYPE_NAME}/${data?.id}`,
        method: 'DELETE',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.MODALITY_TYPE_NAME, id: arg.id }],
    }),
  }),
});

export const {
  useGetListModalityTypeNameQuery,
  useLazyGetListModalityTypeNameQuery,
  useCreateModalityTypeNameMutation,
  useDeleteModalityTypeNameMutation,
  useUpdateModalityTypeNameMutation,
  useGetOneModalityTypeNameQuery,
  useLazyGetOneModalityTypeNameQuery,
} = api;
