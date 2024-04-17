import { FC } from 'react';

import { IOrderDTO } from '@/types/dto';

import CreateBookmarkFolderButton from './CreateBookmarkFolderButton';

type OrderBookmarkDynamicPanelActionButtonsProps = {
  order?: IOrderDTO;
};
export const OrderBookmarkDynamicPanelActionButtons: FC<
  OrderBookmarkDynamicPanelActionButtonsProps
> = (props) => {
  const { order } = props;
  return <CreateBookmarkFolderButton order={order} />;
};
