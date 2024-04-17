import { Stack } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { Control, useWatch } from 'react-hook-form';

import { useLazyGetOneModalityTypeByNameQuery } from '@/api/modalityType';
import { MyButton } from '@/components/Elements';
import { useTranslate } from '@/hooks';
import { useWarningInsuranceConflict } from '@/hooks/radiology/useWarningInsuranceConflict';
import { getBooleanValueOfAttribute } from '@/lib/dataHelper/modalityTypeAttributesHelper';
import { isValidTimeInForm } from '@/lib/dataHelper/radiologyReport/isValidTimeInForm';
import { useNotifySnackbar } from '@/providers/NotificationProvider';
import { BaseEntity } from '@/types';
import { MODALITY_TYPE_ATTRIBUTE_DEFAULT } from '@/types/dto/modalityTypeAttribute';

import { RequestFormFields } from './RequestFormFields';

type RequestFormFieldButton = {
  onSubmit: () => void;
  onDelete: () => void;
  hideActionButton?: boolean;
  ExpectedTimeButton: ReactNode;
  orderID?: BaseEntity['id'];
  requestID?: BaseEntity['id'];
  control: Control<RequestFormFields>;
  modalityType: string | null;
};
export const RequestFormFieldButton: FC<RequestFormFieldButton> = ({
  onSubmit,
  onDelete,
  hideActionButton,
  ExpectedTimeButton,
  orderID,
  requestID,
  control,
  modalityType,
}) => {
  const translate = useTranslate();
  const requestFormData = useWatch({ control });

  const notify = useNotifySnackbar();
  const [triggerGetOneModalityTypeByName] = useLazyGetOneModalityTypeByNameQuery();

  const { getConflict } = useWarningInsuranceConflict({
    orderID,
    requestID,
    reportSubmission: {
      approvedTime: requestFormData.finalApprovedTime,
      operationTime: requestFormData.operationTime,
      approvedModalityID: requestFormData.modalityID,
      operatorIDs: requestFormData.operators?.map((item) => item.id ?? 0),
      comments: '',
      findings: '',
      imageFileIDs: null,
      images: null,
      impression: '',
      description: '',
    },
    approverID: requestFormData.finalApprover?.id,
  });

  const onSubmitRequestForm = async () => {
    /**
     * Yêu cầu có KTV theo config loại máy
     */
    if (modalityType) {
      const operators = requestFormData.operators;
      const modalityTypeData = await triggerGetOneModalityTypeByName(
        {
          name: modalityType,
        },
        true,
      ).unwrap();
      // Có KTV mới thực hiện bước tiếp theo
      if (
        !operators ||
        (operators.length === 0 &&
          modalityTypeData.attributes &&
          getBooleanValueOfAttribute(
            modalityTypeData.attributes,
            MODALITY_TYPE_ATTRIBUTE_DEFAULT.REQUIRES_TECHNICIAN,
          ))
      ) {
        notify({
          message: 'Kiểm tra lại KTV',
          options: { variant: 'warning' },
        });
        return;
      }
    }

    if (requestID) {
      if (
        !isValidTimeInForm({
          approvedTime: requestFormData.finalApprovedTime,
          operationTime: requestFormData.operationTime,
          requestedTime: requestFormData?.requestedTime ?? undefined,
        })
      ) {
        notify({
          message: 'Kiểm tra lại các mốc thời gian',
          options: { variant: 'warning' },
        });
        return;
      } else {
        getConflict({ approveCallback: onSubmit });
      }
    } else {
      onSubmit();
    }
  };

  return !hideActionButton ? (
    <Stack direction="row" justifyContent="space-between" padding={1}>
      <Stack direction="row" spacing={1}>
        <MyButton variant="outlined" onClick={onSubmitRequestForm}>
          {translate.buttons.save()}
        </MyButton>
        {ExpectedTimeButton}
      </Stack>

      <MyButton variant="outlined" onClick={onDelete}>
        {translate.buttons.deleteRequest()}
      </MyButton>
    </Stack>
  ) : (
    <></>
  );
};
