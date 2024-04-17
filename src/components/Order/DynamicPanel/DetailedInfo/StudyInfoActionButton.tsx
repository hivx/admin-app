import { FC, useCallback } from 'react';

import ItechUpdateOrderInfo from '@/assets/icon/UpdateOrderInfo';
import { DynamicPanelHeaderButton } from '@/components/Layout/DynamicSidepanel/DynamicPanelHeaderButton';
import { HOTKEYS } from '@/config';
import { useTranslate } from '@/hooks';
import { useOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';
import { IOrderDTO } from '@/types/dto';

type StudyInfoActionButtonProps = {
  order?: IOrderDTO;
};
export const StudyInfoActionButton: FC<StudyInfoActionButtonProps> = (props) => {
  const { order } = props;
  const translate = useTranslate();
  const orderListFunctions = useOrderListFunctions();
  const disabled = !order;

  const handleClick = useCallback(() => {
    order && orderListFunctions.openStudyInfoModal(order.id);
  }, [order, orderListFunctions]);

  return (
    <DynamicPanelHeaderButton
      IconComponent={ItechUpdateOrderInfo}
      title={translate.buttons.labelWithKeyBind({
        buttonName: translate.buttons.requestInfo(),
        key: HOTKEYS.STUDY_INFO.title,
      })}
      disabled={disabled}
      onClick={handleClick}
    />
  );
};
