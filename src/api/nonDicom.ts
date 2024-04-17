import { securedApi } from '@/lib/api';
import { transformResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { BaseEntity } from '@/types';
import { IUploadDicomDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Return epoch time
     */
    uploadNonDicom: builder.mutation<
      BaseEntity['id'],
      { orderID: BaseEntity['id'] } & IUploadDicomDTO
    >({
      query: ({ orderID, ...uploadNonDicomData }) => {
        const { newSeries, modalityID, files } = uploadNonDicomData;
        const formData = new FormData();
        if (files && files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
          }
        }
        formData.append('newSeries', newSeries.toString());
        formData.append('modalityID', modalityID.toString());
        return {
          url: `${RESOURCES.ORDER}/${orderID}/${RESOURCES.NON_DICOM}`,
          method: 'POST',
          data: formData,
          useAsync: true,
          useHospitalID: true,
        };
      },
      // headers: { 'content-type': 'multipart/form-data' },
      invalidatesTags: (result, error, arg) =>
        error
          ? []
          : [{ type: RESOURCES.NON_DICOM }, { type: RESOURCES.ORDER, id: arg.orderID }],
      transformResponse: transformResponseGeneric,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUploadNonDicomMutation } = api;
