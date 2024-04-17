import { MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { Control } from 'react-hook-form';

import { useLazyGetListModalityTypeQuery } from '@/api/modalityType';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { useTranslate } from '@/hooks';

import { ExaminationDefaultConfigField } from './ExaminationDefaultConfigForm';

type ModalityTypeSelectFieldProps = {
  control: Control<ExaminationDefaultConfigField>;
};

const ModalityTypeSelectField: FC<ModalityTypeSelectFieldProps> = (props) => {
  const { control } = props;
  const translate = useTranslate();
  const [trigger] = useLazyGetListModalityTypeQuery();
  /**
   * requests in order
   */
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
        size: 'small',
        disabled: false,
      }}
      onGetListRecord={getListModalityType}
      renderSelectField={({ listData: modalityTypeList, formSelectFieldProps }) => (
        <MyFormSelectField {...formSelectFieldProps}>
          <MenuItem key="null" value={''}>
            &nbsp;
          </MenuItem>
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
