import { MyButton } from '@/components';
import { AdminRightClickMenu } from '@/components/Admin/AdminRightClickMenu';
import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider, useAdminFunctions } from '@/providers/Admin/AdminProvider';

import { ConnectedProcedureGroupCreateModal } from '../../../../components/Order/ProcedureGroup/ProcedureGroupCreateModal';
import { ConnectedProcedureGroupEditModal } from '../../../../components/Order/ProcedureGroup/ProcedureGroupEditModal';
import { ProcedureGroupTable } from '../../../../components/Order/ProcedureGroup/ProcedureGroupTable';

export const AdminProcedureGroup = () => {
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.procedureGroup.title()}
        TableComponent={<ProcedureGroupTable />}
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
      <ConnectedProcedureGroupCreateModal />
      <ConnectedProcedureGroupEditModal />
      <AdminRightClickMenu />
    </AdminProvider>
  );
};
