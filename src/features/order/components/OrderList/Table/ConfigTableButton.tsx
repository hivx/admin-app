import { Box, Modal } from '@mui/material';
import React from 'react';

import ItechConfigIcon from '@/assets/icon/ConfigIcon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { AppModalContent } from '@/components/Elements/Modal/AppModalContent';
import {
  UserConfigProvider,
  useUserConfigFunctions,
} from '@/components/Layout/NavBar/UserConfig/UserConfigProvider';
import { SettingOrderTableContent } from '@/components/Layout/NavBar/UserConfig/UserSettingOrderTable/SettingOrderTableContent';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useDisclosure, useTranslate } from '@/hooks';

export const ConfigTableButton = () => {
  const translate = useTranslate();
  const disclosure = useDisclosure();
  return (
    <>
      <IconButtonWithToolTip
        title={translate.buttons.tableConfig()}
        onClick={disclosure.open}
      >
        <TableSVGIcon IconComponent={ItechConfigIcon} />
      </IconButtonWithToolTip>
      {disclosure.isOpen && <ModalConfigTable disclosure={disclosure} />}
    </>
  );
};

const ModalConfigTable = ({
  disclosure,
}: {
  disclosure: ReturnType<typeof useDisclosure>;
}) => {
  const translate = useTranslate();
  const userConfigFunctions = useUserConfigFunctions();
  const { close, isOpen, open } = disclosure;
  return (
    <UserConfigProvider>
      <Modal open={isOpen}>
        <AppModalContent
          title={'Cấu hình bảng đọc ca'}
          BodyComponent={
            <Box p={1}>
              <SettingOrderTableContent />
            </Box>
          }
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
