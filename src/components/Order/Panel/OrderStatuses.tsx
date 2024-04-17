import { styled, lighten, SxProps } from '@mui/material';
import React, { useCallback } from 'react';

import { MyButton } from '@/components/Elements';
import { isReportReApproveAble } from '@/dataHelper/isReportReApproveAble';
import { useAppSelector, useTranslate } from '@/hooks';
import { useUserPermission } from '@/providers/AuthProvider';
import { useHospitalProvider } from '@/providers/HospitalConfigProvider';
import { selectCurrentUser } from '@/stores/auth';
import { IOrderDTO, IOrderRequestDTO, ORDER_DIAGNOSIS_STEP_STATUS } from '@/types/dto';
import { filterTransientProps } from '@/utils/filterTransientProps';

import OrderStatusesShell from './OrderStatusesShell';

type OrderStatusesProps = {
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
  sx?: SxProps;
};
const OrderStatuses = (props: OrderStatusesProps) => {
  const { order, request, sx } = props;
  const translate = useTranslate();
  const user = useAppSelector(selectCurrentUser);
  const permission = useUserPermission();
  const { isConnectHsm } = useHospitalProvider();
  const isUnsignedRequest = !request?.finalSigner;

  const reportStatus = order?.reportStatus;
  // Conditions to can approve
  // 1) Ca không phải finalApprrovedReort;
  // 2) Người dùng có quyền duyệt;
  // 3) Người dùng hiện tại là người trùng với người dùng duyệt ca cũ;
  // 4) Level của người dùng hiện tại > level của người duyệt ca cũ
  const isActiveReportStatusButton =
    reportStatus === ORDER_DIAGNOSIS_STEP_STATUS.PENDING_APPROVAL &&
    !request?.finalReportID &&
    permission?.userCanApproveOrder &&
    isReportReApproveAble({ user, request });
  // Conditions to can re-sign
  // 1) Ca đã duyệt,
  // 2) Người dùng là người duyệt;

  const isActiveReSignButton =
    reportStatus === ORDER_DIAGNOSIS_STEP_STATUS.APPROVED &&
    request?.finalApprover?.id === user?.id &&
    request?.finalReportID;

  //TODO: Trạng thái đọc ca
  // Nếu là CHỜ DUYỆT → cho phép click vào để duyệt với điều kiện:
  // 1) Ca không phải finalApprrovedReort;
  // 2) Người dùng có quyền duyệt;
  // 3) Người dùng hiện tại là người trùng với người dùng duyệt ca cũ;
  // 4) Level của người dùng hiện tại > level của người duyệt ca cũ
  const handleApprove = useCallback(() => {}, []);

  // TODO: Trạng thái ký số:
  // Nếu là CHƯA KÝ SỐ → cho phép click vào để ký lại với điều kiện:
  // 1) Ca đã duyệt,
  // 2) Người dùng là người duyệt;
  const handleReSign = useCallback(() => {}, []);
  return order ? (
    <OrderStatusesShell
      RequestStatus={
        !request?.finalReportID ? (
          <StyledRequestStatusButton
            $isApproved={Boolean(request?.finalReportID)}
            disabled={!isActiveReportStatusButton}
            onClick={handleApprove}
            sx={sx}
          >
            {request?.finalReportID
              ? translate.resources.order.reportStatusMessage({
                  status: ORDER_DIAGNOSIS_STEP_STATUS.APPROVED,
                })
              : translate.resources.order.reportStatusMessage({
                  status: ORDER_DIAGNOSIS_STEP_STATUS.NOT_STARTED,
                })}
          </StyledRequestStatusButton>
        ) : (
          <></>
        )
      }
      SignStatus={
        isConnectHsm &&
        isUnsignedRequest && (
          <StyledSignatureStatusButton
            disabled={!isActiveReSignButton}
            onClick={handleReSign}
            sx={sx}
          >
            {translate.resources.order.signStatusMessage.unSigned()}
          </StyledSignatureStatusButton>
        )
      }
    />
  ) : (
    <></>
  );
};

export default OrderStatuses;

const StyledSignatureStatusButton = styled(MyButton)`
  ${(props) => props.theme.typography.body2};
  background-color: ${(props) => props.theme?.pacs?.customColors.text.red};
  color: ${(props) => props.theme.palette.primary.contrastText};
  padding: ${(props) => props.theme.spacing(0.5)} ${(props) => props.theme.spacing(1)};
  border-radius: 0;
  &:hover {
    background-color: ${(props) => props.theme?.pacs?.customColors.text.red};
  }
  &:disabled {
    color: ${(props) => props.theme.palette.primary.contrastText};
  }
`;

const StyledRequestStatusButton = styled(MyButton, filterTransientProps)<{
  $isApproved?: boolean;
}>`
  ${(props) => props.theme.typography.body2};
  background-color: ${(props) =>
    props.$isApproved
      ? lighten(props.theme.pacs?.customColors.text.black ?? '#1D1E3A', 0.3)
      : lighten(props.theme?.pacs?.customColors.text.blue ?? '#2957A4', 0.1)};
  color: ${(props) => props.theme.palette.primary.contrastText};
  padding: ${(props) => props.theme.spacing(0.5)} ${(props) => props.theme.spacing(1)};
  border-radius: 0;
  &:hover {
    background-color: ${(props) =>
      props.$isApproved
        ? lighten(props.theme.pacs?.customColors.text.black ?? '#1D1E3A', 0.3)
        : lighten(props.theme?.pacs?.customColors.text.blue ?? '#2957A4', 0.1)};
  }
  &:disabled {
    color: ${(props) => props.theme.palette.primary.contrastText};
  }
`;
