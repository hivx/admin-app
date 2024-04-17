import { IOrderDTO } from '@/types/dto';

/**
 * Return approved requests for an order
 */
export const getApprovedRequests = (order: IOrderDTO) => {
  return order.requests?.filter((request) => request.finalApprover) || [];
};
