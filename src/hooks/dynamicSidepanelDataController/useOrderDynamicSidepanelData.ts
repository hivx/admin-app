import { skipToken } from '@reduxjs/toolkit/dist/query';
import { ComponentProps, useEffect, useState } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { useGetOneOrderRequestQuery } from '@/api/orderRequest';
import { OrderPanelRequest } from '@/components/Order/Panel/OrderPanelRequest';
import { getApprovedRequests } from '@/lib/dataHelper/radiologyReport/getApprovedRequests';
import { setCurrentRequestID } from '@/stores/OrderRadiology';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';

import { useAppDispatch } from '..';

type IUseOrderDynamicSidepanelData = {
  /**
   * Main input of this hook
   */
  order?: IOrderDTO;
};
/**
 * This hook is used to control the data that the Order-based sidepanels will use
 * Since we have many requests and reports within an order, we need
 * to create a hook to return what is the currently active request or report
 * @returns current state and setters for child panels to update parent data
 */
export const useOrderDynamicSidepanelData = (options: IUseOrderDynamicSidepanelData) => {
  const { order: orderListRowSelected } = options;
  const dispatch = useAppDispatch();
  const [requestID, setRequestID] = useState<IOrderRequestDTO['id']>();
  const [reportID, setReportID] = useState<IOrderRequestDTO['id']>();
  const [orderID, setOrderID] = useState<IOrderDTO['id'] | undefined>(
    orderListRowSelected?.id,
  );

  const { data: order } = useGetOneOrderQuery(orderID ? { id: orderID } : skipToken);
  const { data: request } = useGetOneOrderRequestQuery(
    { orderID: orderID ?? 0, requestID: requestID ?? 0 },
    { skip: !requestID || !orderID },
  );
  /**
   * If order list row change will set order id
   */
  useEffect(() => {
    if (orderListRowSelected?.id) {
      setOrderID(orderListRowSelected?.id);
    }
  }, [orderListRowSelected]);
  /**
   * If orderID changed, we set default requestID
   */
  useEffect(() => {
    if (order?.id) {
      /**
       * If not current selected request
       * Default request is the first approved request
       */
      if (!request) {
        const approvedRequest = order && getApprovedRequests(order)[0];
        if (approvedRequest) {
          setRequestID(approvedRequest.id);
          /**
           * Default report is the finalReportID of that request
           */
          const reportID = approvedRequest.finalReportID ?? undefined;
          setReportID(reportID);
        }
      }

      dispatch(
        setCurrentRequestID({
          orderID: order.id,
          requestID: request?.id ?? order.requests?.[0]?.id ?? 0,
        }),
      );
    }
  }, [dispatch, order, request, request?.id]);

  const onReportChanged: ComponentProps<typeof OrderPanelRequest>['onReportChanged'] = (
    reportID,
    requestID,
  ) => {
    setRequestID(requestID);
    dispatch(setCurrentRequestID({ orderID: order?.id ?? 0, requestID }));
    setReportID(reportID);
  };

  const onRequestChanged: ComponentProps<typeof OrderPanelRequest>['onRequestChanged'] = (
    requestID,
  ) => {
    const request = order?.requests?.find((item) => item.id === requestID);
    setRequestID(requestID);
    dispatch(setCurrentRequestID({ orderID: order?.id ?? 0, requestID }));
    if (request?.finalReportID) {
      setReportID(request?.finalReportID);
    } else {
      setReportID(undefined);
    }
  };

  const onOrderChanged = (order: IOrderDTO) => {
    setOrderID(order.id);
  };

  return {
    order,
    request,
    reportID,
    setRequestID,
    setReportID,
    onReportChanged,
    onRequestChanged,
    onOrderChanged,
  };
};
