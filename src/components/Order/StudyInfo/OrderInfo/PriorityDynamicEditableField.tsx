import { MenuItem } from '@mui/material';
import { FC } from 'react';
import { Control, UseFormWatch } from 'react-hook-form';

import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { useLazyGetListPriorityQuery } from '@/features/order';
import { useTranslate } from '@/hooks';
import { IOrderDTO, IOrderUpdateDTO } from '@/types/dto';

type PriorityDynamicEditableFieldProps = {
  order?: IOrderDTO;
  readonly?: boolean;
  control: Control<IOrderUpdateDTO>;
  watch: UseFormWatch<IOrderUpdateDTO>;
};
export const PriorityDynamicEditableField: FC<PriorityDynamicEditableFieldProps> = (
  props,
) => {
  const { readonly, watch, control, order } = props;
  const translate = useTranslate();
  const disabledValue = order?.priority?.name ?? '';

  const [trigger] = useLazyGetListPriorityQuery();
  const getListPriority = async () => {
    return (await trigger({ filter: {} })).data?.list ?? [];
  };

  return (
    <MyLazyFormSelectField
      control={control}
      name="priorityID"
      disableValue={disabledValue}
      onGetListRecord={getListPriority}
      renderSelectField={({ formSelectFieldProps, listData }) => {
        return (
          <MyFormSelectField {...formSelectFieldProps}>
            <MenuItem key="null" value={-1}>
              &nbsp;
            </MenuItem>
            {listData.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </MyFormSelectField>
        );
      }}
      MySelectProps={{
        label: translate.resources.order.priority(),
        size: 'extrasmall',
        disabled: readonly,
      }}
    />
  );
};
