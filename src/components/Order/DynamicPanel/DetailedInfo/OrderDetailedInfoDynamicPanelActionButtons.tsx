import { FC } from 'react';

import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';

import { BookmarkActionButton } from './BookmarkActionButton';
import { PatientHistoryButton } from './PatientHistoryButton';
import { StudyInfoActionButton } from './StudyInfoActionButton';

type OrderReportDynamicPanelActionButtonsProps = {
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
};
export const OrderDetailedInfoDynamicPanelActionButtons: FC<
  OrderReportDynamicPanelActionButtonsProps
> = (props) => {
  const { order } = props;
  return (
    <>
      <StudyInfoActionButton order={order} />
      <PatientHistoryButton patient={order?.patient ?? null} />
      <BookmarkActionButton order={order} />
    </>
  );
};
