import { MyButton } from '@/components';
import { AdminRightClickMenu } from '@/components/Admin/AdminRightClickMenu';
import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider, useAdminFunctions } from '@/providers/Admin/AdminProvider';

import { ConnectedUserCreateModal } from '../../components/User/UserCreateModal';
import { ConnectedUserEditModal } from '../../components/User/UserEditModal';
import { UserListFilterForm } from '../../components/User/UserListFilterForm';
import { UserTable } from '../../components/User/UserTable';

export const AdminUser = () => {
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.user.name()}
        TableComponent={<UserTable FilterComponent={<UserListFilterForm />} />}
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

      <ConnectedUserCreateModal />
      <ConnectedUserEditModal />
    </AdminProvider>
  );
};
