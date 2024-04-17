import React, { FC } from 'react';

import { MenuIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { ActionComponentWithMenu } from '@/components/Table/ActionComponentWithMenu';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useTranslate } from '@/hooks';

import { OrderTableMenu } from './OrderTableMenu';

type OrderTableButtonMenuProps = {
  disabled?: boolean;
};

const OrderTableButtonMenu: FC<OrderTableButtonMenuProps> = (props) => {
  const translate = useTranslate();
  const iconColor = props.disabled ? 'disabled' : 'action';
  return (
    <>
      <ActionComponentWithMenu
        disabled={props.disabled}
        ActionComponent={
          <IconButtonWithToolTip
            title={translate.buttons.menu()}
            disabled={props.disabled}
          >
            <TableSVGIcon
              IconComponent={MenuIcon}
              IconComponentProps={{ color: iconColor }}
            />
          </IconButtonWithToolTip>
        }
        ListMenu={<OrderTableMenu />}
      />
    </>
  );
};

export default OrderTableButtonMenu;
