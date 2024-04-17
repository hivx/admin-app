import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetOneOrderQuery } from '@/api/order';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { RadiologyReportProvider } from '@/features/order';
import { IRadiologyReportCallbacks } from '@/hooks/radiology/useRadiologyReport';
import { BaseEntity } from '@/types';
import { IOrderDTO } from '@/types/dto';

import { OrderInfomationMain } from './orderInfomation/OrderInfomationMain';
import { MobileRadiologyReportMain } from './radiologyReport/MobileRadiologyReportMain';

export enum PAGE_ID {
  INFOMATION_PAGE = 'INFOMATION_PAGE',
  RADIOLOGY_PAGE = 'RADIOLOGY_PAGE',
}
/**
 * Chuẩn bị data chung cho màn Viết KQ
 */
export const MobileRadiologyReportPage = () => {
  const { orderID = 'NaN' } = useParams();
  const id: BaseEntity['id'] = parseInt(orderID);
  const { data: order } = useGetOneOrderQuery({ id });

  const [currentPage, setCurrentPage] = useState<PAGE_ID>(PAGE_ID.INFOMATION_PAGE);

  const handleMobileReportApproved: IRadiologyReportCallbacks['onReportApproved'] =
    () => {
      setCurrentPage(PAGE_ID.INFOMATION_PAGE);
    };

  const renderPage = (
    order: IOrderDTO,
    setCurrentPage: React.Dispatch<React.SetStateAction<PAGE_ID>>,
  ) => {
    switch (currentPage) {
      case PAGE_ID.INFOMATION_PAGE:
        return <OrderInfomationMain order={order} setCurrentPage={setCurrentPage} />;
      case PAGE_ID.RADIOLOGY_PAGE:
        return (
          <MobileRadiologyReportMain order={order} setCurrentPage={setCurrentPage} />
        );
    }
  };

  return (
    <>
      {!isNaN(id) && order ? (
        <RadiologyReportProvider
          order={order}
          callbacks={{
            onReportApproved: handleMobileReportApproved,
            onClose: () => {},
          }}
        >
          {renderPage(order, setCurrentPage)}
        </RadiologyReportProvider>
      ) : (
        <FullPageSpinner />
      )}
    </>
  );
};
