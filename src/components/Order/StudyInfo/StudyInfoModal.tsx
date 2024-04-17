import { Box, Modal, Stack, styled, Typography } from '@mui/material';
import { FC, ReactNode, useEffect } from 'react';

import {
  useDeleteOrderMutation,
  useGetOneOrderQuery,
  useLazyGetOneOrderQuery,
} from '@/api/order';
import { MyButton } from '@/components';
import { ModalContent } from '@/components/Elements/Modal/ModalContent';
import { ModalFooterLayout } from '@/components/Layout/ModalFooterLayout';
import { useAppDispatch, useDisclosure, useTranslate } from '@/hooks';
import { useAcceptOrder } from '@/hooks/order/useAcceptOrder';
import { useStudyInfoModalButtonState } from '@/hooks/order/useStudyInfoModalButtonState';
import {
  useGenericNotifySnackbar,
  useNotifyModal,
} from '@/providers/NotificationProvider';
import {
  EditOrderFunctionsProvider,
  useEditOrderFunctions,
} from '@/providers/Order/EditOrderFunctionsProvider';
import { resetOrderRequestData } from '@/stores/examinnation/createOrderSlice';
import { IOrderDTO } from '@/types/dto';

import StudyInfoContent from './StudyInfoContent';

type ModalState = {
  title: string;
  disclosure: ReturnType<typeof useDisclosure>;
  handleClose: () => void;
  renderExtraButtons?: () => ReactNode;
};

type StudyInfoModalProps = {
  order?: IOrderDTO;
  isLoading: boolean;
} & ModalState;
/**
 * Prepare order data for study info modal
 */
export const ConnectedStudyInfoModal: FC<ModalState & { orderID: number }> = (props) => {
  const { orderID, ...rest } = props;
  const [trigger, { data, isFetching }] = useLazyGetOneOrderQuery();
  const { data: orderData } = useGetOneOrderQuery({ id: orderID });
  useEffect(() => {
    trigger({ id: orderID });
  }, [orderID, trigger]);

  return (
    <EditOrderFunctionsProvider>
      <StudyInfoModal order={orderData} isLoading={isFetching} {...rest} />
    </EditOrderFunctionsProvider>
  );
};
const StudyInfoModal: FC<StudyInfoModalProps> = (props) => {
  const { order, disclosure, title, handleClose, isLoading } = props;
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const [deleteOrder] = useDeleteOrderMutation();
  const editOrderFunctions = useEditOrderFunctions();
  const notifyModal = useNotifyModal();
  const { isShowButtonAcceptOrder, onAcceptOrder } = useAcceptOrder({ order });
  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.studyInfo.study().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.studyInfo.study().toLowerCase(),
    }),
  );
  const { isOpen: isEditPatientInfo, toggle: isEditPatientInfoToggle } =
    useDisclosure(false);
  const { isOpen: isEditOrderInfo, toggle: isEditOrderInfoToggle } = useDisclosure(false);

  const { isShowButtonDelete, isShowButtonEdit, isShowButtonUpdate } =
    useStudyInfoModalButtonState({ order, isEditOrderInfo, isEditPatientInfo });

  /**
   * Callback close modal study info when the backdrop is clicked and form is not editing
   */
  const onBackDropClick =
    !isEditPatientInfo && !isEditOrderInfo ? disclosure.close : undefined;

  const handleSubmitEditStudyInfo = () => {
    editOrderFunctions.editOrderInfo();
  };

  const handleDeleteOrder = () => {
    if (order) {
      notifyModal({
        message: `${translate.messages.notification.deleteOrder({
          name: `${order.patient?.fullname}`,
        })}`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            const res = await deleteOrder(order.id);
            if ('error' in res) {
              notifyError();
            } else {
              notifySuccess();
              disclosure.close();
            }
          },
        },
      });
    }
  };

  return (
    <Modal open={disclosure.isOpen} onBackdropClick={onBackDropClick}>
      <StyledStudyInfoModal
        key={order?.id}
        renderTitle={() => (
          <StyledStudyInfoHeaderTitle textTransform="uppercase">
            {title}
          </StyledStudyInfoHeaderTitle>
        )}
        isLoading={isLoading}
        renderBody={() =>
          order ? (
            <StyledStudyInfoBody>
              <StudyInfoContent
                key={order.id}
                order={order}
                isEditPatientInfo={isEditPatientInfo}
                isEditPatientInfoToggle={isEditPatientInfoToggle}
                isEditOrderInfo={isEditOrderInfo}
                isEditOrderInfoToggle={isEditOrderInfoToggle}
              />
            </StyledStudyInfoBody>
          ) : (
            <Box height="500px"></Box>
          )
        }
        renderFooter={() => (
          <StyledStudyInfoFooter>
            <ModalFooterLayout
              ActionButton={
                <Stack spacing={1} direction="row">
                  {isShowButtonEdit && (
                    <>
                      <StyledPrimaryButton
                        variant="contained"
                        onClick={isEditOrderInfoToggle}
                      >
                        {translate.buttons.edit()}
                      </StyledPrimaryButton>
                    </>
                  )}
                  {isShowButtonUpdate && (
                    <StyledPrimaryButton
                      variant="contained"
                      onClick={handleSubmitEditStudyInfo}
                    >
                      {translate.buttons.update()}
                    </StyledPrimaryButton>
                  )}
                  {isShowButtonAcceptOrder && (
                    <StyledPrimaryButton variant="contained" onClick={onAcceptOrder}>
                      {translate.buttons.accept()}
                    </StyledPrimaryButton>
                  )}
                </Stack>
              }
              OptionalButtons={[
                props.renderExtraButtons?.(),
                isShowButtonDelete && (
                  <MyButton
                    key={translate.buttons.deleteOrder()}
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteOrder}
                  >
                    {translate.buttons.delete()}
                  </MyButton>
                ),
                <MyButton
                  key={translate.buttons.close()}
                  variant="outlined"
                  onClick={() => {
                    dispatch(resetOrderRequestData());
                    handleClose();
                  }}
                >
                  {translate.buttons.close()}
                </MyButton>,
              ]}
            />
          </StyledStudyInfoFooter>
        )}
      />
    </Modal>
  );
};

/**
 * Style of Study info modal
 */

const StyledStudyInfoModal = styled(ModalContent)`
  width: 60vw;
  max-width: 85vw;
`;

const StyledStudyInfoHeaderTitle = styled(Typography)`
  text-align: center;
  background-color: ${(props) => props.theme.pacs?.customColors.tableHeaderBackground};
  padding: ${(props) => props.theme.spacing(0.5)} 0;
`;

const StyledStudyInfoBody = styled('div')`
  overflow: auto;
  width: 100%;
  padding: ${(props) => props.theme.spacing(2)};
  height: 65vh;
`;

const StyledStudyInfoFooter = styled('div')`
  padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(2)};
`;

const StyledPrimaryButton = styled(MyButton)`
  padding: ${(props) => props.theme.spacing(0.2)} ${(props) => props.theme.spacing(1)};
`;
