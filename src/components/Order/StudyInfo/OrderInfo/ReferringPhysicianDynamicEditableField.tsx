import { MenuItem } from '@mui/material';
import { FC } from 'react';
import { Control, UseFormWatch } from 'react-hook-form';

import { useLazyGetListUsersQuery } from '@/api/users';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { useTranslate } from '@/hooks';
import { IOrderDTO, IOrderUpdateDTO } from '@/types/dto';

type ReferringPhysicianDynamicEditableFieldProps = {
  order?: IOrderDTO;
  readonly?: boolean;
  control: Control<IOrderUpdateDTO>;
  watch: UseFormWatch<IOrderUpdateDTO>;
  disabledValue: string;
  setPhysicianDisableValue: React.Dispatch<React.SetStateAction<string | undefined>>;
};
export const ReferringPhysicianDynamicEditableField: FC<
  ReferringPhysicianDynamicEditableFieldProps
> = (props) => {
  const { readonly, watch, control, order, disabledValue, setPhysicianDisableValue } =
    props;
  const translate = useTranslate();
  const requestedDepartmentID = watch('requestedDepartmentID');
  const [trigger] = useLazyGetListUsersQuery();
  const getListUser = async () => {
    return (
      (await trigger({ filter: { departmentID: requestedDepartmentID } })).data?.list ??
      []
    );
  };

  return (
    <MyLazyFormSelectField
      control={control}
      key={requestedDepartmentID}
      name="referringPhysicianID"
      disableValue={disabledValue ?? 'aaa'}
      onGetListRecord={getListUser}
      renderSelectField={({ formSelectFieldProps, listData }) => {
        return (
          <MyFormSelectField {...formSelectFieldProps}>
            <MenuItem key="null" value={-1} onClick={(e) => setPhysicianDisableValue('')}>
              &nbsp;
            </MenuItem>
            {listData.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
                onClick={(e) => setPhysicianDisableValue(item.fullname ?? '')}
              >
                {item.fullname}
              </MenuItem>
            ))}
          </MyFormSelectField>
        );
      }}
      MySelectProps={{
        label: translate.resources.order.referringPhysician.long(),
        size: 'extrasmall',
        disabled: readonly || !requestedDepartmentID,
      }}
    />
  );
};
