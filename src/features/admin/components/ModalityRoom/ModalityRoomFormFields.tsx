import { Stack } from '@mui/material';
import React from 'react';

import { MyFormTextField, MyTextField } from '@/components';
import { IFormControlInputProps } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { IModalityRoomDTO, IModalityRoomDTOUpdate } from '@/types/dto';
import { IModalityRoomDTOCreate } from '@/types/dto/modalityRoom';

export type IModalityRoomFormFields = IModalityRoomDTOCreate | IModalityRoomDTOUpdate;

type IModalityRoomFormFieldProps = IFormControlInputProps<IModalityRoomFormFields> & {
  record?: IModalityRoomDTO;
};

export const ModalityRoomFormFields = (props: IModalityRoomFormFieldProps) => {
  const { record, control, onKeyDown } = props;
  const translate = useTranslate();
  return (
    <>
      <Stack spacing={1} alignItems="start" width="500px">
        {record && (
          <MyTextField value={record.id} label={'ID'} size="small" disabled fullWidth />
        )}
        <MyFormTextField
          name="code"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.modalityRoom.code(),
            placeholder: translate.resources.modalityRoom.code(),
            fullWidth: true,
            required: true,
            size: 'small',
            onKeyDown,
          }}
        />
        <MyFormTextField
          name="name"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.modalityRoom.name(),
            placeholder: translate.resources.modalityRoom.name(),
            fullWidth: true,
            required: true,
            size: 'small',
            onKeyDown,
          }}
        />
        <MyFormTextField
          name="description"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.modalityRoom.description(),
            placeholder: translate.resources.modalityRoom.description(),
            fullWidth: true,
            onKeyDown,
            multiline: true,
            rows: 2,
          }}
        />
      </Stack>
    </>
  );
};
