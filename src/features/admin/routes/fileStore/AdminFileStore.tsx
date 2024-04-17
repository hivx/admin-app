import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider, useAdminFunctions } from '@/providers/Admin/AdminProvider';

export const AdminFileStore = () => {
  const translate = useTranslate();

  const adminFunctions = useAdminFunctions();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.fileStore.title()}
        ActionButtons={<></>}
        TableComponent={<></>}
      />
    </AdminProvider>
  );
};
