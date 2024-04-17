import { Modal } from '@mui/material';

import { AppModalContent } from '@/components/Elements/Modal/AppModalContent';
import { useDisclosure, useTranslate } from '@/hooks';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';

import { useRegisterRadiologyFunctions } from '../../../../providers';

import { DefaultInfoRadiolgyForm } from './DefaultInfoRadiolgyForm';

/**
 * Popup hiển thị danh sách VTTH của dịch vụ chụp
 */
export const DefaultInfoRadiologyModal = () => {
  const register = useRegisterRadiologyFunctions();
  const translate = useTranslate();
  const disclosure = useDisclosure();

  const openModalDefaultInfoRadiology = () => {
    disclosure.open();
  };
  register('openModalDefaultInfoRadiology', openModalDefaultInfoRadiology);
  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: 'Thông số đọc ca mặc định',
    }),
  );
  return disclosure.isOpen ? (
    <Modal open={disclosure.isOpen}>
      <AppModalContent
        BodyComponent={<DefaultInfoRadiolgyForm />}
        title={'THÔNG SỐ ĐỌC CA MẶC ĐỊNH'}
        handleClose={disclosure.close}
        handleConfirm={(e) => {
          notifySuccess();
          disclosure.close();
        }}
        confirmLabel={translate.buttons.update()}
        width="400px"
      />
    </Modal>
  ) : (
    <></>
  );
};
