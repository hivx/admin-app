import { MenuItem } from '@mui/material';
import { FC } from 'react';
import { Control, useWatch } from 'react-hook-form';

import { useGetListModalityQuery } from '@/api/modality';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { useTranslate } from '@/hooks';

import { ExaminationDefaultConfigField } from './ExaminationDefaultConfigForm';

type ModalitySelectFieldProps = {
  control: Control<ExaminationDefaultConfigField>;
  modalityType: string;
};

const ModalitySelectField: FC<ModalitySelectFieldProps> = (props) => {
  const { control, modalityType } = props;

  const translate = useTranslate();
  const { data: modality } = useGetListModalityQuery(
    {
      filter: { modalityTypes: modalityType ? [modalityType] : undefined },
    },
    { skip: !modalityType },
  );

  return (
    <MyFormSelectField
      name="modalityID"
      key={modalityType}
      control={control}
      MySelectProps={{
        label: translate.resources.order.modality(),
        size: 'small',
      }}
    >
      {modality &&
        modality?.list.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.id}. {item.name}
          </MenuItem>
        ))}
    </MyFormSelectField>
  );
};

export default ModalitySelectField;
