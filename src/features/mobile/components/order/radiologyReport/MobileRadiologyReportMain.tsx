import React, { FC } from 'react';

import { useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';

import { MobileLayout } from '../../layout/MobileLayout';
import { LayoutWithTopbarWrapper } from '../../topbar/LayoutWithTopbarWrapper';
import { PAGE_ID } from '../MobileRadiologyReportPage';

import { MobileRadiologyContent } from './MobileRadiologyContent';

type MobileRadiologyReportMainProps = {
  order: IOrderDTO;
  setCurrentPage: React.Dispatch<React.SetStateAction<PAGE_ID>>;
};
export const MobileRadiologyReportMain: FC<MobileRadiologyReportMainProps> = ({
  order,
  setCurrentPage,
}) => {
  const translate = useTranslate();
  const onBackward = () => {
    setCurrentPage(PAGE_ID.INFOMATION_PAGE);
  };
  return (
    <MobileLayout title={translate.pages.orderReport.orderInfo()}>
      <LayoutWithTopbarWrapper
        onBackward={onBackward}
        title={order?.patient?.fullname ?? ''}
        MainComponent={<MobileRadiologyContent order={order} />}
      />
    </MobileLayout>
  );
};
