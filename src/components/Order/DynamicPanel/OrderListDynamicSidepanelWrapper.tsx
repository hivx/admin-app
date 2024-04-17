import { useGetOneOrderQuery } from '@/api/order';
import { useAppSelector } from '@/hooks';
import { getPanelOrderID } from '@/stores/OrderRadiology';

import { OrderListDynamicSidepanel } from './OrderListDynamicSidepanel';
//When record (row table) change we need to re-render side panel. This component prepare record if record change will re-render sidepanel, avoid the whole page being re-render

/**
 * Panel bên phải của màn Danh sách ca chụp
 */
const OrderListDynamicSidepanelWrapper = () => {
  const orderID = useAppSelector(getPanelOrderID);
  const { data: orderData } = useGetOneOrderQuery(
    { id: orderID ?? 0 },
    { skip: !orderID },
  );

  return <OrderListDynamicSidepanel key={orderData?.id} order={orderData} />;
};

export default OrderListDynamicSidepanelWrapper;
