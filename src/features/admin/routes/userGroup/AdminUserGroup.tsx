import { MyButton } from '@/components';
import { AdminRightClickMenu } from '@/components/Admin/AdminRightClickMenu';
import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider, useAdminFunctions } from '@/providers/Admin/AdminProvider';

import { ConnectedUserGroupCreateModal } from '../../components/UserGroup/UserGroupCreateModal';
import { ConnectedUserGroupEditModal } from '../../components/UserGroup/UserGroupEditModal';
import { UserGroupMemberPanel } from '../../components/UserGroup/UserGroupMemberPanel';
import { UserGroupTable } from '../../components/UserGroup/UserGroupTable';

export const AdminUserGroup = () => {
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.group.title()}
        TableComponent={<UserGroupTable />}
        PanelComponent={<UserGroupMemberPanel />}
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
      <ConnectedUserGroupCreateModal />
      <ConnectedUserGroupEditModal />
    </AdminProvider>
  );
};
