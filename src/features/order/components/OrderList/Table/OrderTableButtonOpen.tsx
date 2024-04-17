import React, { FC } from 'react';

import { ItechOpenOrderIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { HOTKEYS } from '@/config';
import { useKeybinds, useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';

import { useOpenOrderInNewTab } from '../../../hooks/useOpenOrderInNewTab';

type OrderTableButtonOpenProps = {
  disabled?: boolean;
  order?: IOrderDTO | null;
  enableKeybind?: boolean;
};

export const OrderTableButtonOpen: FC<OrderTableButtonOpenProps> = (props) => {
  const { order, enableKeybind = false } = props;
  const translate = useTranslate();
  const iconColor = props.disabled ? 'disabled' : 'action';
  const handleOpenOrderInNewTab = useOpenOrderInNewTab({
    order,
  });
  useKeybinds(
    enableKeybind ? HOTKEYS.OPEN_ORDER.key : undefined,
    () => {
      handleOpenOrderInNewTab();
    },
    { disabled: props.disabled },
  );

  return (
    <IconButtonWithToolTip
      title={
        enableKeybind
          ? translate.buttons.labelWithKeyBind({
              buttonName: translate.buttons.openOrder(),
              key: HOTKEYS.OPEN_ORDER.title,
            })
          : translate.buttons.openOrder()
      }
      disabled={props.disabled}
      onClick={handleOpenOrderInNewTab}
    >
      <TableSVGIcon
        IconComponent={ItechOpenOrderIcon}
        IconComponentProps={{ color: iconColor }}
      />
    </IconButtonWithToolTip>
  );
};
