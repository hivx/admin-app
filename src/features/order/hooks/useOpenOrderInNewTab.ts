import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import urlJoin from 'url-join';

import { addTab } from '@/stores/tabs/tabSlice';
import { IOrderDTO } from '@/types/dto';

import { ROUTE_ORDER_LIST } from '../routes';

export const useOpenOrderInNewTab = ({
  order,
  callbackFunc,
}: {
  order?: IOrderDTO | null;
  callbackFunc?: () => void;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOpenOrderInNewTab = async () => {
    callbackFunc && callbackFunc();
    if (order) {
      const tabHref = urlJoin(ROUTE_ORDER_LIST, String(order.id));
      dispatch(
        addTab({
          id: order.id,
          label: order.patient?.fullname || '',
          href: tabHref,
        }),
      );
      navigate(tabHref);
    }
  };

  return handleOpenOrderInNewTab;
};
