import { MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { Control, UseFormWatch } from 'react-hook-form';

import { useLazyGetListUserTypeQuery } from '@/api/userType';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { useTranslate } from '@/hooks';

import { UserFormFields } from '../UserFormFields';

type UserTypeSelectFieldProps = {
  disableValue: string;
  control: Control<UserFormFields>;
  watch: UseFormWatch<UserFormFields>;
};

export const UserTypeSelectField: FC<UserTypeSelectFieldProps> = ({
  control,
  watch,
  disableValue,
}) => {
  const translate = useTranslate();
  const [trigger] = useLazyGetListUserTypeQuery();
  const getListUserType = async () => {
    return (await trigger({ filter: {} })).data?.list ?? [];
  };
  return (
    <MyLazyFormSelectField
      name="type"
      control={control}
      required
      MySelectProps={{
        label: translate.resources.user.userType(),
      }}
      disableValue={disableValue}
      onGetListRecord={getListUserType}
      renderSelectField={({ listData: userTypeList, formSelectFieldProps }) => {
        return (
          <MyFormSelectField {...formSelectFieldProps}>
            {userTypeList.map((item) => (
              <MenuItem key={item.id} value={item?.name || ''}>
                {item.name}
              </MenuItem>
            ))}
          </MyFormSelectField>
        );
      }}
    />
  );
};
