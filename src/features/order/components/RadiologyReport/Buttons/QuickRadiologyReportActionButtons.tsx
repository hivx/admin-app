import { Stack } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import ItechPrintApproveIcon from '@/assets/icon/PrintApproveIcon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import QuickPrintRadiologyButton from '@/components/Order/Panel/QuickPrintRadiologyButton';

import { useCurrentOrderID } from '../../../providers';

import { AttachmentButton } from './AttachmentButton';
import { DefaultInfoRadiologyButton } from './DefaultInfoRadiologyButton';
import { DeleteLockButton } from './DeleteLockButton';
import InfoToggleButton from './InfoToggleButton';
import { MainButtonSwitcher } from './MainButton/MainButtonSwitcher';
import { MedicalEquipmentButton } from './MedicalEquipmentButton';
import { PrintImageButton } from './PrintImageButton';
import QuickReportCreateNonDicomButton from './QuickReportCreateNonDicomButton';
import { StyledActionsButton, StyledButtonGroup } from './RadiologyReportActionButtons';
import { ViewImageButton } from './ViewImageButton';
/**
 * Cụm các nút dùng cho cho popup đọc ca nhanh
 */
export const QuickRadiologyReportActionButtons = () => {
  const orderID = useCurrentOrderID();
  const { data: order } = useGetOneOrderQuery({ id: orderID });
  return (
    <Layout>
      <StyledButtonGroup>
        <MainButtonSwitcher />
        <StyledActionsButton>
          <Stack direction="row">
            <DeleteLockButton />
            <ViewImageButton color="primary" />
            {/* Button take picture */}
            <QuickReportCreateNonDicomButton />
            {/* Button attachment */}
            <AttachmentButton />
          </Stack>
          <Stack direction="row">
            {/* In kết quả  */}
            <QuickPrintRadiologyButton
              order={order}
              renderButton={(props) => (
                <IconButtonWithToolTip color="inherit" {...props}>
                  <ItechPrintApproveIcon
                    color={props.disabled ? 'disabled' : 'inherit'}
                  />
                </IconButtonWithToolTip>
              )}
            />

            {/* Button print picture */}
            <PrintImageButton />

            {/* Button content template */}
            {/* <ContentTemplateButton /> */}

            {/* Nút xem trước kết quả */}
            {/* {order && (
              <PrintRadiologyReportButton
                order={order}
                requestID={requestID}
                renderButton={(props) => (
                  <IconButtonWithToolTip {...props}>
                    <ItechPrintApproveIcon
                      color={props.disabled ? 'disabled' : 'primary'}
                    />
                  </IconButtonWithToolTip>
                )}
              />
            )} */}
            <MedicalEquipmentButton />
            <DefaultInfoRadiologyButton />
            <InfoToggleButton />
          </Stack>
        </StyledActionsButton>
      </StyledButtonGroup>
    </Layout>
  );
};

const Layout: FC<PropsWithChildren> = (props) => (
  <Stack direction="row" spacing={1} alignItems="center">
    {props.children}
  </Stack>
);
