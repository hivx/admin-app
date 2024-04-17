import { MyButton } from '@/components';
import { AdminRightClickMenu } from '@/components/Admin/AdminRightClickMenu';
import { AdminShell } from '@/components/Admin/AdminShell';
import { StyledTableContainerWithCollapsiblePanel } from '@/components/Table/MyTable.styles';
import { useTranslate } from '@/hooks';
import { AdminProvider, useAdminFunctions } from '@/providers/Admin/AdminProvider';

import { ModalityListPanel } from '../../components/ModalityRoom/ModalityListPanel';
import { ConnectedModalityRoomCreateModal } from '../../components/ModalityRoom/ModalityRoomCreateModal';
import { ConnectedModalityRoomEditModal } from '../../components/ModalityRoom/ModalityRoomEditModal';
import { ModalityRoomTable } from '../../components/ModalityRoom/ModalityRoomTable';

export const AdminModalityRoom = () => {
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.modalityRoom.title()}
        TableComponent={<ModalityRoomTable />}
        PanelComponent={<ModalityListPanel />}
        ActionButtons={
          <>
            <MyButton
              variant="contained"
              onClick={() => adminFunctions.openCreateModal()}
            >
              {translate.buttons.create()}
            </MyButton>
          </>
        }
      />
      <ConnectedModalityRoomCreateModal />
      <ConnectedModalityRoomEditModal />
      <AdminRightClickMenu />
    </AdminProvider>
  );
};
