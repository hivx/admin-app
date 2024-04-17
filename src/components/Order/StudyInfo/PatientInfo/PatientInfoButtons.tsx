import { Stack } from '@mui/material';
import React, { FC } from 'react';
import { UseFormReset } from 'react-hook-form';

import { useTranslate } from '@/hooks';
import { useUserPermission } from '@/providers/AuthProvider';
import { useEditOrderFunctions } from '@/providers/Order/EditOrderFunctionsProvider';

import { StyledPrimaryButton } from '../../Bookmark/ConnectedBookmarkModal';
import { SearchPatientMainButton } from '../ModalSelectPatient/SelectPatientMain';

import { PatientInfoFormFieldsType } from './PatientInfoFields';

type PatientInfoButtonsProps = {
  selectPatientCallback?: () => void;
  reset: UseFormReset<PatientInfoFormFieldsType>;
  disabled?: boolean;
};

/**
 * Cụm các nút ở form sửa TT bệnh nhân
 */
export const PatientInfoButtons: FC<PatientInfoButtonsProps> = ({
  reset,
  selectPatientCallback,
  disabled,
}) => {
  const translate = useTranslate();
  const editOrderFunctions = useEditOrderFunctions();
  const userPermission = useUserPermission();

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'}>
        {disabled ? (
          <>
            {/**
             * chỉ hiển thị nút Thay đổi với user có quyền
             */}
            {userPermission?.userCanModifyPatientOrder && (
              <StyledPrimaryButton variant="contained" onClick={selectPatientCallback}>
                {translate.buttons.edit()}
              </StyledPrimaryButton>
            )}
          </>
        ) : (
          <>
            <Stack direction={'row'} spacing={1}>
              <StyledPrimaryButton
                variant="contained"
                onClick={() => editOrderFunctions.editPatientInfo()}
              >
                {translate.buttons.update()}
              </StyledPrimaryButton>
              <SearchPatientMainButton
                reset={reset}
                editFormCallback={(pid) => {
                  editOrderFunctions.changeOrderPatient(pid);
                  selectPatientCallback && selectPatientCallback();
                }}
              />
            </Stack>
          </>
        )}
      </Stack>
    </>
  );
};
