import { FC, PropsWithChildren, ReactNode, useEffect } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { IRadiologyReportCallbacks } from '@/hooks/radiology/useRadiologyReport';
import {
  selectRadiologyReportIsEditable,
  setCurrentActiveReportID,
} from '@/stores/OrderRadiology';
import { BaseEntity } from '@/types';
import { IOrderDTO } from '@/types/dto';

import { RadiologyReportProvider } from '../../providers/RadiologyReportProvider';

type RadiologyReportMainProps = {
  orderID: BaseEntity['id'];
  reportID?: BaseEntity['id'];
  ReportComponent: ReactNode;
  /**
   * Callbacks
   */
  /**
   * Run when the user approve a report
   */
  callbacks: IRadiologyReportCallbacks;
};

/**
 * Initialize and prepare report data for its components
 * We set the data in Redux to let the child components have access to those data
 * By doing this way, we can use ANY Report UI Component, therefore, we can both write report in
 * Modals, in Order Detail Page, or in Mobile
 */
export const RadiologyReportMain: FC<RadiologyReportMainProps> = (props) => {
  const { orderID, reportID, ReportComponent, callbacks } = props;
  // const [trigger, { data: order, isFetching }] = useLazyGetOneOrderQuery();
  // don't need to lazy load because we did it when validating
  const { data: order } = useGetOneOrderQuery({ id: orderID });

  return order ? (
    <RadiologyReportContent order={order} callbacks={callbacks} reportID={reportID}>
      {ReportComponent}
    </RadiologyReportContent>
  ) : (
    <FullPageSpinner />
  );
};

/**
 * After receving order object, we can initialize data here
 */
const RadiologyReportContent: FC<
  PropsWithChildren<
    { order: IOrderDTO; reportID?: BaseEntity['id'] } & {
      callbacks: RadiologyReportMainProps['callbacks'];
    }
  >
> = (props) => {
  const { order, callbacks, children, reportID } = props;
  const dispatch = useAppDispatch();
  const isEditable = useAppSelector(selectRadiologyReportIsEditable(order.id));

  useEffect(() => {
    if (isEditable) {
      dispatch(setCurrentActiveReportID({ orderID: order.id, activeReportID: null }));
    }
  }, [dispatch, isEditable, order.id]);

  return (
    <RadiologyReportProvider order={order} reportID={reportID} callbacks={callbacks}>
      {children}
    </RadiologyReportProvider>
  );
};
