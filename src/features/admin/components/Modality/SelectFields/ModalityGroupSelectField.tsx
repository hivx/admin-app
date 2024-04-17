import { MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { Control, UseFormWatch } from 'react-hook-form';

import { useLazyGetListModalityGroupQuery } from '@/api/modalityGroup';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { useTranslate } from '@/hooks';
import { IModalityDTO } from '@/types/dto';

import { IModalityFormFields } from '../ModalityEditForm';

type ModalityGroupSelectFieldProps = {
  control: Control<IModalityFormFields>;
  record?: IModalityDTO;
};
const ModalityGroupSelectField: FC<ModalityGroupSelectFieldProps> = (props) => {
  const { control, record } = props;
  const translate = useTranslate();
  const disableValue = record?.group?.name;
  const [trigger] = useLazyGetListModalityGroupQuery();

  const getListModalityGroup = async () => {
    return (await trigger({ filter: {} })).data?.list ?? [];
  };
  return (
    <MyLazyFormSelectField
      name="groupID"
      control={control}
      MySelectProps={{
        label: translate.resources.modality.group.short(),
      }}
      disableValue={disableValue ?? ''}
      onGetListRecord={getListModalityGroup}
      renderSelectField={({ listData: modalityGroupList, formSelectFieldProps }) => (
        <MyFormSelectField {...formSelectFieldProps}>
          {modalityGroupList.map((item) => (
            <MenuItem key={item.id} value={item?.id || ''}>
              {item.name}
            </MenuItem>
          ))}
        </MyFormSelectField>
      )}
    />
  );
};

export default ModalityGroupSelectField;
