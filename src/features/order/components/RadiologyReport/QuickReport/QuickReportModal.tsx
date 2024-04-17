import CloseIcon from '@mui/icons-material/Close';
import { Modal, styled } from '@mui/material';
import { FC } from 'react';

import { MyIconButton } from '@/components';
import { ModalContent } from '@/components/Elements/Modal/ModalContent';
import { useDisclosure } from '@/hooks';
import { useDeleteLockOrder } from '@/hooks/lockOrder/useDeleteLockOrder';
import { IRadiologyReportCallbacks } from '@/hooks/radiology/useRadiologyReport';
import { BaseEntity } from '@/types';

import { RadiologyReportMain } from '../RadiologyReportMain';

import { QuickReportShell } from './QuickReportShell';
import { QuickReportTabs } from './QuickReportTabs';

type QuickReportModalProps = {
  orderID: BaseEntity['id'];
  reportID?: BaseEntity['id'];
  disclosure: ReturnType<typeof useDisclosure>;
};
export const QuickReportModal: FC<QuickReportModalProps> = (props) => {
  const { orderID, disclosure, reportID } = props;
  const { deletable, deleteLockOrder } = useDeleteLockOrder(orderID);

  /**
   * CLick ( X ) -> delete lock and close quick report modal
   */
  const handleCloseModal = () => {
    deletable && deleteLockOrder();
    disclosure.close();
  };
  const handleReportApproved: IRadiologyReportCallbacks['onReportApproved'] = (
    _,
    order,
  ) => {
    // close modal if order is approved
    if (order.reportStatus === 'APPROVED') {
      disclosure.close();
    }
  };

  return (
    <Modal open={disclosure.isOpen} disableEnforceFocus>
      {/* disableEnforceFocus to make TinyMCE Toolbar works */}
      <StyledQuickReportModal
        renderBody={() => (
          <RadiologyReportMain
            orderID={orderID}
            reportID={reportID}
            callbacks={{
              onReportApproved: handleReportApproved,
              onClose: disclosure.close,
            }}
            ReportComponent={
              <QuickReportShell
                CloseButton={
                  <MyIconButton onClick={handleCloseModal}>
                    <CloseIcon />
                  </MyIconButton>
                }
              >
                <QuickReportTabs />
              </QuickReportShell>
            }
          />
        )}
      />
    </Modal>
  );
};

const StyledQuickReportModal = styled(ModalContent)`
  width: 65vw;
  max-width: 65vw;
  height: 95vh;
  max-height: 95vh;
`;
