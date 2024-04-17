import { FC, PropsWithChildren } from 'react';

import { HOTKEYS } from '@/config';
import { useKeybinds, useTranslate } from '@/hooks';
import { useUserPermission } from '@/providers/AuthProvider';
import { useOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';
import { IOrderDTO } from '@/types/dto';
import { IRenderActionButton } from '@/types/order/buttons';

type OrderTableButtonQuickLockProps = {
  order?: IOrderDTO;
  renderButton: IRenderActionButton;
} & PropsWithChildren;

export const OrderTableButtonQuickLock: FC<OrderTableButtonQuickLockProps> = (props) => {
  const { order, renderButton } = props;
  const translate = useTranslate();
  const userPermissions = useUserPermission();
  const disabled = !order || !userPermissions?.userCanLockOrder;

  const orderListFunctions = useOrderListFunctions();
  // QUICK LOCK ORDER
  useKeybinds(
    HOTKEYS.QUICK_REPORT.key,
    () => {
      orderListFunctions.openQuickReportModal(props.order?.id);
    },
    { disabled },
  );

  return renderButton({
    onClick: () => orderListFunctions.openQuickReportModal(order?.id),
    title: translate.buttons.labelWithKeyBind({
      buttonName: translate.buttons.quickReport(),
      key: HOTKEYS.QUICK_REPORT.title,
    }),
    disabled,
  });
};
