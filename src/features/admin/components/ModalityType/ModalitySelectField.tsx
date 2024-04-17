import { MenuItem } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';

import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { useTranslate } from '@/hooks';

import { useGetListModalityQuery } from '../../../../api/modality';

type ModalitySelectFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  modalityAbbr: string | null | undefined;
};
export const ModalitySelectField = <T extends FieldValues>(
  props: ModalitySelectFieldProps<T>,
) => {
  const { control, modalityAbbr, name } = props;
  const translate = useTranslate();
  const { data: modality } = useGetListModalityQuery(
    {
      filter: { modalityTypes: modalityAbbr ? [modalityAbbr] : undefined },
    },
    { skip: !modalityAbbr },
  );
  return (
    <MyFormSelectField
      name={name}
      control={control}
      MySelectProps={{
        label: translate.resources.modalityType.preferredModality(),
      }}
    >
      <MenuItem key="null" value={0}>
        &nbsp;
      </MenuItem>
      {modality &&
        modality?.list.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.id}. {item.name}
          </MenuItem>
        ))}
    </MyFormSelectField>
  );
};
