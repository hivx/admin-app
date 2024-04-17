import { Stack, styled } from '@mui/material';
import { FC } from 'react';

import ItechViewImageIcon from '@/assets/icon/ViewImageIcon';
import { MyButton } from '@/components';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { useAppSelector, useTranslate } from '@/hooks';
import { useDeleteLockOrder } from '@/hooks/lockOrder/useDeleteLockOrder';
import { useButtonImage } from '@/hooks/result/useButtonImage';
import {
  selectCurrentActiveReportID,
  selectCurrentRequestID,
} from '@/stores/OrderRadiology';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO } from '@/types/dto';

import { useMobileOrderInfomation } from '../../../hooks/useMobileOrderInfomation';
import { MobileIconButton } from '../../buttons/MobileIconButton';
import { MobileAttachmentButton } from '../../buttons/radiologyButton/MobileAttachmentButton';
import { MobileLayout } from '../../layout/MobileLayout';
import { LayoutWithTopbarWrapper } from '../../topbar/LayoutWithTopbarWrapper';
import { PAGE_ID } from '../MobileRadiologyReportPage';

import { OrderInfomationFields } from './OrderInfomationFields';

export type OrderInfomationMainProps = {
  order: IOrderDTO;
  setCurrentPage: React.Dispatch<React.SetStateAction<PAGE_ID>>;
};

/**
 * Màn thông tin ca chụp
 */
export const OrderInfomationMain: FC<OrderInfomationMainProps> = ({
  order,
  setCurrentPage,
}) => {
  const translate = useTranslate();
  const currentActiveReportID =
    useAppSelector(selectCurrentActiveReportID(order.id)) ?? undefined;
  const requestID = useAppSelector(selectCurrentRequestID(order.id));
  const request = order.requests?.find((request) => request.id === requestID);
  const { onClick: viewImage, buttonState } = useButtonImage({ order });
  const { deletable, deleteLockOrder } = useDeleteLockOrder(order.id);
  const {
    lockOrder,
    onReportChanged,
    navigateToRadiologyReport,
    onBackward,
    disableButtonLock,
  } = useMobileOrderInfomation({
    order,
    setCurrentPage,
  });

  return (
    <MobileLayout title={translate.pages.orderReport.orderInfo()}>
      {order ? (
        <LayoutWithTopbarWrapper
          onBackward={onBackward}
          title={order?.patient?.fullname ?? ''}
          MainComponent={
            <StyledOrderInfomationMain>
              <StyledButtonWrapper>
                {deletable ? (
                  <MyButton variant="contained" onClick={deleteLockOrder}>
                    {translate.pages.orderReport.actions.deleteLock()}
                  </MyButton>
                ) : (
                  <MyButton
                    variant="contained"
                    onClick={lockOrder}
                    disabled={disableButtonLock}
                  >
                    {translate.pages.orderReport.actions.lock()}
                  </MyButton>
                )}

                {deletable && (
                  <MyButton variant="contained" onClick={navigateToRadiologyReport}>
                    {translate.pages.orderReport.actions.writeReport()}
                  </MyButton>
                )}
                <MobileIconButton
                  IconComponent={<ItechViewImageIcon />}
                  onClick={viewImage}
                  disabled={buttonState === BUTTON_STATE.DISABLED}
                />
                <MobileAttachmentButton order={order} />
              </StyledButtonWrapper>
              <Stack>
                <OrderInfomationFields
                  order={order}
                  onReportChanged={onReportChanged}
                  request={request}
                  currentActiveReportID={currentActiveReportID}
                />
              </Stack>
            </StyledOrderInfomationMain>
          }
        />
      ) : (
        <FullPageSpinner />
      )}
    </MobileLayout>
  );
};

const StyledButtonWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.spacing(1)};
`;
const StyledOrderInfomationMain = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing(1)};
  gap: ${(props) => props.theme.spacing(2)};
  overflow: auto;
`;
