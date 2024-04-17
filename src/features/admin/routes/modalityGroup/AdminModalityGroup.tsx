import { MyButton } from '@/components';
import { AdminRightClickMenu } from '@/components/Admin/AdminRightClickMenu';
import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider, useAdminFunctions } from '@/providers/Admin/AdminProvider';

import { ConnectedModalityGroupCreateModal } from '../../components/ModalityGroup/ModalityGroupCreateModal';
import { ConnectedModalityGroupEditModal } from '../../components/ModalityGroup/ModalityGroupEditModal';
import { ModalityGroupTable } from '../../components/ModalityGroup/ModalityGroupTable';
import { ModalityListPanelByGroupId } from '../../components/ModalityGroup/ModalityListPanelByGroupId';

export const AdminModalityGroup = () => {
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.modalityGroup.title()}
        TableComponent={<ModalityGroupTable />}
        PanelComponent={<ModalityListPanelByGroupId />}
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
      <ConnectedModalityGroupCreateModal />
      <ConnectedModalityGroupEditModal />
      <AdminRightClickMenu />
    </AdminProvider>
  );
};
