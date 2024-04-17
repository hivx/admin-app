import { MenuItem } from '@mui/material';
import { useEffect } from 'react';
import { Control, Path, UseFormWatch } from 'react-hook-form';

import { useLazyGetListUsersQuery } from '@/api/users';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { useTranslate } from '@/hooks';
import { IOrderUpdateDTO, IUserDTO } from '@/types/dto';

type ReferringPhysicianFieldProps = {
  name: Path<IOrderUpdateDTO>;
  control: Control<IOrderUpdateDTO>;
  watch: UseFormWatch<IOrderUpdateDTO>;
  disabled?: boolean;
};

export const ReferringPhysicianField = (props: ReferringPhysicianFieldProps) => {
  const { control, name, watch, disabled } = props;
  const departmentID = watch('requestedDepartmentID');
  const [trigger, { data: referringPhysician, isFetching }] = useLazyGetListUsersQuery();
  useEffect(() => {
    trigger({ filter: { departmentID } });
  }, []);
  const translate = useTranslate();
  return (
    <MyFormSelectField
      key={departmentID}
      name={name}
      control={control}
      MySelectProps={{
        label: translate.resources.order.referringPhysician.long(),
        disabled: disabled,
        defaultOpen: true,
      }}
    >
      <MenuItem key="null" value={-1}>
        &nbsp;
      </MenuItem>
      {referringPhysician && !isFetching ? (
        referringPhysician?.list.map((item: IUserDTO) => (
          <MenuItem key={item.id} value={item.id}>
            {item.fullname}
          </MenuItem>
        ))
      ) : (
        <FullPageSpinner />
      )}
    </MyFormSelectField>
  );
};
