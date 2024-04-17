import { useUserPermission } from '@/providers/AuthProvider';
import { IOrderDTO, ORDER_CREATION_TYPE } from '@/types/dto';

/**
 * Trả ra trạng thái hiển thị hoặc không của 3 nút :
 * Thay đổi,Cập nhật, Xóa dùng trong StudyInfoModal
 */
export const useStudyInfoModalButtonState = ({
  order,
  isEditPatientInfo,
  isEditOrderInfo,
}: {
  order?: IOrderDTO;
  isEditPatientInfo: boolean;
  isEditOrderInfo: boolean;
}) => {
  const userPermissions = useUserPermission();

  const requests = order?.requests ?? [];
  const existRequestAprroved = !!requests.find((request) => request.finalApprovedTime);
  /**
   * Status show/hide for delete button
   */
  const isShowButtonDelete =
    !order?.study?.id &&
    !existRequestAprroved &&
    !isEditPatientInfo &&
    !isEditOrderInfo &&
    userPermissions?.userCanDeleteOrder;

  /**
   * Status show/hide for update button
   */
  const isShowButtonUpdate = !isEditPatientInfo && isEditOrderInfo;

  /**
   * Status show/hide for edit button
   */
  const isShowButtonEdit =
    !isEditPatientInfo &&
    !isEditOrderInfo &&
    userPermissions?.userCanEditOrder &&
    order?.creationType !== ORDER_CREATION_TYPE.HIS;

  return {
    isShowButtonDelete,
    isShowButtonUpdate,
    isShowButtonEdit,
  };
};
