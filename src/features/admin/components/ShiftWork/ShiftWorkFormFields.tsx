import { Box, Stack, Typography } from '@mui/material';

import {
  MyCheckbox,
  MyFormCheckboxField,
  MyFormTextField,
  MyTextField,
} from '@/components';
import { IFormControlInputProps } from '@/components/Form';
import { MyFormDateTimePicker } from '@/components/Form/MyFormDateTimePicker';
import { useTranslate } from '@/hooks';
import {
  ITimeTablePeriodDTO,
  ITimeTablePeriodDTOUpdate,
} from '@/types/dto/timeTablePeriod';

export type ShiftWorkFormFieldsProps =
  IFormControlInputProps<ITimeTablePeriodDTOUpdate> & {
    record?: ITimeTablePeriodDTO;
  };

export const ShiftWorkFormFields = (props: ShiftWorkFormFieldsProps) => {
  const { control, record, watch, onKeyDown } = props;
  const translate = useTranslate();
  return (
    <Stack spacing={1} alignItems="start" width="100%">
      <MyTextField value={record?.id} label={'ID'} size="small" disabled fullWidth />
      <MyFormTextField
        name="name"
        control={control}
        MyTextFieldProps={{
          label: translate.resources.shiftWork.title(),
          placeholder: translate.resources.shiftWork.title(),
          fullWidth: true,
          size: 'small',
          onKeyDown,
        }}
      />
      <MyFormDateTimePicker
        name="fromTime"
        type="time"
        TextFieldProps={{ required: true }}
        watch={watch}
        control={control}
        label={translate.resources.shiftWork.startTime()}
      />
      <MyFormDateTimePicker
        name="toTime"
        type="time"
        TextFieldProps={{ required: true }}
        watch={watch}
        control={control}
        label={translate.resources.shiftWork.endTime()}
      />
      <MyFormTextField
        name="index"
        control={control}
        MyTextFieldProps={{
          label: translate.resources.shiftWork.index(),
          placeholder: translate.resources.shiftWork.index(),
          fullWidth: true,
          size: 'small',
          onKeyDown,
          type: 'number',
        }}
      />
      <Stack width="100%" direction="row" justifyContent="space-between" paddingRight={3}>
        <MyFormCheckboxField
          control={control}
          render={({ value, onChange }) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <MyCheckbox checked={!!value} onChange={onChange} />
              <Typography>{translate.resources.shiftWork.consecutive()}</Typography>
            </Box>
          )}
          name="consecutive"
        />
        <MyFormCheckboxField
          control={control}
          render={({ value, onChange }) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <MyCheckbox checked={!!value} onChange={onChange} />
              <Typography>{translate.resources.shiftWork.activity()}</Typography>
            </Box>
          )}
          name="enabled"
        />
      </Stack>
    </Stack>
  );
};
