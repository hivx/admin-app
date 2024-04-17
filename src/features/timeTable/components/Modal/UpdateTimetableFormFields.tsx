import { Stack } from '@mui/material';
import React, { FC } from 'react';

import { IFormControlInputProps } from '@/components/Form';
import { useTranslate } from '@/hooks';

import { usePeriodDisplayData } from '../../hook/usePeriodDisplayData';

import { PeriodItem } from './PeriodItem';
import { UpdateTimetableFieldsType } from './UpdateTimetableForm';
import { UsersAutoCompleteField } from './UsersAutoCompleteField';
import { UserTypeSelectField } from './UserTypeSelectField';

export type UpdateTimetableFormFieldsProps =
  IFormControlInputProps<UpdateTimetableFieldsType> & {
    onSuccessCallback?: () => void;
  };

export const UpdateTimetableFormFields: FC<UpdateTimetableFormFieldsProps> = (props) => {
  const data = usePeriodDisplayData();
  props.getValues('period');
  return (
    <Stack spacing={1}>
      <UserTypeSelectField {...props} />
      <UsersAutoCompleteField {...props} />
      <div style={{ display: 'grid', gridTemplateColumns: '0.75fr 2fr', gap: '8px' }}>
        {data.map((item, index) => {
          return <PeriodItem key={index} {...item} {...props} />;
        })}
      </div>
    </Stack>
  );
};
