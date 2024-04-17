import React from 'react';
import { useNavigate } from 'react-router-dom';
import urlJoin from 'url-join';

import { ItechOpenOrderIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';

import { ROUTE_ORDER_LIST } from '../../routes';

type OpenOrderActionButtonType = {
  order?: IOrderDTO;
};

/**
 * Nút mở ca
 * Chuyển hướng đến url trang thông tin ca chụp
 */
export const OpenOrderActionButton = (props: OpenOrderActionButtonType) => {
  const { order } = props;
  const navigate = useNavigate();
  const disabled = !order;
  const translate = useTranslate();
  const onClick = () => {
    if (order) {
      const href = urlJoin(ROUTE_ORDER_LIST, String(order.id));
      navigate(href);
    }
  };
  return (
    <IconButtonWithToolTip
      onClick={onClick}
      title={translate.buttons.openOrder()}
      disabled={disabled}
    >
      <TableSVGIcon IconComponent={ItechOpenOrderIcon} />
    </IconButtonWithToolTip>
  );
};
