import React from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  selectCurrentRequestID,
  setCurrentActiveReportID,
  setCurrentRequestID,
} from '@/stores/OrderRadiology';
import { BaseEntity } from '@/types';
import { IOrderRequestDTO } from '@/types/dto';

import { RadiologyReportActionButtons } from '../../../RadiologyReport/Buttons/RadiologyReportActionButtons';
import { RadiologyReportPanelContent } from '../../../RadiologyReport/Panel/RadiologyReportPanelContent';
import { RadiologyReportPanelHeader } from '../../../RadiologyReport/Panel/RadiologyReportPanelHeader';
import { RadiologyReportMain } from '../../../RadiologyReport/RadiologyReportMain';

import { RadiologyReportShell } from './RadiologyReportShell';

/**
 * Quick radiology report in bottom panel
 */

export const PanelRadiologyReportMain = ({ orderID }: { orderID: BaseEntity['id'] }) => {
  const dispatch = useAppDispatch();
  const currentRequestID = useAppSelector(selectCurrentRequestID(orderID));
  const { data: order } = useGetOneOrderQuery({ id: orderID });
  const currentRequest = order?.requests?.find(
    (request) => request.id === currentRequestID,
  );

  /**
   * alway show report content in editor if currentRequest.finalReportID !== null
   */
  if (currentRequest?.finalReportID) {
    dispatch(
      setCurrentActiveReportID({ orderID, activeReportID: currentRequest.finalReportID }),
    );
  }

  const handleRequestChange = (newRequest: IOrderRequestDTO) => {
    if (orderID) {
      dispatch(setCurrentRequestID({ orderID, requestID: newRequest.id }));
    }
  };

  return (
    <RadiologyReportMain
      orderID={orderID}
      callbacks={{
        onReportApproved: () => {},
        onClose: () => {},
      }}
      ReportComponent={
        <RadiologyReportShell
          ReportHeader={
            <RadiologyReportPanelHeader
              ActionButtons={<RadiologyReportActionButtons />}
            />
          }
          ReportContent={
            <RadiologyReportPanelContent
              isQuickReportTab={true}
              onRequestChange={handleRequestChange}
            />
          }
          // BottomFieldsPanel={
          //   <BottomFieldsPanel
          //     isQuickReportTab={true}
          //     onRequestChange={handleRequestChange}
          //   />
          // }
        />
      }
    />
  );
};
