import { Stack } from '@mui/material';
import React, { FC } from 'react';

import { MyFormTextField } from '@/components/Elements';
import { MyFormDateTimePicker } from '@/components/Form/MyFormDateTimePicker';
import { useTranslate } from '@/hooks';
import { IPatientDTO, IPatientDTOUpdate } from '@/types/dto';

import {
  StyledInfoFieldTwoColumn,
  StyledInfoFieldTwoOfChildrenColumn,
} from '../StyledStudyInfo';

import { PatientInfoFormFieldsProps } from './PatientInfoEditFields';
import { StudyInfoGenderCheckbox } from './StudyInfoGenderCheckbox';

export type PatientInfoFormFieldsType = Omit<
  IPatientDTO,
  'hospitalID' | 'portalCode' | 'id'
> & {
  id?: IPatientDTOUpdate['id'];
};

/**
 * Empty value for patient info form
 */
export const PatientInfoInitialValue: PatientInfoFormFieldsType = {
  fullname: '',
  pid: '',
  birthDate: '',
  gender: null,
  phone: '',
  email: '',
  address: '',
  creationType: null,
};

/**
 * Some fields common for PatientInfoEditFields and PatientInfoCreateFields
 */
export const PatientInfoFields: FC<PatientInfoFormFieldsProps> = (props) => {
  const { controls, disabled } = props;
  const { control, watch } = controls;
  const translate = useTranslate();
  return (
    <Stack gap={1}>
      <StyledInfoFieldTwoColumn>
        <StyledInfoFieldTwoOfChildrenColumn>
          <MyFormTextField
            name="pid"
            control={control}
            MyTextFieldProps={{
              label: translate.resources.patient.id(),
              placeholder: translate.resources.patient.id(),
              fullWidth: true,
              size: 'extrasmall',
              disabled: disabled,
              required: true,
            }}
          />
          <MyFormTextField
            name="fullname"
            control={control}
            MyTextFieldProps={{
              label: translate.resources.patient.fullName(),
              placeholder: translate.resources.patient.fullName(),
              fullWidth: true,
              size: 'extrasmall',
              disabled: disabled,
              required: true,
            }}
          />
        </StyledInfoFieldTwoOfChildrenColumn>

        <StyledInfoFieldTwoOfChildrenColumn>
          <MyFormDateTimePicker
            name="birthDate"
            type="date"
            disabled={disabled}
            watch={watch}
            control={control}
            label={translate.resources.patient.birthDate()}
            customSize="extrasmall"
          />
          <StudyInfoGenderCheckbox
            control={control}
            name="gender"
            disabled={disabled}
            watch={watch}
          />
        </StyledInfoFieldTwoOfChildrenColumn>
      </StyledInfoFieldTwoColumn>

      <StyledInfoFieldTwoColumn>
        <StyledInfoFieldTwoOfChildrenColumn>
          <MyFormTextField
            name="phone"
            control={control}
            MyTextFieldProps={{
              label: translate.resources.patient.phone(),
              placeholder: translate.resources.patient.phone(),
              fullWidth: true,
              size: 'extrasmall',
              disabled: disabled,
            }}
          />
          <MyFormTextField
            name="email"
            control={control}
            MyTextFieldProps={{
              label: translate.resources.patient.email(),
              placeholder: translate.resources.patient.email(),
              fullWidth: true,
              size: 'extrasmall',
              disabled: disabled,
            }}
          />
        </StyledInfoFieldTwoOfChildrenColumn>
        <MyFormTextField
          name="address"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.patient.address(),
            placeholder: translate.resources.patient.address(),
            fullWidth: true,
            size: 'extrasmall',
            disabled: disabled,
          }}
        />
      </StyledInfoFieldTwoColumn>
    </Stack>
  );
};
