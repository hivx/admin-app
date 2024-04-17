import { FC, PropsWithChildren } from 'react';

import { HOTKEYS } from '@/config';
import { useAppDispatch, useTranslate } from '@/hooks';
import { useUserPermission } from '@/providers/AuthProvider';
import { toggleIsOrderPanelOpen } from '@/stores/OrderRadiology';
import { IOrderDTO } from '@/types/dto';
import { IRenderActionButton } from '@/types/order/buttons';

type OrderPanelQuickRadiologyButtonProps = {
  order?: IOrderDTO;
  renderButton: IRenderActionButton;
} & PropsWithChildren;

/**
 * Nút Bật/tắt panel đọc ca
 */
export const OrderPanelQuickRadiologyButton: FC<OrderPanelQuickRadiologyButtonProps> = (
  props,
) => {
  const { order, renderButton } = props;
  const dispatch = useAppDispatch();
  const translate = useTranslate();
  const userPermissions = useUserPermission();

  const disabled = !order || !userPermissions?.userCanLockOrder;

  //   useKeybinds(
  //     HOTKEYS.QUICK_REPORT.key,
  //     () => {
  //     },
  //     { disabled },
  //   );

  return renderButton({
    onClick: () => dispatch(toggleIsOrderPanelOpen()),
    title: translate.buttons.labelWithKeyBind({
      buttonName: translate.buttons.quickReport(),
      key: HOTKEYS.QUICK_REPORT.title,
    }),
    disabled,
  });
};
