import { securedApi } from '@/lib/api';
import { transformResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { BaseEntity } from '@/types';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteStudy: builder.mutation<
      BaseEntity['id'],
      { orderID: BaseEntity['id']; studyID: BaseEntity['id'] }
    >({
      query: ({ orderID, studyID }) => ({
        url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.STUDY}/${studyID}`,
        method: 'DELETE',
        useAsync: true,
        useHospitalID: true,
      }),
      invalidatesTags: (result, error, arg) =>
        error
          ? []
          : [
              { type: RESOURCES.ORDER, id: 'LIST' },
              { type: RESOURCES.ORDER, id: arg.orderID },
              { type: RESOURCES.ORDER_STATUS }, // fetch lai API orderStatus
            ],
      transformResponse: transformResponseGeneric,
    }),
    getOneDicom: builder.mutation<
      Blob,
      {
        studyID: BaseEntity['id'];
        contentType?: string; // convert to blob if pass
      }
    >({
      query: ({ studyID }) => ({
        url: `${RESOURCES.STUDY}/${studyID}/download`,
        method: 'GET',
        responseType: 'blob',
        useAsync: true,
        useHospitalID: true,
      }),
      // transformResponse: (res) => {
      //   return new Blob([res as ArrayBuffer], { type: 'application/zip' });
      // },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useDeleteStudyMutation, useGetOneDicomMutation } = api;
