import { ButtonGroup, Stack, styled } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { useParams } from 'react-router-dom';

import { useGetOneOrderQuery } from '@/api/order';
import { ItechPrintPreviewIcon, ItechTakePictureIcon } from '@/assets/icon';
import ItechPrintApproveIcon from '@/assets/icon/PrintApproveIcon';
import ItechTransferIcon from '@/assets/icon/TransferIcon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import QuickPrintRadiologyButton from '@/components/Order/Panel/QuickPrintRadiologyButton';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useAppSelector, useTranslate } from '@/hooks';
import {
  selectCurrentActiveReportID,
  selectCurrentRequestID,
} from '@/stores/OrderRadiology';

import { useCurrentOrderID } from '../../../providers';

import { ButtonsDivider } from './ButtonsDivider';
import { DeleteLockButton } from './DeleteLockButton';
import { MainButtonSwitcher } from './MainButton/MainButtonSwitcher';
import { PrintImageButton } from './PrintImageButton';
import { PrintRadiologyReportButton } from './PrintRadiologyReportButton';
import { QuickApproveReportButton } from './QuickApproveReportButton';
import { RecallApproveButton } from './RecallApproveButton';
import { SaveDraftButton } from './SaveDraftButton';
import { TransferButton } from './TransferButton';
import { ViewImageButton } from './ViewImageButton';
/**
 * Cụm các nút dùng cho cho màn đọc ca , panel đọc ca
 */
export const RadiologyReportActionButtons = () => {
  const orderID = useCurrentOrderID();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));
  const translate = useTranslate();
  const { data: order } = useGetOneOrderQuery({ id: orderID });
  const currentRequest = order?.requests?.find((item) => item.id === requestID);
  const currentActiveReportID =
    useAppSelector(selectCurrentActiveReportID(orderID)) ?? undefined;
  const { orderID: paramOrderID } = useParams();
  return (
    <Layout>
      <StyledButtonGroup>
        <MainButtonSwitcher />
        <StyledActionsButton>
          {/**
           * Group 1
           */}
          <Stack direction="row">
            {/**
             * Bỏ nhận ca
             */}
            <DeleteLockButton />
            <SaveDraftButton />
            {order && currentRequest && paramOrderID && (
              <QuickApproveReportButton order={order} request={currentRequest} />
            )}
            <RecallApproveButton />
          </Stack>
          <ButtonsDivider />

          {/**
           * Group 2
           */}
          <Stack direction="row">
            {/**
             * Xem ảnh
             */}
            <ViewImageButton color="inherit" />
            {/**
             *  In ảnh DICOM
             */}
            <PrintImageButton />
            <IconButtonWithToolTip
              title={translate.buttons.takePicture()}
              onClick={() => {}}
              color="inherit"
              disabled={true}
            >
              <TableSVGIcon IconComponent={ItechTakePictureIcon} />
            </IconButtonWithToolTip>
            {/**
             * Chuyển ca
             */}
            {order && <TransferButton order={order} />}
          </Stack>
          <ButtonsDivider />
          {/**
           * Group 3
           */}
          <Stack direction="row">
            {/**
             *  In nhanh kết quả
             */}
            <QuickPrintRadiologyButton
              order={order}
              request={currentRequest}
              renderButton={(props) => (
                <IconButtonWithToolTip color="inherit" {...props}>
                  <TableSVGIcon
                    IconComponent={ItechPrintApproveIcon}
                    sx={{ color: props.disabled ? 'disabled' : 'inherit' }}
                  />
                </IconButtonWithToolTip>
              )}
            />
            {/**
             * Xem trước kết quả
             */}
            {paramOrderID && order && (
              <PrintRadiologyReportButton
                order={order}
                requestID={requestID}
                reportID={currentActiveReportID}
                renderButton={(props) => (
                  <IconButtonWithToolTip color="inherit" {...props}>
                    <TableSVGIcon
                      IconComponent={ItechPrintPreviewIcon}
                      sx={{ color: props.disabled ? 'disabled' : 'inherit' }}
                    />
                  </IconButtonWithToolTip>
                )}
              />
            )}
          </Stack>
        </StyledActionsButton>
      </StyledButtonGroup>
    </Layout>
  );
};

const Layout: FC<PropsWithChildren> = (props) => (
  <Stack direction="row" spacing={0.5} alignItems="center">
    {props.children}
  </Stack>
);

export const StyledButtonGroup = styled(ButtonGroup)`
  overflow: auto;
  display: grid;
  grid-template-columns: auto 1fr;
`;

export const StyledActionsButton = styled('div')`
  overflow: auto;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  min-width: 120px;
  color: ${(props) => props.theme.palette.primary.main};
`;
