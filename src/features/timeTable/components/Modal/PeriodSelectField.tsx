import { MenuItem } from '@mui/material';
import React, { FC } from 'react';

import { useGetListTimetablePeriodQuery } from '@/api/timetablePeriod';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { useTranslate } from '@/hooks';

import { UpdateTimetableFormFieldsProps } from './UpdateTimetableFormFields';

export const PeriodSelectField: FC<UpdateTimetableFormFieldsProps> = ({ control }) => {
  const { data } = useGetListTimetablePeriodQuery({ filter: {} });
  const translate = useTranslate();

  return (
    <MyFormSelectField
      name="period"
      control={control}
      MySelectProps={{
        label: translate.resources.shiftWork.title(),
        size: 'small',
      }}
    >
      {data?.list.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      ))}
    </MyFormSelectField>
  );
};
