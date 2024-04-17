import { useAppSelector } from '@/hooks';
import { useOrderLockState } from '@/hooks/lockOrder/useOrderLockState';
import { selectCurrentActiveReportID } from '@/stores/OrderRadiology';
import { IOrderDTO } from '@/types/dto';

export const useRadiologyEditorContent = (orderID: IOrderDTO['id']) => {
  const currentActiveReportID = useAppSelector(selectCurrentActiveReportID(orderID));
  const isLock = useOrderLockState({ orderID });
  /**
   * Dùng ở các component Kết quả,Kết luận,Đề nghị
   * Nếu order được khóa : isLock -> hiển thị dữ liệu
   * Nếu order không được khóa : !isLock & isDisplayReportWhenNotLock -> Hiển thị dữ liệu
   */
  const getContentDisplay = (content?: string) => {
    if (isLock) {
      return content;
    } else if (!isLock && currentActiveReportID) {
      return content;
    }
    return '';
  };

  return { getContentDisplay };
};
