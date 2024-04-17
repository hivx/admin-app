import { useGetOneOrderQuery } from '@/api/order';
import { useRadiologyReportFunctions } from '@/features/order';
import { useHospitalProvider } from '@/providers/HospitalConfigProvider';
import { BaseEntity } from '@/types';

import { useModalityTypeConfig } from './useModalityTypeConfig';

export const useConsumableBeforeApprove = ({
  orderID,
}: {
  orderID: BaseEntity['id'];
}) => {
  const { data: order } = useGetOneOrderQuery({ id: orderID });

  const { isRequireConsumable: hospitalRequireConsumable } = useHospitalProvider();
  const radiologyReportFunc = useRadiologyReportFunctions();
  const { requireConsumable: modalityTypeRequireConsumable } = useModalityTypeConfig({
    orderModalityType: order?.modalityType,
  });

  const requireConsumable = hospitalRequireConsumable && modalityTypeRequireConsumable;

  /**
   * Mở popup VTTH khi click nút duyệt ca,
   */
  const openModalRequireConsumableInfomation = async () => {
    radiologyReportFunc.openModalMedicalEquipment &&
      radiologyReportFunc.openModalMedicalEquipment(true);
  };
  return { requireConsumable, openModalRequireConsumableInfomation };
};
