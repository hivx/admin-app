import { Box, Modal, styled, Typography } from '@mui/material';
import { FC } from 'react';

import { MyButton } from '@/components';
import { ModalContent } from '@/components/Elements/Modal/ModalContent';
import { ModalFooterLayout } from '@/components/Layout/ModalFooterLayout';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { useDisclosure, useTranslate } from '@/hooks';

import {
  useReceptionFunctions,
  useRegisterReceptionFunctions,
} from '../../providers/ReceptionProvider';

import { AutoSelectModalityFormWrapper } from './AutoSelectModalityFormWrapper';
type AutoSelectModalityModalProps = {
  close: () => void;
};

export const ConnectedAutoSelectModalityModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterReceptionFunctions();
  register('openAutoSelectModalityModal', open);
  register('closeAutoSelectModalityModal', close);

  return (
    <Modal open={isOpen}>
      <AutoSelectModalityModal close={close} />
    </Modal>
  );
};

const AutoSelectModalityModal = (props: AutoSelectModalityModalProps) => {
  const receptionFunctions = useReceptionFunctions();
  const translate = useTranslate();

  return (
    <StyledModalContent
      renderBody={() => (
        <Box p={2} overflow="auto">
          <AutoSelectModalityFormWrapper />
        </Box>
      )}
      renderTitle={() => (
        <StyledDivCenterChildren>
          <StyledTitle>{translate.pages.reception.confirmAutoPrint()}</StyledTitle>
        </StyledDivCenterChildren>
      )}
      renderFooter={() => (
        <Box padding={2}>
          <ModalFooterLayout
            ActionButton={
              <MyButton
                variant="contained"
                onClick={() => {
                  receptionFunctions.submitFormAutoSelectModality();
                  props.close();
                }}
              >
                {translate.pages.reception.printTicket()}
              </MyButton>
            }
            OptionalButtons={[
              <MyButton key="close" variant="outlined" onClick={props.close}>
                {translate.pages.reception.cancel()}
              </MyButton>,
            ]}
          />
        </Box>
      )}
    />
  );
};

const StyledTitle = styled(Typography)`
  font-size: 24px;
`;

const StyledModalContent = styled(ModalContent)`
  max-height: 100%;
  width: 500px;
`;
