import React, { ComponentProps, FC, ReactNode } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { ViewImageIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { HOTKEYS } from '@/config';
import { useKeybinds, useTranslate } from '@/hooks';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO } from '@/types/dto';

import useViewImageButton from '../../../../order/hooks/useViewImageButton';
import { useCurrentOrderID } from '../../../providers';

type ViewImageButtonProps = {
  /**
   * If a list of orders is provided, use this list instead of fetching current order under RadiologyReportProvider
   */
  orders?: IOrderDTO[];
  IconComponent?: ReactNode;
  enableKeybind?: boolean;
  // viewImageProps?: ComponentProps<typeof IconButtonWithToolTip>;
} & ComponentProps<typeof IconButtonWithToolTip>;

export const ViewImageButton: FC<ViewImageButtonProps> = (props) => {
  const {
    orders,
    IconComponent,
    enableKeybind = false,
    ...IconButtonWithToolTipProps
  } = props;
  const orderID = useCurrentOrderID();
  const { data: order } = useGetOneOrderQuery(
    { id: orderID },
    { skip: !orderID || !!orders?.length },
  );

  if (orders)
    return (
      <ImageButtonWithOrder
        orders={orders}
        Icon={IconComponent}
        enableKeybind={enableKeybind}
        {...IconButtonWithToolTipProps}
      />
    );

  if (!order)
    return (
      <ImageButtonWithOrder
        orders={[]}
        Icon={IconComponent}
        enableKeybind={enableKeybind}
        {...IconButtonWithToolTipProps}
      />
    );
  return (
    <ImageButtonWithOrder
      orders={[order]}
      Icon={IconComponent}
      enableKeybind={enableKeybind}
      {...IconButtonWithToolTipProps}
    />
  );
};

/**
 * UI
 */
const ImageButtonWithOrder = ({
  orders,
  Icon,
  enableKeybind,
  ...IconButtonWithToolTipProps
}: { orders: IOrderDTO[]; enableKeybind?: boolean } & {
  Icon?: ViewImageButtonProps['IconComponent'];
} & ComponentProps<typeof IconButtonWithToolTip>) => {
  const translate = useTranslate();
  const { buttonState, onClick } = useViewImageButton({ orders });

  useKeybinds(enableKeybind ? HOTKEYS.VIEW_IMAGE.key : undefined, () => {
    onClick();
  });

  return buttonState !== BUTTON_STATE.HIDDEN ? (
    <IconButtonWithToolTip
      title={
        enableKeybind
          ? translate.buttons.labelWithKeyBind({
              buttonName: translate.buttons.viewImage(),
              key: HOTKEYS.VIEW_IMAGE.title,
            })
          : translate.buttons.viewImage()
      }
      disabled={buttonState === BUTTON_STATE.DISABLED}
      onClick={onClick}
      {...IconButtonWithToolTipProps}
    >
      <TableSVGIcon IconComponent={ViewImageIcon} />
    </IconButtonWithToolTip>
  ) : (
    <></>
  );
};
