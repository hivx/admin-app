import { securedApi } from '@/lib/api';
import { TransferStudyDTO } from '@/types/dto/transferStudy';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    transferStudy: builder.mutation<string, TransferStudyDTO>({
      query: (args) => {
        return {
          method: 'GET',
          url: `${RESOURCES.ORDER}/${args.orderID}/transferStudy/${args.storeID}`,
          useAsync: true,
          useHospitalID: true,
        };
      },
    }),
  }),
});

export const { useTransferStudyMutation } = api;
