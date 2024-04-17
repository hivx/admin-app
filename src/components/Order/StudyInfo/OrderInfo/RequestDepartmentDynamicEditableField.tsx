import { MenuItem } from '@mui/material';
import { FC } from 'react';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { useLazyGetListDepartmentsQuery } from '@/api/departments';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { useTranslate } from '@/hooks';
import { IOrderDTO, IOrderUpdateDTO } from '@/types/dto';

type RequestDepartmentDynamicEditableFieldProps = {
  order?: IOrderDTO;
  readonly?: boolean;
  control: Control<IOrderUpdateDTO>;
  watch: UseFormWatch<IOrderUpdateDTO>;
  setPhysicianDisableValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  setValue: UseFormSetValue<IOrderUpdateDTO>;
};
export const RequestDepartmentDynamicEditableField: FC<
  RequestDepartmentDynamicEditableFieldProps
> = (props) => {
  const { readonly, control, order, setPhysicianDisableValue, setValue } = props;
  const translate = useTranslate();

  const disabledValue = order?.requestedDepartment?.name ?? '';

  const [trigger] = useLazyGetListDepartmentsQuery();
  const getListDepartment = async () => {
    return (await trigger({ filter: {} })).data?.list ?? [];
  };

  return (
    <MyLazyFormSelectField
      control={control}
      name="requestedDepartmentID"
      disableValue={disabledValue}
      onGetListRecord={getListDepartment}
      renderSelectField={({ formSelectFieldProps, listData }) => {
        return (
          <MyFormSelectField {...formSelectFieldProps}>
            <MenuItem
              key="null"
              value={-1}
              onClick={() => {
                setPhysicianDisableValue('');
                setValue('referringPhysicianID', -1);
              }}
            >
              &nbsp;
            </MenuItem>
            {listData.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
                onClick={() => setPhysicianDisableValue('')}
              >
                {item.name}
              </MenuItem>
            ))}
          </MyFormSelectField>
        );
      }}
      MySelectProps={{
        label: translate.resources.order.requestedDepartment.long(),
        size: 'extrasmall',
        disabled: readonly,
      }}
    />
  );
};
