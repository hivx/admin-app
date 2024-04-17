import { Stack } from '@mui/material';
import { FC, useState } from 'react';

import { MyButton } from '@/components/Elements';
import { useTranslate } from '@/hooks';

import { SearchPatientMainButton } from '../ModalSelectPatient/SelectPatientMain';
import { StyledInfoFormFieldsMain } from '../StyledStudyInfo';

import { PatientInfoFormFieldsProps } from './PatientInfoEditFields';
import { PatientInfoFields, PatientInfoInitialValue } from './PatientInfoFields';

/**
 * Use in PatientInfoCreateForm
 */
export const PatientInfoCreateFields: FC<PatientInfoFormFieldsProps> = (props) => {
  const { controls, onSuccessCallback } = props;
  const { control, reset, watch } = controls;
  const translate = useTranslate();
  const [hasPatientInfo, setHasPatientInfo] = useState(false);
  return (
    <StyledInfoFormFieldsMain>
      <PatientInfoFields
        controls={controls}
        onSuccessCallback={onSuccessCallback}
        disabled={hasPatientInfo}
      />
      <Stack direction={'row'} justifyContent={'space-between'}>
        <SearchPatientMainButton
          reset={reset}
          createFormCallBack={() => setHasPatientInfo(true)}
        />
        <MyButton
          variant="outlined"
          onClick={() => {
            setHasPatientInfo(false);
            reset(PatientInfoInitialValue);
          }}
        >
          {translate.buttons.reType()}
        </MyButton>
      </Stack>
    </StyledInfoFormFieldsMain>
  );
};
