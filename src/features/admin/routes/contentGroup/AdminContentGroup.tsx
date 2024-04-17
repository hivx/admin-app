import { MyButton } from '@/components';
import { AdminRightClickMenu } from '@/components/Admin/AdminRightClickMenu';
import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider, useAdminFunctions } from '@/providers/Admin/AdminProvider';

import { ConnectedContentGroupCreateModal } from '../../components/ContentGroup/ContentGroupCreateModal';
import { ConnectedContentGroupEditModal } from '../../components/ContentGroup/ContentGroupEditModal';
import { ContentGroupTable } from '../../components/ContentGroup/ContentGroupTable';
import { ContentListFilterForm } from '../../components/ContentGroup/ContentListFilterForm';
import { ContentListPanel } from '../../components/ContentGroup/ContentListPanel';

export const AdminContentGroup = () => {
  const translate = useTranslate();

  const adminFunctions = useAdminFunctions();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.contentGroup.title()}
        TableComponent={<ContentGroupTable FilterComponent={<ContentListFilterForm />} />}
        PanelComponent={<ContentListPanel />}
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
      <ConnectedContentGroupCreateModal />
      <ConnectedContentGroupEditModal />
      <AdminRightClickMenu />
    </AdminProvider>
  );
};
