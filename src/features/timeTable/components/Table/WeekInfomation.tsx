import { Typography } from '@mui/material';
import dayjs from 'dayjs';

import { useTranslate } from '@/hooks';
import { DISPLAY_FORMAT } from '@/utils/dateUtils';

import { useDateOfWeek } from '../../hook/useDateOfWeek';

export const WeekInfomation = () => {
  const translate = useTranslate();
  const { startOfWeek, endOfWeek } = useDateOfWeek();

  return (
    <Typography>
      {translate.resources.timetable.weekFrom()} :{' '}
      {startOfWeek && dayjs(startOfWeek).format(DISPLAY_FORMAT.date)}{' '}
      {translate.resources.timetable.weekTo()} :{' '}
      {endOfWeek && dayjs(endOfWeek).format(DISPLAY_FORMAT.date)}
    </Typography>
  );
};
