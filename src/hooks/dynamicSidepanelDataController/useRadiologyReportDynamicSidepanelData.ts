import { ComponentProps, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useGetOneOrderQuery } from '@/api/order';
import { OrderPanelRequest } from '@/components/Order/Panel/OrderPanelRequest';
import { useCurrentOrderID } from '@/features/order';
import { getApprovedRequests } from '@/lib/dataHelper/radiologyReport/getApprovedRequests';
import {
  selectCurrentRadiologyReportID,
  selectCurrentRequestID,
  setCurrentRequestID,
  setCurrentActiveReportID,
  selectCurrentActiveReportID,
} from '@/stores/OrderRadiology';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';

import { useAppSelector } from '..';

/**
 * This hook is used to control the data that the radiology report-base sidepanels will use
 * Since we have many requests and reports within an order, we need
 * to create a hook to return what is the currently active request or report
 * @returns current state and setters for child panels to update parent data
 */
export const useRadiologyReportDynamicSidepanelData = () => {
  const currentOrderID = useCurrentOrderID();
  const dispatch = useDispatch();

  const [orderID, setOrderID] = useState<IOrderDTO['id']>(currentOrderID);

  const currentActiveReportID =
    useAppSelector(selectCurrentActiveReportID(currentOrderID)) ?? undefined;

  const { data: order } = useGetOneOrderQuery({ id: orderID });
  const currentRequestID = useAppSelector(selectCurrentRequestID(orderID ?? 0));
  const request = order?.requests?.find((request) => request.id === currentRequestID);
  const currentReportID =
    useAppSelector(
      selectCurrentRadiologyReportID({
        orderID: currentOrderID,
        requestID: currentRequestID,
      }),
    ) ?? currentActiveReportID;

  const approvedRequest = order && getApprovedRequests(order)[0];
  /**
   * TẠM THỜI DÙNG STATE LƯU REPORT ID currentReportIDState,
   * currentReportIDState DÙNG CHO KHUNG KẾT QUẢ ĐỌC CA,
   * KHÔNG CHUNG VỚI REPORT ID TRONG LOGIC fetchAndSetReport
   */
  const [currentReportIDState, setCurrentReportIDState] = useState<
    IOrderRequestDTO['id'] | undefined
  >(approvedRequest?.finalReportID ?? currentReportID);

  /**
   * If order list row change will set order id
   */
  useEffect(() => {
    if (orderID) {
      setOrderID(orderID);
    }
  }, [orderID]);

  const onReportChanged: ComponentProps<typeof OrderPanelRequest>['onReportChanged'] = (
    reportID,
    requestID,
  ) => {
    if (order?.id) {
      dispatch(setCurrentRequestID({ orderID: order.id, requestID }));
      dispatch(setCurrentActiveReportID({ orderID: order.id, activeReportID: reportID }));
      setCurrentReportIDState(reportID);
    }
  };

  const onRequestChanged: ComponentProps<typeof OrderPanelRequest>['onRequestChanged'] = (
    requestID,
  ) => {
    if (order?.id) {
      const request = order?.requests?.find((item) => item.id === requestID);
      dispatch(setCurrentRequestID({ orderID: order.id, requestID }));
      if (request?.finalReportID) {
        setCurrentReportIDState(request?.finalReportID);
      } else {
        setCurrentReportIDState(undefined);
      }
      dispatch(setCurrentActiveReportID({ orderID: order.id, activeReportID: null }));
    }
  };

  const onOrderChanged = (order: IOrderDTO) => {
    setOrderID(order.id);
  };

  return {
    order,
    request,
    currentActiveReportID,
    reportID: currentReportIDState,
    onReportChanged,
    onOrderChanged,
    onRequestChanged,
  };
};
