import { Stack } from '@mui/material';

import { NavBarLayout } from '@/components/Layout/NavBarLayout';
import { useTranslate } from '@/hooks';

import { ScheduleLayout } from '../components/layout/ScheduleLayout';
import { ScheduleListSidebar } from '../components/ScheduleListSidebar';
import { ScheduleTable } from '../components/Table/ScheduleTable';

export const TimeTableList = () => {
  const translate = useTranslate();

  return (
    <NavBarLayout>
      <ScheduleLayout title={translate.pages.timeTable.title()}>
        <ScheduleListSidebar />
        <Stack height="100%" width="100%" overflow="hidden" padding={1}>
          <ScheduleTable />
        </Stack>
      </ScheduleLayout>
    </NavBarLayout>
  );
};
