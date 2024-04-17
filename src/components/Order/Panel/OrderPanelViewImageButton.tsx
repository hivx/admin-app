import { IOrderDTO } from '@/types/dto';

import { ButtonViewImageWithOrder } from '../Buttons/ButtonViewImageWithOrder';

export const OrderPanelViewImageButton = ({ order }: { order?: IOrderDTO }) => {
  return <ButtonViewImageWithOrder order={order} />;
};
