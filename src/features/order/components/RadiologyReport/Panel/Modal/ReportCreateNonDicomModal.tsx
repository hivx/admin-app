import CloseIcon from '@mui/icons-material/Close';
import { Modal, styled } from '@mui/material';
import { FC } from 'react';

import { MyIconButton } from '@/components';
import { ModalContent } from '@/components/Elements/Modal/ModalContent';
import { useDisclosure } from '@/hooks';

import UploadNonDicom from '../../../../../../components/Order/UploadNonDicom/UploadNonDicom';

import { UploadNonDicomModalShell } from './UploadNonDicomModalShell';

type ReportCreateNonDicomModalProps = {
  disclosure: ReturnType<typeof useDisclosure>;
};
// Prop disclosure used to control on/off modal state
export const ReportCreateNonDicomModal: FC<ReportCreateNonDicomModalProps> = (props) => {
  const { disclosure } = props;
  return (
    <>
      <Modal open={disclosure.isOpen} disableEnforceFocus>
        <StyledReportCreateNonDicomModal
          renderBody={() => (
            <UploadNonDicomModalShell
              CloseButton={
                <MyIconButton onClick={disclosure.close}>
                  <CloseIcon />
                </MyIconButton>
              }
            >
              <UploadNonDicom />
            </UploadNonDicomModalShell>
          )}
        />
      </Modal>
    </>
  );
};

const StyledReportCreateNonDicomModal = styled(ModalContent)`
  width: 95vw;
  max-width: 95vw;
  height: 95vh;
  max-height: 95vh;
`;
