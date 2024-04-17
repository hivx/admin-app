import { MenuItem, Stack } from '@mui/material';
import { FC } from 'react';

import { MyFormTextField, MyTextField } from '@/components';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { IFormControlInputProps } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { IContentGroupDTO, IModalityTypeDTO } from '@/types/dto';

export type IContentGroupFormFields = Partial<IContentGroupDTO>;

type ContentGroupFormFieldsProps = IFormControlInputProps<IContentGroupFormFields> & {
  record?: IContentGroupDTO;
  modalityTypes: IModalityTypeDTO[];
};
export const ContentGroupFormFields: FC<ContentGroupFormFieldsProps> = (props) => {
  const { record, control, onKeyDown, modalityTypes } = props;
  const translate = useTranslate();
  return (
    <Stack spacing={1} alignItems="start" width="500px">
      {record && (
        <MyTextField value={record.id} size="small" label={'ID'} disabled fullWidth />
      )}
      <MyFormTextField
        name="name"
        control={control}
        MyTextFieldProps={{
          label: translate.resources.contentGroup.name(),
          placeholder: translate.resources.contentGroup.name(),
          fullWidth: true,
          required: true,
          size: 'small',
          onKeyDown,
        }}
      />
      {modalityTypes && (
        <MyFormSelectField
          name="modalityType"
          control={control}
          required
          MySelectProps={{
            label: translate.resources.modality.modalityType.short(),
          }}
        >
          {modalityTypes.map((item) => (
            <MenuItem key={item.name} value={item?.name || ''}>
              {item.name}
            </MenuItem>
          ))}
        </MyFormSelectField>
      )}
      <MyFormTextField
        name="description"
        control={control}
        MyTextFieldProps={{
          label: translate.resources.contentGroup.description(),
          placeholder: translate.resources.contentGroup.description(),
          fullWidth: true,
          onKeyDown,
          multiline: true,
          rows: 2,
        }}
      />
    </Stack>
  );
};
