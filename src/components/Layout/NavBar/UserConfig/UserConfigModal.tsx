import { Modal } from '@mui/material';

import { AppModalContent } from '@/components/Elements/Modal/AppModalContent';
import { useDisclosure, useTranslate } from '@/hooks';

import { UserConfigContent } from './UserConfigContent';
import { UserConfigProvider, useUserConfigFunctions } from './UserConfigProvider';

export const UserConfigModal = ({
  disclosure,
}: {
  disclosure: ReturnType<typeof useDisclosure>;
}) => {
  const translate = useTranslate();
  const { close, isOpen, open } = disclosure;

  const userConfigFunctions = useUserConfigFunctions();

  return (
    <UserConfigProvider>
      <Modal open={isOpen}>
        <AppModalContent
          title={'Cấu hình người dùng'}
          BodyComponent={<UserConfigContent />}
          handleClose={close}
          handleConfirm={() => userConfigFunctions.submitUserConfigForm()}
          confirmLabel={translate.buttons.save()}
          BoxBodyProps={{ padding: 0 }}
          width="700px"
        />
      </Modal>
    </UserConfigProvider>
  );
};
