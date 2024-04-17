import { MyButton } from '@/components';
import { AdminRightClickMenu } from '@/components/Admin/AdminRightClickMenu';
import { AdminShell } from '@/components/Admin/AdminShell';
import { ConnectedContentCreateModal } from '@/components/Admin/Content/ContentCreateModal';
import { ConnectedContentEditModal } from '@/components/Admin/Content/ContentEditModal';
import { useTranslate } from '@/hooks';
import { AdminProvider, useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { TABLE_CONTENT } from '@/stores/table/tableInitialState';

import { ContentFilterForm } from '../../components/Content/ContentFilterForm';
import { ContentTable } from '../../components/Content/ContentTable';

export const AdminContent = () => {
  const translate = useTranslate();

  const adminFunctions = useAdminFunctions();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.content.title()}
        TableComponent={<ContentTable FilterComponent={<ContentFilterForm />} />}
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
      <ConnectedContentCreateModal />
      <ConnectedContentEditModal tableID={TABLE_CONTENT} />
      <AdminRightClickMenu />
    </AdminProvider>
  );
};
