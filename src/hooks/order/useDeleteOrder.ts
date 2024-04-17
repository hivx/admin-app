import { Icon } from '@mui/material';
import { ComponentProps } from 'react';

import { useDeleteOrderMutation } from '@/api/order';
import { HOTKEYS } from '@/config';
import { useUserPermission } from '@/providers/AuthProvider';
import {
  useGenericNotifySnackbar,
  useNotifyModal,
} from '@/providers/NotificationProvider';
import { IOrderDTO } from '@/types/dto';

import { useKeybinds } from '../useKeybinds';
import { useTranslate } from '../useTranslate';

/**
 * Hook to get func and status of create order button
 */
export const useDeleteOrder = (order: IOrderDTO, onSuccessCallback?: () => void) => {
  const userPermisions = useUserPermission();
  const translate = useTranslate();
  const [deleteOrder] = useDeleteOrderMutation();
  const notifyModal = useNotifyModal();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.studyInfo.study().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.studyInfo.study().toLowerCase(),
    }),
  );
  const hasStudy = !!order?.study?.id && !!order?.id;
  /**
   * enabled button xoá chỉ định
   */
  const orderCanDelete =
    !hasStudy &&
    (order?.creationType === 'HIS' || order?.creationType === 'RIS') &&
    userPermisions?.userCanDeleteOrder;

  const handleDeleteOrder = async () => {
    onSuccessCallback && onSuccessCallback();
    notifyModal({
      message: `${translate.messages.notification.deleteOrder({
        name: `${order.patient?.fullname}`,
      })}`,
      options: {
        variant: 'warning',
        onConfirm: async () => {
          const res = await deleteOrder(order.id);
          if ('error' in res) {
            notifyError();
          } else {
            notifySuccess();
          }
        },
      },
    });
  };

  /**
   * Conditions:
   * - Order create from HIS/RIS
   * - No study
   * - User permission delete order
   */
  const buttonIsActive = orderCanDelete;
  const iconColor: ComponentProps<typeof Icon>['color'] = buttonIsActive
    ? 'action'
    : 'disabled';

  useKeybinds(HOTKEYS.ORDER_DELETE.key, () => handleDeleteOrder(), {
    disabled: !buttonIsActive,
  });
  return { buttonIsActive, iconColor, handleDeleteOrder };
};
