import { MyButton } from '@/components';
import { AdminRightClickMenu } from '@/components/Admin/AdminRightClickMenu';
import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider, useAdminFunctions } from '@/providers/Admin/AdminProvider';

import { ConnectedModalityCreateModal } from '../../components/Modality/ModalityCreateModal';
import { ConnectedModalityEditModal } from '../../components/Modality/ModalityEditModal';
import { ModalityListFilterForm } from '../../components/Modality/ModalityListFilterForm';
import { ModalityTable } from '../../components/Modality/ModalityTable';

export const AdminModality = () => {
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.modality.title()}
        TableComponent={<ModalityTable FilterComponent={<ModalityListFilterForm />} />}
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
      <ConnectedModalityCreateModal />
      <ConnectedModalityEditModal />
      <AdminRightClickMenu />
    </AdminProvider>
  );
};
