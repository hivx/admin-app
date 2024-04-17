import { Stack, Typography, lighten, styled, useMediaQuery } from '@mui/material';
import React from 'react';

import { ItechNotStartedIcon } from '@/assets/icon';
import { CollapsibleBoxLayout } from '@/components/Order/Sidebar/CollapsibleBox/CollapsibleBoxLayout';
import { useTranslate } from '@/hooks';

import { usePeriodDisplayData } from '../hook/usePeriodDisplayData';

const SHIFT_ICON_SIZE = '0.9rem';

export const SidebarShiftInfomation = () => {
  const translate = useTranslate();

  const data = usePeriodDisplayData();
  const isXs = useMediaQuery('(max-height:856px)');

  return (
    <CollapsibleBoxLayout
      title={'Ca làm việc'}
      collapsible
      sx={isXs ? { height: '100px' } : undefined}
    >
      <Stack padding={1} style={{ maxHeight: '30vh', overflow: 'auto' }}>
        {data?.length &&
          data.map((period) => {
            return (
              <Stack height="100%" key={period.id}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <ItechNotStartedIcon
                    color="primary"
                    sx={{ fontSize: SHIFT_ICON_SIZE }}
                  />
                  <Typography>{period.periodName}</Typography>
                </Stack>
                <Stack paddingLeft={3}>
                  <StyledShiftTime>
                    {period.displayTime}
                    {period.consecutive && `(${translate.resources.timetable.nextDay()})`}
                  </StyledShiftTime>
                </Stack>
              </Stack>
            );
          })}
      </Stack>
    </CollapsibleBoxLayout>
  );
};

const StyledShiftTime = styled(Typography)`
  color: ${(props) => lighten(props.theme.palette.text.primary, 0.5)};
`;
