import { FC } from 'react';

import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';

type OrderNumberOfConsumablesProps = {
  order: IOrderDTO;
};
export const OrderNumberOfConsumables: FC<OrderNumberOfConsumablesProps> = (props) => {
  const { order } = props;
  let numberOfConsumables: IOrderRequestDTO['id'] = 0;
  order.requests?.map(
    (request) => (numberOfConsumables += request?.numOfConsumables ?? 0),
  );
  return <div>{numberOfConsumables}</div>;
};
