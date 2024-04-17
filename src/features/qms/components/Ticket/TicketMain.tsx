import { Box } from '@mui/material';

import { SidebarLayout } from '@/components/Elements/Navigation/SidebarLayout';
import { useTranslate } from '@/hooks/useTranslate';

import TicketActionButtons from './TicketActionButtons';
import { TicketListFilterForm } from './TicketListFilterForm';
import { TicketListSidebar } from './TicketListSidebar';
import { TicketMainLayout } from './TicketMainLayout';
import { TicketNumber } from './TicketNumber';
import { TicketRoomNameConnected } from './TicketRoomName';
import { TicketShell } from './TicketShell';
import { TicketTable } from './TicketTable';

export const TicketMain = () => {
  const translate = useTranslate();

  return (
    <TicketMainLayout title="Phòng chụp">
      <SidebarLayout title="Phòng chụp" collapsible>
        <TicketListSidebar />
      </SidebarLayout>
      <Box width="100%" height="100%">
        <TicketShell
          FilterComponent={<TicketListFilterForm />}
          TableComponent={<TicketTable />}
          TicketNumber={<TicketNumber />}
          ActionButons={<TicketActionButtons />}
          RoomName={<TicketRoomNameConnected />}
        />
      </Box>
    </TicketMainLayout>
  );
};
