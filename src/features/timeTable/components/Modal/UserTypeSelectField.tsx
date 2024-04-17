import { MenuItem } from '@mui/material';
import React, { FC } from 'react';

import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { useTranslate } from '@/hooks';
import { USER_TYPE } from '@/types/dto';

import { UpdateTimetableFormFieldsProps } from './UpdateTimetableFormFields';

export const UserTypeForTimetableModules = [
  `${USER_TYPE.IMAGING_DOCTOR}`,
  `${USER_TYPE.NURSING}`,
  `${USER_TYPE.TECHNICIAN}`,
];

export const UserTypeSelectField: FC<UpdateTimetableFormFieldsProps> = ({ control }) => {
  const translate = useTranslate();
  UserTypeForTimetableModules;
  return (
    <MyFormSelectField
      name="userType"
      control={control}
      MySelectProps={{
        label: translate.resources.user.userType(),
      }}
    >
      {UserTypeForTimetableModules.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </MyFormSelectField>
  );
};
