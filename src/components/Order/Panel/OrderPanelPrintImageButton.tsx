import React from 'react';

import { PrintImageIcon } from '@/assets/icon';
import { DynamicPanelHeaderButton } from '@/components/Layout/DynamicSidepanel/DynamicPanelHeaderButton';
import { HOTKEYS } from '@/config';
import { useKeybinds, useTranslate } from '@/hooks';
import { useOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO } from '@/types/dto';

import { usePrintDicomButtonState } from '../../../features/order/hooks/usePrintDicomButtonState';

export type OrderPanelPrintImageButtonProps = {
  order?: IOrderDTO;
};

const OrderPanelPrintImageButton = (props: OrderPanelPrintImageButtonProps) => {
  const { order } = props;
  const translate = useTranslate();
  const orderListFunctions = useOrderListFunctions();
  const buttonPrintDicomState = usePrintDicomButtonState(order);

  const disabled = buttonPrintDicomState === BUTTON_STATE.DISABLED;

  useKeybinds(
    HOTKEYS.PRINT_DICOM_IMAGE.key,
    () => orderListFunctions.openPrintImageModal(order?.id),
    {
      disabled: disabled,
    },
  );

  return (
    <DynamicPanelHeaderButton
      title={`${translate.buttons.printDicomImage()} (${
        HOTKEYS.PRINT_DICOM_IMAGE.title
      })`}
      onClick={() => orderListFunctions.openPrintImageModal(order?.id)}
      disabled={disabled}
      IconComponent={PrintImageIcon}
    />
  );
};

export default OrderPanelPrintImageButton;
