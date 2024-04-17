import { useGetOneOrderQuery } from '@/api/order';
import { IOrderDTO } from '@/types/dto';

/**
 *
 * @param orderID
 * @returns boolean : lock order state
 */
export const useOrderLockState = ({ orderID }: { orderID: IOrderDTO['id'] }) => {
  const { data: order } = useGetOneOrderQuery({ id: orderID });
  return !!order?.lockedBy;
};
