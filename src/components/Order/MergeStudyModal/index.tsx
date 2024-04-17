import { Modal } from '@mui/material';
import { FC, forwardRef } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import {
  ICommonAppModalProps,
  AppModalContent,
} from '@/components/Elements/Modal/AppModalContent';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { useDisclosure, useTranslate } from '@/hooks';
import { useOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';
import { IOrderDTO } from '@/types/dto';

import InfoNeedMerge from './InfoNeedMerge';
import InfoOrder from './InfoOrder';
import MergeStudyModalContentShell from './MergeStudyModalContentShell';
import OrderMergeStudyTableMain from './OrderMergeStudyTableMain';

type MergeStudyModalProps = ICommonAppModalProps & { order: IOrderDTO };

type ConnectedMergeStudyProps = {
  orderID: IOrderDTO['id'];
  disclosure: ReturnType<typeof useDisclosure>;
};
export const ConnectedMergeStudy: FC<ConnectedMergeStudyProps> = (props) => {
  const { orderID, disclosure } = props;
  const { data: order } = useGetOneOrderQuery({ id: orderID });

  return order ? (
    <MergeStudyModal
      closeModal={disclosure.close}
      isOpen={disclosure.isOpen}
      order={order}
    />
  ) : (
    <></>
  );
};
const MergeStudyModal = forwardRef<HTMLElement, MergeStudyModalProps>((props, ref) => {
  const { order, isOpen, closeModal } = props;
  const translate = useTranslate();
  const orderListFunctions = useOrderListFunctions();

  return (
    <Modal disableEnforceFocus open={!!isOpen}>
      <AppModalContent
        BoxBodyProps={{ width: '75vw', height: '55vh' }}
        ref={ref}
        handleClose={closeModal}
        BodyComponent={
          <StyledDivCenterChildren>
            <MergeStudyModalContentShell
              InfoNeedMerge={order.study && <InfoNeedMerge study={order.study} />}
              InfoOrder={<InfoOrder />}
              RequestTable={order && <OrderMergeStudyTableMain order={order} />}
            />
          </StyledDivCenterChildren>
        }
        handleConfirm={() => {
          order.study?.id && orderListFunctions.updateOrderStudy(order.study?.id);
          closeModal();
        }}
        confirmLabel={translate.buttons.mergeStudy()}
        title={translate.resources.study.mergeStudyInfo()}
      />
    </Modal>
  );
});

MergeStudyModal.displayName = 'MergeStudyModal';
