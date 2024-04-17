import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider, useAdminFunctions } from '@/providers/Admin/AdminProvider';

import { ConnectedEventLogInfoModal } from '../../components/EventLog/EventLogInfoModal';
import { EventLogTable } from '../../components/EventLog/EventLogTable';

export const AdminEventLog = () => {
  const translate = useTranslate();

  const adminFunctions = useAdminFunctions();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.eventLog.title()}
        ActionButtons={<></>}
        TableComponent={<EventLogTable />}
      />
      <ConnectedEventLogInfoModal />
    </AdminProvider>
  );
};
