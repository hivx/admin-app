import { Modal } from '@mui/material';
import { FC, forwardRef } from 'react';

import {
  ICommonAppModalProps,
  AppModalContent,
} from '@/components/Elements/Modal/AppModalContent';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import {
  useRadiologyReportFunctions,
  useRegisterRadiologyFunctions,
} from '@/features/order';
import { useDisclosure, useTranslate } from '@/hooks';

import { ApproveWithTimeForm } from './ApproveWithTimeForm';

type ApproveWithTimeModalProps = ICommonAppModalProps;

export const ConnectedApproveWithTimeModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterRadiologyFunctions();
  register('openModalSelectApproveTime', open);

  return (
    <Modal disableEnforceFocus open={isOpen}>
      <ApproveWithTimeModal closeModal={close} />
    </Modal>
  );
};

export const ApproveWithTimeModal = forwardRef<HTMLElement, ApproveWithTimeModalProps>(
  (props, ref) => {
    const { closeModal } = props;
    const translate = useTranslate();
    const radiologyReportFunctions = useRadiologyReportFunctions();

    return (
      <AppModalContent
        ref={ref}
        confirmLabel={translate.buttons.confirm()}
        closeLabel={translate.buttons.close()}
        handleClose={closeModal}
        BodyComponent={
          <StyledDivCenterChildren>
            <ApproveWithTimeForm onSuccessCallback={closeModal} />
          </StyledDivCenterChildren>
        }
        handleConfirm={() => radiologyReportFunctions.submitFormApproveWithTime?.()}
        title={translate.resources.report.selectApproveTime().toLowerCase()}
        width="min(600px,95dvw)"
        // Height cụ thể cho mobile,sửa lỗi mất popup trên iphone
        height="min(300px, 'fit-content')"
        BoxBodyProps={{ minHeight: 'auto' }}
      />
    );
  },
);

ApproveWithTimeModal.displayName = 'ApproveWithTimeModal';
