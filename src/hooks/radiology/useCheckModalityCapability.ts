import { useGetListCountRequestByModalityQuery } from '@/api/analytics';
import { useLazyGetOneModalityQuery } from '@/api/modality';
import { BaseEntity } from '@/types';

export const useCheckModalityCapability = () => {
  const { data } = useGetListCountRequestByModalityQuery(undefined);
  const listCountRequestByModality = data?.list;
  const [trigger] = useLazyGetOneModalityQuery();

  /**
   * Kiểm tra đã quá định mức máy hay chưa
   */
  const checkModalityCapability = async (modalityID?: BaseEntity['id']) => {
    if (modalityID) {
      const modality = await trigger({ id: modalityID }).unwrap();
      const currentTotal =
        listCountRequestByModality?.find((item) => item.id === modalityID)?.total ?? 0;
      if (modality.capability && modality.capability !== 0) {
        return currentTotal < modality.capability;
      }
      return true;
    }
    return false;
  };
  return checkModalityCapability;
};
