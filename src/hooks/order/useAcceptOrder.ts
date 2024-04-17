import { useAcceptOrderMutation } from '@/api/order';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IOrderDTO } from '@/types/dto';

import { useTranslate } from '../useTranslate';

type useAcceptOrder = {
  order?: IOrderDTO;
};
/**
 * hook dùng cho nút Tiếp nhận
 */
export const useAcceptOrder = ({ order }: useAcceptOrder) => {
  const [trigger] = useAcceptOrderMutation();
  const translate = useTranslate();
  const notifySuccess = useGenericNotifySnackbar('success', translate.buttons.accept());
  const notifyError = useGenericNotifySnackbar('error', translate.buttons.accept());
  const isShowButtonAcceptOrder = order?.reportStatus === 'NOT_READY';

  const onAcceptOrder = async () => {
    if (order) {
      const res = await trigger(order.id);
      if ('error' in res) {
        notifyError();
      } else {
        notifySuccess();
      }
    }
  };
  return { onAcceptOrder, isShowButtonAcceptOrder };
};
