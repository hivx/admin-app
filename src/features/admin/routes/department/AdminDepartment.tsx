import { MyButton } from '@/components';
import { AdminRightClickMenu } from '@/components/Admin/AdminRightClickMenu';
import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider, useAdminFunctions } from '@/providers/Admin/AdminProvider';

import { ConnectedDepartmentEditModal } from '../../components/Department/DepartmenEditModal';
import { ConnectedDepartmentCreateModal } from '../../components/Department/DepartmentCreateModal';
import { DepartmentListFilterForm } from '../../components/Department/DepartmentListFilterForm';
import { DepartmentTable } from '../../components/Department/DepartmentTable';
import { DepartmentUserPanel } from '../../components/Department/DepartmentUserPanel';

export const AdminDepartment = () => {
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.department.title()}
        TableComponent={
          <DepartmentTable FilterComponent={<DepartmentListFilterForm />} />
        }
        PanelComponent={<DepartmentUserPanel />}
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
      <ConnectedDepartmentCreateModal />
      <ConnectedDepartmentEditModal />
      <AdminRightClickMenu />
    </AdminProvider>
  );
};
