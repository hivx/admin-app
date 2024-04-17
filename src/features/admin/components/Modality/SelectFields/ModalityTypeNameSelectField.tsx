import { MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { Control, UseFormWatch } from 'react-hook-form';

import { useLazyGetListModalityTypeNameQuery } from '@/api/modalityTypeName';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { useTranslate } from '@/hooks';

import { IModalityFormFields } from '../ModalityEditForm';

type ModalityTypeSelectFieldProps = {
  control: Control<IModalityFormFields>;
  watch: UseFormWatch<IModalityFormFields>;
};
const ModalityTypeSelectField: FC<ModalityTypeSelectFieldProps> = (props) => {
  const { control, watch } = props;
  const translate = useTranslate();
  const disableValue = watch('modalityType');
  const [trigger] = useLazyGetListModalityTypeNameQuery();

  const getListModalityTypeName = async () => {
    return (await trigger({ filter: {} })).data?.list ?? [];
  };
  return (
    <MyLazyFormSelectField
      name="modalityType"
      control={control}
      required
      MySelectProps={{
        label: translate.resources.modality.modalityType.short(),
      }}
      disableValue={disableValue}
      onGetListRecord={getListModalityTypeName}
      renderSelectField={({ listData: modalityTypeNameList, formSelectFieldProps }) => (
        <MyFormSelectField {...formSelectFieldProps}>
          {modalityTypeNameList.map((item) => (
            <MenuItem key={item.id} value={item?.id || ''}>
              {item.id}
            </MenuItem>
          ))}
        </MyFormSelectField>
      )}
    />
  );
};

export default ModalityTypeSelectField;
