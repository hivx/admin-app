import { MenuItem } from '@mui/material';
import { useEffect } from 'react';
import { Control, Path } from 'react-hook-form';

import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { useLazyGetListPriorityQuery } from '@/features/order';
import { useTranslate } from '@/hooks';
import { IOrderUpdateDTO } from '@/types/dto';
import { IProrityDTO } from '@/types/dto/priority';

type PriorityFieldProps = {
  name: Path<IOrderUpdateDTO>;
  control: Control<IOrderUpdateDTO>;
  disabled?: boolean;
};

export const PriorityField = (props: PriorityFieldProps) => {
  const { control, name, disabled } = props;
  const [trigger, { data: priorityData, isFetching }] = useLazyGetListPriorityQuery();
  useEffect(() => {
    trigger({ filter: {} });
  }, []);
  const translate = useTranslate();
  return (
    <MyFormSelectField
      name={name}
      control={control}
      MySelectProps={{
        label: translate.resources.order.priority(),
        disabled: disabled,
        defaultOpen: true,
      }}
    >
      <MenuItem key="null" value={-1}>
        &nbsp;
      </MenuItem>
      {priorityData && !isFetching ? (
        priorityData?.list.map((item: IProrityDTO) => (
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
