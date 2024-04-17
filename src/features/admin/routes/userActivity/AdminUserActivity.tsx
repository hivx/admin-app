import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider } from '@/providers/Admin/AdminProvider';

import { UserActivityTable } from '../../components/UserActivity/UserActivityTable';

export const AdminUserActivity = () => {
  const translate = useTranslate();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.userActivity.title()}
        ActionButtons={<></>}
        TableComponent={<UserActivityTable />}
      />
    </AdminProvider>
  );
};
