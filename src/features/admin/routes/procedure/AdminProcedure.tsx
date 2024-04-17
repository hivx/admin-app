import { MyButton } from '@/components';
import { AdminRightClickMenu } from '@/components/Admin/AdminRightClickMenu';
import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider, useAdminFunctions } from '@/providers/Admin/AdminProvider';

import { ConnectedProcedureCreateModal } from '../../components/Procedure/ProcedureCreateModal';
import { ConnectedProcedureEditModal } from '../../components/Procedure/ProcedureEditModal';
import { ProcedureListFilterForm } from '../../components/Procedure/ProcedureListFilterForm';
import { ProcedureTable } from '../../components/Procedure/ProcedureTable';

export const AdminProcedure = () => {
  const translate = useTranslate();

  const adminFunctions = useAdminFunctions();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.procedure.title()}
        TableComponent={<ProcedureTable FilterComponent={<ProcedureListFilterForm />} />}
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
      <ConnectedProcedureCreateModal />
      <ConnectedProcedureEditModal />
      <AdminRightClickMenu />
    </AdminProvider>
  );
};
