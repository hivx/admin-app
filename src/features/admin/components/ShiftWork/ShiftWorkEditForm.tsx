import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useUpdateTimetablePeriodMutation } from '@/api/timetablePeriod';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import {
  ITimeTablePeriodDTO,
  ITimeTablePeriodDTOUpdate,
} from '@/types/dto/timeTablePeriod';

import { ShiftWorkFormFields } from './ShiftWorkFormFields';

export type ShiftWorkEditFormProps = {
  onSuccessCallback: () => void;
  record: ITimeTablePeriodDTO;
};
export const ShiftWorkEditForm = (props: ShiftWorkEditFormProps) => {
  const { onSuccessCallback, record } = props;
  const register = useRegisterAdminFunctions();
  const translate = useTranslate();

  const [editTimeTable] = useUpdateTimetablePeriodMutation();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.shiftWork.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.shiftWork.title().toLowerCase(),
    }),
  );

  const formOptions: UseFormProps<ITimeTablePeriodDTOUpdate> = {
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        fromTime: z
          .string()
          .transform((val) => val.slice(-6))
          .optional(),
        toTime: z
          .string()
          .transform((val) => val.slice(-6))
          .optional(),
        consecutive: z.boolean().optional(),
        enabled: z.boolean().optional(),
        index: z.preprocess((val) => Number(val), z.number()).optional(),
      }),
    ),
    defaultValues: {
      id: record.id,
      name: record.name ?? undefined,
      fromTime: record.fromTime ? '00000000' + record.fromTime : undefined,
      toTime: record.toTime ? '00000000' + record.toTime : undefined,
      index: record.index ?? undefined,
      consecutive: record.consecutive ?? false,
      enabled: record.enabled ?? false,
    },
  };
  const handleSubmit = async (formData: ITimeTablePeriodDTOUpdate) => {
    try {
      const res = await editTimeTable({ ...formData });
      if ('error' in res) {
        notifyError();
      } else {
        notifySuccess();
        onSuccessCallback();
      }
    } catch (e) {
      notifyError();
    }
  };
  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register('submitEditForm', () => formInstance.submit && formInstance.submit())
      }
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={(controls) => <ShiftWorkFormFields record={record} {...controls} />}
    />
  );
};
