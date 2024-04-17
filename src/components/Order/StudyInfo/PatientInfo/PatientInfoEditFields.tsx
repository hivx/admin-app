import { FC } from 'react';

import { IFormControlInputProps } from '@/components/Form';

import { StyledInfoFormFieldsMain } from '../StyledStudyInfo';

import { PatientInfoButtons } from './PatientInfoButtons';
import { PatientInfoFormFieldsType, PatientInfoFields } from './PatientInfoFields';

export type PatientInfoFormFieldsProps = {
  controls: IFormControlInputProps<PatientInfoFormFieldsType>;
  onSuccessCallback?: () => void;
  disabled?: boolean;
};
/**
 * Use in PatientInfoEditForm
 */
export const PatientInfoEditFields: FC<PatientInfoFormFieldsProps> = (props) => {
  const { controls, disabled, onSuccessCallback } = props;
  const { reset } = controls;

  return (
    <StyledInfoFormFieldsMain>
      <PatientInfoFields
        controls={controls}
        disabled={disabled}
        onSuccessCallback={onSuccessCallback}
      />
      <PatientInfoButtons
        reset={reset}
        selectPatientCallback={onSuccessCallback}
        disabled={disabled}
      />
    </StyledInfoFormFieldsMain>
  );
};
