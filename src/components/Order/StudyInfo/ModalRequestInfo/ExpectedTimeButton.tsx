/**
 * Nút set thời gian cho các trường Ngày thực hiện, Ngày kết quả theo constrain trong modalityType
 */

import { FC } from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';

import { useGetOneModalityTypeByNameQuery } from '@/api/modalityType';
import { MyButton } from '@/components/Elements';
import { useTranslate } from '@/hooks';
import { IModalityTypeDTO } from '@/types/dto';
import { formatDateTime, itechDateTimeToDayjs } from '@/utils/dateUtils';

import { RequestFormFields } from './RequestFormFields';

/**
 * Set các thời gian Thực hiện, thời gian Duyệt vào form, dự trên delay time của từng loại máy chụp
 */
type ExpectedTimeButtonProps = {
  modalitypeType: IModalityTypeDTO['name'];
  setValue: UseFormSetValue<RequestFormFields>;
  control: Control<RequestFormFields>;
};
export const ExpectedTimeButton: FC<ExpectedTimeButtonProps> = ({
  modalitypeType,
  setValue,
  control,
}) => {
  const translate = useTranslate();
  const formData = useWatch({ control });
  const { data } = useGetOneModalityTypeByNameQuery(
    { name: modalitypeType },
    { skip: !modalitypeType },
  );

  const getDelayTime = () => {
    const delayTimeToOperation = data?.attributes?.delay_time_to_operation;
    const delayTimeToApproval = data?.attributes?.delay_time_to_approval;
    return { delayTimeToOperation, delayTimeToApproval };
  };

  const setTimeWithDelay = () => {
    const { delayTimeToApproval } = getDelayTime();
    const operationTime = formData.operationTime;
    if (delayTimeToApproval && operationTime) {
      const newFinalApproveTime = formatDateTime(
        itechDateTimeToDayjs(operationTime)?.add(parseInt(delayTimeToApproval), 's'),
      );
      setValue('finalApprovedTime', newFinalApproveTime);
    }
  };

  return (
    <MyButton variant="outlined" onClick={setTimeWithDelay}>
      {translate.buttons.expectedTime()}
    </MyButton>
  );
};
