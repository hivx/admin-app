import { useEffect } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { useCurrentOrderID } from '@/features/order';
import {
  selectCurrentActiveReportID,
  selectCurrentRequestID,
  setCurrentActiveReportID,
} from '@/stores/OrderRadiology';

import { useAppDispatch, useAppSelector } from '..';

/**
 * Hook set currentActiveReportID để có report mặc định hiển thị khi Mở ca
 */
export const useRequestAndCurrentActiveRadiologyReport = () => {
  const orderID = useCurrentOrderID();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));
  const currentActiveReportID = useAppSelector(selectCurrentActiveReportID(orderID));
  const dispatch = useAppDispatch();
  const { data: order } = useGetOneOrderQuery({ id: orderID });
  const currentRequest = order?.requests?.find((request) => request.id === requestID);

  useEffect(() => {
    /**
     * set currentActiveReport nếu request có finalReportID và currentActiveReportID hiện tại chưa có
     */
    if (currentRequest?.finalReportID && !currentActiveReportID) {
      dispatch(
        setCurrentActiveReportID({
          orderID,
          activeReportID: currentRequest.finalReportID,
        }),
      );
    }
  }, [currentActiveReportID, currentRequest, dispatch, orderID]);

  return requestID;
};
