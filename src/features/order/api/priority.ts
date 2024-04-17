import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
  transformResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import {
  IGetManyResourcesQuery,
  IGetManyResourceQueryResult,
  IGenericFilter,
  IGetOneResourceQuery,
} from '@/types/api';
import { IProrityDTO } from '@/types/dto/priority';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListPriority: builder.query<
      IGetManyResourceQueryResult<IProrityDTO>,
      IGetManyResourcesQuery<IGenericFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.PRIORITY);
        return request;
      },
      providesTags: (result, error) => (error ? [] : [{ type: RESOURCES.PRIORITY }]),
      transformResponse: transformListResponseGeneric,
    }),
    getOnePriority: builder.query<IProrityDTO, IGetOneResourceQuery>({
      query: ({ id }) => ({
        url: `${RESOURCES.PRIORITY}/${id}`,
        method: 'GET',
        useAsync: true,
        useHospitalID: true,
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: RESOURCES.PRIORITY, id: result?.id }],
      transformResponse: transformResponseGeneric,
    }),
  }),
});

export const getListPriorityApi = api.endpoints.getListPriority;

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetListPriorityQuery,
  useLazyGetListPriorityQuery,
  useGetOnePriorityQuery,
} = api;
