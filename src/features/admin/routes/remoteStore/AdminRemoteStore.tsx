import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider, useAdminFunctions } from '@/providers/Admin/AdminProvider';

export const AdminRemoteStore = () => {
  const translate = useTranslate();

  const adminFunctions = useAdminFunctions();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.remoteStore.title()}
        ActionButtons={<></>}
        TableComponent={<></>}
      />
    </AdminProvider>
  );
};
