import { Stack, styled } from '@mui/material';
import { FC } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { CloseableCollapsiblePanel } from '@/components/Elements/Surfaces/CollapsiblePanel';
import { useAppDispatch, useAppSelector, useDisclosure, useTranslate } from '@/hooks';
import { getPatientAge } from '@/lib/dataHelper/radiologyReport/getPatientAge';
import {
  getPanelOrderID,
  selectIsOrderPanelOpen,
  toggleIsOrderPanelOpen,
} from '@/stores/OrderRadiology';
import { BaseEntity } from '@/types';

import { PanelRadiologyReportMain } from './PanelRadiologyReport/PanelRadiologyReportMain';

/**
 * Panel Đọc ca trong màn Danh sách ca chụp
 */
export const OrderTablePanel: FC = () => {
  const { isOpen: initialExpanded, open, close } = useDisclosure(true);
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const orderID = useAppSelector(getPanelOrderID);
  const isOrderPanelOpen = useAppSelector(selectIsOrderPanelOpen);
  const { data: orderData } = useGetOneOrderQuery(
    { id: orderID ?? 0 },
    { skip: !orderID },
  );
  if (!orderID) return <></>;

  return isOrderPanelOpen ? (
    <CloseableCollapsiblePanel
      key={orderID}
      initialExpanded={initialExpanded}
      onExpand={open}
      onClose={() => dispatch(toggleIsOrderPanelOpen())}
      onCollapse={close}
      title={
        translate.buttons.quickReport() +
        '-' +
        translate.pages.orderList.orderPanelTitle({
          patientAge: getPatientAge(orderData?.patient?.birthDate).toString(),
          patientName: orderData?.patient?.fullname ?? '',
          pid: orderData?.patient?.pid ?? '',
        })
      }
    >
      <ConnectedOrderPanelContent orderID={orderID} />
    </CloseableCollapsiblePanel>
  ) : (
    <></>
  );
};

const ConnectedOrderPanelContent = ({ orderID }: { orderID: BaseEntity['id'] }) => {
  return (
    <StyledConnectedOrderPanelContent>
      <PanelRadiologyReportMain orderID={orderID} />
    </StyledConnectedOrderPanelContent>
  );
};

const StyledConnectedOrderPanelContent = styled(Stack)`
  width: 100%;
  height: 100%;
  border: 1px solid #bdbdbd;
`;
