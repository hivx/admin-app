import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider, useAdminFunctions } from '@/providers/Admin/AdminProvider';

import { UserTypeTable } from '../../components/userType/UserTypeTable';

export const AdminUserType = () => {
  const translate = useTranslate();

  const adminFunctions = useAdminFunctions();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.userType.title()}
        ActionButtons={<></>}
        TableComponent={<UserTypeTable />}
      />
    </AdminProvider>
  );
};
