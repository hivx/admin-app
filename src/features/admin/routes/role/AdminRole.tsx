import { AdminRightClickMenu } from '@/components/Admin/AdminRightClickMenu';
import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider } from '@/providers/Admin/AdminProvider';
import { useUserPermission } from '@/providers/AuthProvider';

import { ConnectedRoleCreateModal } from '../../components/Role/RoleCreateModal';
import { ConnectedRoleEditModal } from '../../components/Role/RoleEditModal';
import { RoleTable } from '../../components/Role/RoleTable';

export const AdminRole = () => {
  const translate = useTranslate();

  const permission = useUserPermission();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.role.title()}
        ActionButtons={<></>}
        TableComponent={<RoleTable permission={permission} FilterComponent={undefined} />}
      />
      <ConnectedRoleCreateModal />
      <ConnectedRoleEditModal />
      <AdminRightClickMenu disabled={!permission?.isSysadmin} />
    </AdminProvider>
  );
};
