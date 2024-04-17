import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography, styled } from '@mui/material';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyCheckbox, MyFormTextField } from '@/components';
import { MyFormGroupUnstyled } from '@/components/Form';
import { MyFormDateTimePicker } from '@/components/Form/MyFormDateTimePicker';
import { useTranslate } from '@/hooks';

import { IEventLogDTO } from '../../types';

type EventLogInfomationFormProps = {
  record: IEventLogDTO;
};

/**
 * Các trường hiển thị trong popup Thông tin bản tin
 */
export const EventLogInfomationForm: FC<EventLogInfomationFormProps> = (props) => {
  const { record } = props;
  const translate = useTranslate();

  const formOptions: UseFormProps<IEventLogDTO> = {
    mode: 'onChange',
    criteriaMode: 'all',
    // form validation and pre-processing
    resolver: zodResolver(z.object({})),
    defaultValues: {
      attempts: record.attempts ?? undefined,
      createdTime: record.createdTime ?? undefined,
      type: record.type ?? undefined,
      succeeded: record.succeeded ?? undefined,
      source: record.source ?? undefined,
      id: record.id ?? undefined,
      availableAt: record.availableAt ?? undefined,
      key: record.key ?? undefined,
      errors: record.errors ?? undefined,
      payload: record.payload ?? undefined,
    },
  };

  const handleSubmit = async (formData: IEventLogDTO) => {};

  return (
    <MyFormGroupUnstyled
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={({ control, formState, onKeyDown, watch }) => (
        <Stack alignItems="start" width="800px">
          <StyledFormTwoColumn>
            <Stack spacing={1} width={'100%'}>
              <MyFormTextField
                name="id"
                control={control}
                MyTextFieldProps={{
                  label: translate.resources.eventLog.id(),
                  placeholder: translate.resources.eventLog.id(),
                  fullWidth: true,
                  onKeyDown,
                  disabled: true,
                }}
              />
              <MyFormTextField
                name="type"
                control={control}
                MyTextFieldProps={{
                  label: translate.resources.eventLog.type(),
                  placeholder: translate.resources.eventLog.type(),
                  fullWidth: true,
                  onKeyDown,
                  disabled: true,
                }}
              />
              <MyFormTextField
                name="source"
                control={control}
                MyTextFieldProps={{
                  label: translate.resources.eventLog.source(),
                  placeholder: translate.resources.eventLog.source(),
                  fullWidth: true,
                  onKeyDown,
                  disabled: true,
                }}
              />
              <MyFormDateTimePicker
                name="createdTime"
                watch={watch}
                control={control}
                disabled
                type="dateTime"
                TextFieldProps={{
                  label: translate.resources.eventLog.createdTime(),
                  placeholder: translate.resources.eventLog.createdTime(),
                  fullWidth: true,
                  onKeyDown,
                  disabled: true,
                }}
              />
              <MyFormDateTimePicker
                name="availableAt"
                watch={watch}
                control={control}
                disabled
                type="dateTime"
                TextFieldProps={{
                  label: translate.resources.eventLog.availableAt(),
                  placeholder: translate.resources.eventLog.availableAt(),
                  fullWidth: true,
                  onKeyDown,
                  disabled: true,
                }}
              />
              <MyFormTextField
                name="attempts"
                control={control}
                MyTextFieldProps={{
                  label: translate.resources.eventLog.attempts(),
                  placeholder: translate.resources.eventLog.attempts(),
                  fullWidth: true,
                  onKeyDown,
                  disabled: true,
                }}
              />
              <Stack flexDirection={'row'}>
                <Stack display="flex" flexDirection={'row'} alignItems="center">
                  <MyCheckbox checked={!!record.succeeded} disabled />
                  <Typography>{translate.messages.notification.success()}</Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack spacing={3} width={'100%'}>
              <MyFormTextField
                name="key"
                control={control}
                MyTextFieldProps={{
                  label: translate.resources.eventLog.key(),
                  placeholder: translate.resources.eventLog.key(),
                  fullWidth: true,
                  onKeyDown,
                  disabled: true,
                }}
              />
              <MyFormTextField
                name="errors"
                control={control}
                MyTextFieldProps={{
                  label: translate.resources.eventLog.errors(),
                  placeholder: translate.resources.eventLog.errors(),
                  fullWidth: true,
                  onKeyDown,
                  disabled: true,
                  multiline: true,
                  rows: 3,
                }}
              />
              <StyledPayloadFieldWrapper>
                <MyFormTextField
                  name="payload"
                  control={control}
                  MyTextFieldProps={{
                    label: translate.resources.eventLog.payload(),
                    placeholder: translate.resources.eventLog.payload(),
                    fullWidth: true,
                    onKeyDown,
                    disabled: true,
                    multiline: true,
                    rows: 4,
                  }}
                />
              </StyledPayloadFieldWrapper>
            </Stack>
          </StyledFormTwoColumn>
        </Stack>
      )}
    />
  );
};

const StyledPayloadFieldWrapper = styled('div')`
  .MuiFormControl-root .MuiInputBase-root {
    padding: ${(props) => props.theme.spacing(1)} 0;
    background-color: ${(props) =>
      props.theme.pacs?.customColors.fieldDisabledBackground};
  }
`;
const StyledFormTwoColumn = styled('div')`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing(2)};
`;
