import React, { ComponentProps, ReactNode } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { PrintImageIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { OrderPrintImageModal } from '@/components/Order/PrintDicomModal/OrderPrintImageModal';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { HOTKEYS } from '@/config';
import { useDisclosure, useKeybinds, useTranslate } from '@/hooks';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO } from '@/types/dto';

import { useCurrentOrderID } from '../../../../order/providers';
import { usePrintDicomButtonState } from '../../../hooks/usePrintDicomButtonState';

type PrintImageButtonProps = {
  /**
   * If a list of orders is provided, use this list instead of fetching current order under RadiologyReportProvider
   */
  orders?: IOrderDTO[];
  IconComponent?: ReactNode;
  // viewImageProps?: ComponentProps<typeof IconButtonWithToolTip>;
} & ComponentProps<typeof IconButtonWithToolTip>;

export const PrintImageButton = (props: PrintImageButtonProps) => {
  const disclosure = useDisclosure();
  const translate = useTranslate();
  const orderID = useCurrentOrderID();
  const { data: order } = useGetOneOrderQuery({ id: orderID });
  const buttonState = usePrintDicomButtonState(order);

  useKeybinds(HOTKEYS.PRINT_DICOM_IMAGE.key, () => disclosure.open(), {
    disabled: buttonState === BUTTON_STATE.DISABLED,
  });
  return (
    <>
      <IconButtonWithToolTip
        title={translate.buttons.labelWithKeyBind({
          buttonName: translate.buttons.printDicomImage(),
          key: HOTKEYS.PRINT_DICOM_IMAGE.title,
        })}
        onClick={() => disclosure.open()}
        color="inherit"
        disabled={buttonState === BUTTON_STATE.DISABLED}
        {...props}
      >
        <TableSVGIcon IconComponent={PrintImageIcon} />
      </IconButtonWithToolTip>
      <OrderPrintImageModal disclosure={disclosure} orderID={orderID} />
    </>
  );
};
