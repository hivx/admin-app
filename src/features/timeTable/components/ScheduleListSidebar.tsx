import { Stack } from '@mui/material';
import React from 'react';

import { SidebarLayout } from '@/components/Elements/Navigation/SidebarLayout';
import { useTranslate } from '@/hooks';

import { SidebarCalendar } from './SidebarCalendar';
import { SidebarListUser } from './SidebarListUser';
import { SidebarShiftInfomation } from './SidebarShiftInfomation';

export const ScheduleListSidebar = () => {
  const translate = useTranslate();
  return (
    <SidebarLayout title={translate.pages.timeTable.title()} collapsible>
      <Stack height={'100%'} justifyContent={'space-between'} overflow="auto">
        <SidebarCalendar />
        <div style={{ display: 'grid' }}>
          <SidebarListUser />
          <SidebarShiftInfomation />
        </div>
      </Stack>
    </SidebarLayout>
  );
};
