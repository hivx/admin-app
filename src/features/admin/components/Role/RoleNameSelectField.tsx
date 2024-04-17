import { MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { Control } from 'react-hook-form';

import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { useTranslate } from '@/hooks';

import { useLazyGetListRoleNameQuery } from '../../api/role';

import { RoleFormFields } from './RoleFormFields';

type RoleNameSelectFieldProps = {
  readonly?: boolean;
  control: Control<RoleFormFields>;
};
const RoleNameSelectField: FC<RoleNameSelectFieldProps> = (props) => {
  const { control, readonly } = props;
  const translate = useTranslate();

  const [trigger] = useLazyGetListRoleNameQuery();
  const disableValue = control._formValues.id;
  /**
   * func get list role name
   */
  const getRoleNameList = async () => {
    return (
      (
        await trigger(
          {
            filter: {},
          },
          true,
        )
      ).data?.list ?? []
    );
  };

  return (
    <MyLazyFormSelectField
      name="id"
      control={control}
      required
      MySelectProps={{
        label: translate.resources.role.id(),
        disabled: readonly,
      }}
      disableValue={disableValue}
      onGetListRecord={getRoleNameList}
      renderSelectField={({ listData: roleNameList, formSelectFieldProps }) => (
        <MyFormSelectField {...formSelectFieldProps}>
          {roleNameList.map((item) => (
            <MenuItem key={item.id} value={item?.id || ''}>
              {item.name}
            </MenuItem>
          ))}
        </MyFormSelectField>
      )}
    />
  );
};

export default RoleNameSelectField;
