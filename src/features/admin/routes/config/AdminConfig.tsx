import { AdminRightClickMenu } from '@/components/Admin/AdminRightClickMenu';
import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider } from '@/providers/Admin/AdminProvider';

import { ConnectedConfigCreateModal } from '../../components/Config/ConfigCreateModal';
import { ConnectedConfigEditModal } from '../../components/Config/ConfigEditModal';
import { ConfigListTable } from '../../components/Config/ConfigListTable';

export const AdminConfig = () => {
  const translate = useTranslate();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.config.title()}
        ActionButtons={<></>}
        TableComponent={<ConfigListTable />}
      />
      <ConnectedConfigCreateModal />
      <ConnectedConfigEditModal />
      <AdminRightClickMenu />
    </AdminProvider>
  );
};
