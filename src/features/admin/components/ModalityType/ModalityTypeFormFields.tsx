import { Box, Checkbox, Grid, MenuItem, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { useGetListModalityTypeNameQuery } from '@/api/modalityTypeName';
import { MyCheckbox, MyFormTextField, MyTextField } from '@/components';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { IFormControlInputProps } from '@/components/Form';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { useTranslate } from '@/hooks';
import {
  IModalityTypeDTO,
  IModalityTypeNameDTO,
  IModalityTypeUpdateDTO,
} from '@/types/dto';

import { useModalityTypeFormAttributesField } from '../../hooks/useModalityTypeFormAttributesField';

import { PreferredModalitySelectField } from './PreferredModalitySelectField';
import { PreferredProcedureSelectField } from './PreferredProcedureSelectField';

export type IModalityTypeFormFields = Partial<IModalityTypeUpdateDTO> & {
  haveOperators?: boolean;
  haveTranscribers?: boolean;
  scheduleOrders?: boolean;
  otherNamesObjectList?: { id: string }[];
  preferredModalityID?: number;
  preferredProcedureID?: number;
  requireConsumable?: boolean;
};

type ModalityTypeFormFieldsProps = IFormControlInputProps<IModalityTypeFormFields> & {
  record?: IModalityTypeDTO;
};
export const ModalityTypeFormFields: FC<ModalityTypeFormFieldsProps> = (props) => {
  const { record, control, onKeyDown, formState, watch } = props;

  const { data: modalityTypeNames } = useGetListModalityTypeNameQuery({ filter: {} });
  const { displayTechnicianField, displayTranscriberField } =
    useModalityTypeFormAttributesField();
  const watchModalityType = watch('name');

  const translate = useTranslate();
  return (
    <Stack spacing={1} alignItems="start" width="500px">
      {record && (
        <MyTextField value={record.id} size="small" label={'ID'} disabled fullWidth />
      )}
      <MyFormSelectField
        name="name"
        control={control}
        required
        MySelectProps={{
          label: translate.resources.modalityType.name(),
          placeholder: translate.resources.modalityType.name(),
          fullWidth: true,
        }}
      >
        {modalityTypeNames?.list &&
          modalityTypeNames?.list.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.id}
            </MenuItem>
          ))}
      </MyFormSelectField>
      <Stack width="500px">
        <MyFormAutoComplete
          name="otherNamesObjectList"
          control={control}
          placeholder={translate.resources.modalityType.otherNames()}
          MyAutoCompleteProps={{
            options: modalityTypeNames?.list ?? [],
            isOptionEqualToValue: (option, value) => option.id === value.id,
            getOptionLabel: (option) => `${(option as IModalityTypeNameDTO)?.id}`,
            renderOption: (props, option, { selected }) => {
              return (
                <li {...props}>
                  <Checkbox size="small" checked={selected} />
                  {option?.id}
                </li>
              );
            },
          }}
        />
      </Stack>

      {/**
       * list select preferre modalities ,filtered by 'modalityType'
       */}
      <PreferredModalitySelectField
        control={control}
        modalityType={watchModalityType ?? undefined}
        name="preferredModalityID"
      />
      {/**
       * list select preferre procedure ,filtered by 'modalityType'
       */}
      <PreferredProcedureSelectField
        control={control}
        name="preferredProcedureID"
        modalityType={watchModalityType ?? undefined}
      />

      <MyFormTextField
        name="config"
        control={control}
        MyTextFieldProps={{
          label: translate.resources.certificate.config(),
          placeholder: translate.resources.certificate.config(),
          fullWidth: true,
          size: 'small',
          multiline: true,
          minRows: 4,
        }}
      />
      <Grid container>
        <Grid xs={7} item>
          {/* <Box display="flex" alignItems="center">
            <Controller
              name="scheduleOrders"
              control={control}
              render={({ field: { value, onChange } }) =>
                record ? (
                  <MyCheckbox checked={!!value} onChange={onChange} />
                ) : (
                  <MyCheckbox checked />
                )
              }
            />
            <Typography>{translate.resources.modalityType.scheduleOrder()}</Typography>
          </Box> */}
          <Box display="flex" alignItems="center">
            <Controller
              name="requireDicom"
              control={control}
              render={({ field: { value, onChange } }) => (
                <MyCheckbox checked={!!value} onChange={onChange} />
              )}
            />

            <Typography>{translate.resources.modalityType.requireDicom()}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Controller
              name="requireConsumable"
              control={control}
              render={({ field: { value, onChange } }) => (
                <MyCheckbox checked={!!value} onChange={onChange} />
              )}
            />

            <Typography>
              {translate.resources.modalityType.requireConsumable()}
            </Typography>
          </Box>
        </Grid>
        <Grid xs={5} item>
          {displayTechnicianField && (
            <Box display="flex" alignItems="center">
              <Controller
                name="haveOperators"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <MyCheckbox checked={!!value} onChange={onChange} />
                )}
              />

              <Typography>{translate.resources.modalityType.haveOperators()}</Typography>
            </Box>
          )}
          {displayTranscriberField && (
            <Box display="flex" alignItems="center">
              <Controller
                name="haveTranscribers"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <MyCheckbox checked={!!value} onChange={onChange} />
                )}
              />
              <Typography>
                {translate.resources.modalityType.haveTranscribers()}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};
