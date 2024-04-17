import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import React, { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useUpdateTimeTableMutation } from '@/api/timeTable';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IUserDTO, USER_TYPE } from '@/types/dto';
import { ITimeTableUpdateDTO, TimeTableDatagrid } from '@/types/dto/timeTable';
import { DATE_FORMAT } from '@/utils/dateUtils';

import { useDateOfWeek } from '../../hook/useDateOfWeek';
import { useRegisterTimetableFunctions } from '../../providers/TimeTableProvider';

import { UpdateTimetableFormFields } from './UpdateTimetableFormFields';

export type UpdateTimetableFieldsType = {
  period: ITimeTableUpdateDTO['period'];
  userType: `${USER_TYPE}`;
  userID: number;
  user?: IUserDTO;
  fromDate: string;
  toDate: string;
};
type UpdateTimetableFormProps = {
  record: TimeTableDatagrid;
  onSuccessCallback: () => void;
};
export const UpdateTimetableForm: FC<UpdateTimetableFormProps> = (props) => {
  const { onSuccessCallback, record } = props;
  const { startOfWeek, endOfWeek } = useDateOfWeek();

  const register = useRegisterTimetableFunctions();
  const translate = useTranslate();
  const [updateTimeTable] = useUpdateTimeTableMutation();
  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.createResource({
      resource: translate.pages.timeTable.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.pages.timeTable.title().toLowerCase(),
    }),
  );

  const formOptions: UseFormProps<UpdateTimetableFieldsType> = {
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(
      z
        .object({
          period: z.record(z.string(), z.array(z.string()).optional()).optional(),
          userType: z.string().optional(),
          userIDs: z.array(z.number()).optional(),
          user: z.object({ id: z.number() }).optional(),
          fromDate: z.string().optional(),
          toDate: z.string().optional(),
        })
        .transform((val) => {
          return {
            ...val,
            userID: val.user ? val.user.id : undefined,
            users: undefined,
          };
        }),
    ),
    defaultValues: {
      userType: USER_TYPE.IMAGING_DOCTOR,
      period: {},
      user: undefined,
      fromDate: dayjs(startOfWeek).format(DATE_FORMAT),
      toDate: dayjs(endOfWeek).format(DATE_FORMAT),
    },
  };
  const handleSubmit = async (formData: UpdateTimetableFieldsType) => {
    try {
      const submitForm: ITimeTableUpdateDTO = {
        period: formData.period,
        userID: formData.userID,
        fromDate: formData.fromDate,
        toDate: formData.toDate,
      };
      const res = await updateTimeTable(submitForm);
      if ('error' in res) {
        notifyError();
      } else {
        notifySuccess();
        onSuccessCallback && onSuccessCallback();
      }
    } catch (e) {
      notifyError();
    }
  };
  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register(
          'submitUpdateTimetable',
          () => formInstance.submit && formInstance.submit(),
        )
      }
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={(controls) => <UpdateTimetableFormFields {...controls} />}
    />
  );
};
