import { MenuItem } from '@mui/material';
import { useEffect } from 'react';
import { Control, Path } from 'react-hook-form';

import { useLazyGetListDepartmentsQuery } from '@/api/departments';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { useTranslate } from '@/hooks';
import { IDepartmentDTO, IOrderUpdateDTO } from '@/types/dto';

type RequestDepartmentFieldProps = {
  name: Path<IOrderUpdateDTO>;
  control: Control<IOrderUpdateDTO>;
  disabled?: boolean;
};

export const RequestDepartmentField = (props: RequestDepartmentFieldProps) => {
  const { control, name, disabled } = props;
  const [trigger, { data: departmentData, isFetching }] =
    useLazyGetListDepartmentsQuery();
  useEffect(() => {
    trigger({ filter: {} });
  }, [trigger]);
  const translate = useTranslate();
  return (
    <MyFormSelectField
      name={name}
      control={control}
      MySelectProps={{
        label: translate.resources.order.requestedDepartment.long(),
        disabled: disabled,
        defaultOpen: true,
      }}
    >
      <MenuItem key="null" value={-1}>
        &nbsp;
      </MenuItem>
      {departmentData && !isFetching ? (
        departmentData?.list.map((item: IDepartmentDTO) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))
      ) : (
        <FullPageSpinner />
      )}
    </MyFormSelectField>
  );
};
