import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider, useAdminFunctions } from '@/providers/Admin/AdminProvider';

import { ConnectedShiftWorkEditModal } from '../../components/ShiftWork/ShiftWorkEditModal';
import { ShiftWorkTable } from '../../components/ShiftWork/ShiftWorkTable';

export const AdminShiftWork = () => {
  const translate = useTranslate();

  const adminFunctions = useAdminFunctions();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.shiftWork.title()}
        ActionButtons={<></>}
        TableComponent={<ShiftWorkTable />}
      />
      <ConnectedShiftWorkEditModal />
    </AdminProvider>
  );
};
