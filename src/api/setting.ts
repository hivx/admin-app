import { securedApi } from '@/lib/api';
import { transformResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { ICreateUpdateSettingDTO, ISettingDTO } from '@/types/dto/setting';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneUserSettingByID: builder.query<ISettingDTO, { id: ISettingDTO['id'] }>({
      query: (arg) => {
        return {
          url: `${RESOURCES.SETTING}/${arg.id}`,
          method: 'GET',
          useAsync: true,
          useHospitalID: true,
        };
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * provides a general 'store' tag for the whole list, as well as a specific
       * {type: 'store', id} tag for each received post object
       */
      providesTags: (result) =>
        result
          ? [
              {
                type: RESOURCES.SETTING,
                id: result?.id,
              },
            ]
          : [],
      transformResponse: transformResponseGeneric,
    }),
    updateUserSetting: builder.mutation<string, ICreateUpdateSettingDTO>({
      query: (data) => ({
        url: RESOURCES.SETTING,
        method: 'PUT',
        data,
        useAsync: true,
        useHospitalID: true,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: RESOURCES.SETTING, id: arg.id }],
    }),
  }),
});

export const {
  useGetOneUserSettingByIDQuery,
  useLazyGetOneUserSettingByIDQuery,
  useUpdateUserSettingMutation,
} = api;
