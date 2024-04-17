import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useGetOneOrderQuery } from '@/api/order';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useCurrentOrderID, useRegisterRadiologyFunctions } from '@/features/order';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { useDetectMobile } from '@/hooks/useDetectMobile';
import {
  selectCurrentRequestID,
  setRadiologyReportSubmissionData,
} from '@/stores/OrderRadiology';
import {
  DATETIME_FORMAT,
  formatDateTime,
  getCurrentDateTime,
  getFullTimeFromDateAndHour,
  DISPLAY_FORMAT,
} from '@/utils/dateUtils';

import {
  DesktopApproveTimeFormField,
  IApproveWithTimeFormFields,
} from './DesktopApproveTimeFormField';
import { MobileApproveTimeFormFields } from './MobileApproveTimeFormFields';

type ApproveWithTimeFormProps = {
  onSuccessCallback: () => void;
};

export const ApproveWithTimeForm = (props: ApproveWithTimeFormProps) => {
  const { onSuccessCallback } = props;
  const dispatch = useAppDispatch();
  const register = useRegisterRadiologyFunctions();
  const translate = useTranslate();
  const orderID = useCurrentOrderID();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));
  const { data: order } = useGetOneOrderQuery({ id: orderID });
  const isMobileSize = useDetectMobile();

  const formOptions: UseFormProps<IApproveWithTimeFormFields> = {
    criteriaMode: 'all',
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(
      z
        .object({
          approvedDate: z
            .string()
            .refine((value) => !!value && value !== 'Invalid Date', {
              message: translate.common.invalidDate(),
            }),
          approvedHour: z
            .string()
            .refine((value) => !!value && value !== 'Invalid Date', {
              message: translate.common.invalidDate(),
            }),
        })
        .refine(
          (value) => {
            const { approvedDate, approvedHour } = value;
            const approvedTime = getFullTimeFromDateAndHour(approvedDate, approvedHour);
            if (
              dayjs(approvedTime, DATETIME_FORMAT).isBefore(
                dayjs(order?.requestedTime, DATETIME_FORMAT),
              )
            ) {
              // case approvedTime < requestedTime => false
              return false;
            }
            return true;
          },
          {
            message: translate.messages.validation.approvedTimeLessThanRequire({
              time: dayjs(order?.requestedTime, DATETIME_FORMAT).format(
                DISPLAY_FORMAT.dateTime,
              ),
            }),
            path: ['approvedDate'], // path of error
          },
        ),
    ),
    defaultValues: {
      approvedDate: formatDateTime(getCurrentDateTime()),
      approvedHour: formatDateTime(getCurrentDateTime()),
    },
  };

  /**
   * update value of approvedTime in store
   */
  const handleSubmit = async (formData: IApproveWithTimeFormFields) => {
    const { approvedDate, approvedHour } = formData;
    const approvedTime = getFullTimeFromDateAndHour(approvedDate, approvedHour);
    dispatch(setRadiologyReportSubmissionData({ orderID, requestID, approvedTime }));
    onSuccessCallback();
  };

  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register(
          'submitFormApproveWithTime',
          () => formInstance.submit && formInstance.submit(),
        )
      }
      formOptions={formOptions}
      submitOnEnter
      onSubmit={handleSubmit}
      renderInputs={(controls) =>
        isMobileSize ? (
          <MobileApproveTimeFormFields {...controls} />
        ) : (
          <DesktopApproveTimeFormField {...controls} />
        )
      }
    />
  );
};
