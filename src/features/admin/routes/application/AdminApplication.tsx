import { AdminRightClickMenu } from '@/components/Admin/AdminRightClickMenu';
import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider, useAdminFunctions } from '@/providers/Admin/AdminProvider';

import { ConnectedApplicationCreateModal } from '../../components/Application/ApplicationCreateModal';
import { ConnectedApplicationEditModal } from '../../components/Application/ApplicationEditModal';
import { ApplicationTable } from '../../components/Application/ApplicationTable';

export const AdminApplication = () => {
  const translate = useTranslate();

  const adminFunctions = useAdminFunctions();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.application.title.long()}
        ActionButtons={<></>}
        TableComponent={<ApplicationTable />}
      />
      <AdminRightClickMenu />
      <ConnectedApplicationCreateModal />
      <ConnectedApplicationEditModal />
    </AdminProvider>
  );
};
