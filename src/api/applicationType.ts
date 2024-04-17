import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { BaseEntity, IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { IApplicationTypeDTO } from '@/types/dto/application';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListApplicationTypes: builder.query<
      IGetManyResourceQueryResult<IApplicationTypeDTO>,
      IGetManyResourcesQuery<Partial<BaseEntity>>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.APPLICATION_TYPE);
        return request;
      },
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.APPLICATION_TYPE, id: 'LIST' },
        ...result.list.map((item) => ({ type: RESOURCES.APPLICATION_TYPE, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

export const { useGetListApplicationTypesQuery, useLazyGetListApplicationTypesQuery } =
  api;
