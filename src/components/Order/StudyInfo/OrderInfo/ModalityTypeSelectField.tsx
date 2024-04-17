import { MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { Control } from 'react-hook-form';

import { useLazyGetListModalityTypeQuery } from '@/api/modalityType';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { useAppSelector, useTranslate } from '@/hooks';
import {
  selectOrderRequestData,
  selectProcedures,
} from '@/stores/examinnation/createOrderSlice';
import {
  IOrderDTO,
  IOrderRequestDTO,
  IOrderRequestDTOCreate,
  IOrderUpdateDTO,
  IProcedureDTO,
} from '@/types/dto';

type ModalityTypeSelectFieldProps = {
  order?: IOrderDTO;
  readonly?: boolean;
  control: Control<IOrderUpdateDTO>;
};

/**
 * Trường modalityType cần disabled khi chỉ định đã tồn tại request
 */
const isDisabledModalityTypeField = (
  localProcedures?: IProcedureDTO[],
  orderRequest?: IOrderRequestDTO[],
  readonly?: boolean,
) => {
  const notExistRequest = !orderRequest?.length && !localProcedures?.length;
  const disabledModalityType = !notExistRequest || readonly;

  return disabledModalityType;
};

const ModalityTypeSelectField: FC<ModalityTypeSelectFieldProps> = (props) => {
  const { control, readonly, order } = props;
  const translate = useTranslate();
  const [trigger] = useLazyGetListModalityTypeQuery();
  const disableValue = control._formValues.modalityType;
  /**
   * requests local
   */
  const localProcedures = useAppSelector(selectProcedures);
  /**
   * requests in order
   */
  const orderRequest = order?.requests;

  const getListModalityType = async () => {
    return (await trigger({ filter: {} })).data?.list ?? [];
  };
  return (
    <MyLazyFormSelectField
      name="modalityType"
      control={control}
      required
      MySelectProps={{
        label: translate.resources.order.modalityType.long(),
        size: 'extrasmall',
        disabled: isDisabledModalityTypeField(
          localProcedures,
          orderRequest ?? undefined,
          readonly,
        ),
      }}
      disableValue={disableValue}
      onGetListRecord={getListModalityType}
      renderSelectField={({ listData: modalityTypeList, formSelectFieldProps }) => (
        <MyFormSelectField {...formSelectFieldProps}>
          {modalityTypeList.map((item) => (
            <MenuItem key={item.id} value={item?.name || ''}>
              {item.name}
            </MenuItem>
          ))}
        </MyFormSelectField>
      )}
    />
  );
};

export default ModalityTypeSelectField;
