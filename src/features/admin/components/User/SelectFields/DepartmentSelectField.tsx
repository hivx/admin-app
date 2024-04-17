import { MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { Control, UseFormWatch } from 'react-hook-form';

import { useLazyGetListDepartmentsQuery } from '@/api/departments';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { useTranslate } from '@/hooks';

import { UserFormFields } from '../UserFormFields';

type DepartmentSelectFieldProps = {
  disableValue: string;
  control: Control<UserFormFields>;
  watch: UseFormWatch<UserFormFields>;
};

export const DepartmentSelectField: FC<DepartmentSelectFieldProps> = ({
  control,
  watch,
  disableValue,
}) => {
  const translate = useTranslate();
  const [trigger] = useLazyGetListDepartmentsQuery();
  const getListDepartment = async () => {
    return (await trigger({ filter: {} })).data?.list ?? [];
  };
  return (
    <MyLazyFormSelectField
      name="departmentID"
      control={control}
      required
      MySelectProps={{
        label: translate.resources.user.department(),
      }}
      disableValue={disableValue}
      onGetListRecord={getListDepartment}
      renderSelectField={({ listData: departmentList, formSelectFieldProps }) => (
        <MyFormSelectField {...formSelectFieldProps}>
          {departmentList.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </MyFormSelectField>
      )}
    />
  );
};
