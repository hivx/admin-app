import { MyButton } from '@/components';
import { AdminRightClickMenu } from '@/components/Admin/AdminRightClickMenu';
import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider, useAdminFunctions } from '@/providers/Admin/AdminProvider';

import { ConnectedLayoutCreateModal } from '../../components/Layout/LayoutCreateModal';
import { ConnectedLayoutEditModal } from '../../components/Layout/LayoutEditModal';
import { LayoutListFilterForm } from '../../components/Layout/LayoutListFilterForm';
import { LayoutTable } from '../../components/Layout/LayoutTable';

export const AdminLayoutTemplate = () => {
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.layout.title.long()}
        TableComponent={<LayoutTable FilterComponent={<LayoutListFilterForm />} />}
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
      <AdminRightClickMenu />
      <ConnectedLayoutCreateModal />
      <ConnectedLayoutEditModal />
    </AdminProvider>
  );
};
