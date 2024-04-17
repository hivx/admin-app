import { Modal, Stack, styled, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

import { MyButton } from '@/components';
import { ModalContent } from '@/components/Elements/Modal/ModalContent';
import { ModalFooterLayout } from '@/components/Layout/ModalFooterLayout';
import { useAppDispatch, useAppSelector, useDisclosure, useTranslate } from '@/hooks';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import {
  CreateOrderFunctionsProvider,
  useCreateOrderFunctions,
} from '@/providers/Order/CreateOrderFunctionsProvider';
import {
  resetOrderRequestData,
  selectOrderRequestData,
} from '@/stores/examinnation/createOrderSlice';
import { BaseEntity } from '@/types';

import CreateOrderContent from './CreateOrderContent';

type ModalState = {
  title: string;
  disclosure: ReturnType<typeof useDisclosure>;
  handleClose: () => void;
  renderExtraButtons?: () => ReactNode;
};

type CreateOrderModalProps = ModalState;
/**
 * when click button 'Tạo chỉ định' in examination page will show this modal
 */
export const ConnectedCreateOrderModal: FC<ModalState> = (props) => {
  return (
    <CreateOrderFunctionsProvider>
      <CreateOrderModal {...props} />
    </CreateOrderFunctionsProvider>
  );
};
const CreateOrderModal: FC<CreateOrderModalProps> = (props) => {
  const { disclosure, title, handleClose } = props;
  const translate = useTranslate();
  const createOrderFunctions = useCreateOrderFunctions();
  const dispatch = useAppDispatch();
  const requests = useAppSelector(selectOrderRequestData);

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.resources.order.title.assign().toLowerCase(),
    }),
  );

  const handleSubmitCreatePatientInfo = () => {
    createOrderFunctions.createPatientInfo();
  };

  const handleSubmitCreateOrderInfo = (patientID: BaseEntity['id']) => {
    createOrderFunctions.createOrderInfo(patientID);
  };

  const handleSubmitCreateOrder = () => {
    handleSubmitCreatePatientInfo();
  };

  return (
    <Modal open={disclosure.isOpen}>
      <StyledStudyInfoModal
        renderTitle={() => (
          <StyledStudyInfoHeaderTitle textTransform="uppercase">
            {title}
          </StyledStudyInfoHeaderTitle>
        )}
        renderBody={() => (
          <StyledStudyInfoBody>
            <CreateOrderContent
              onCreatePatientInfoCallback={(patientID) => {
                if (patientID) {
                  handleSubmitCreateOrderInfo(patientID);
                } else {
                  notifyError();
                }
              }}
              onCreateOrderInfoCallback={() => disclosure.close()}
            />
          </StyledStudyInfoBody>
        )}
        renderFooter={() => (
          <StyledStudyInfoFooter>
            <ModalFooterLayout
              ActionButton={
                requests.length !== 0 ? (
                  <Stack spacing={1} direction="row">
                    <StyledPrimaryButton
                      variant="contained"
                      onClick={handleSubmitCreateOrder}
                    >
                      {translate.buttons.create()}
                    </StyledPrimaryButton>
                  </Stack>
                ) : (
                  <></>
                )
              }
              OptionalButtons={[
                props.renderExtraButtons?.(),
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
 * Style of create order modal
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
