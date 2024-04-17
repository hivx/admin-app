import { debounce } from 'lodash';
import React, { FC, useCallback, useEffect } from 'react';
import { Control, FieldPath, UseFormReset, UseFormWatch } from 'react-hook-form';

import { MyFormTextField } from '@/components/Elements';
import { getPatientInfomation } from '@/dataHelper/studyInfo/getPatientInfomation';
import { useLazyGetListPatientsQuery } from '@/features/order';
import { useTranslate } from '@/hooks';
import { useNotifySnackbar } from '@/providers/NotificationProvider';
import { useCreateOrderContext } from '@/providers/Order/CreateOrderFunctionsProvider';
import { IPatientDTO } from '@/types/dto';

import { patientInfoCreateDefaultValue } from './PatientInfoCreateForm';

type PatientIdFieldProps = {
  name: FieldPath<IPatientDTO>;
  control: Control<IPatientDTO>;
  watch: UseFormWatch<IPatientDTO>;
  reset: UseFormReset<IPatientDTO>;
  onSuccessCallback?: () => void;
  disabled?: boolean;
  setHasPatientInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Dùng trong form tạo mới chỉ định
 */

const PatientIdFieldCreate: FC<PatientIdFieldProps> = (props) => {
  const { control, disabled, name, watch, reset, setHasPatientInfo } = props;
  const { setCurrentPatient } = useCreateOrderContext();
  const translate = useTranslate();
  const watchPid = watch('pid');
  const [triggerPatient] = useLazyGetListPatientsQuery();

  const notifySnackbar = useNotifySnackbar();

  /**
   * set trống các trường trong PatientInfoFormFields,
   */
  const onChangeFieldToDefaultValue = useCallback(
    (pid?: string) => {
      reset({
        ...patientInfoCreateDefaultValue,
        pid,
      });

      setHasPatientInfo(false);
    },
    [reset, setHasPatientInfo],
  );

  /**
   * Func xử lý khi PID thay đổi,
   */
  const onChangePid = useCallback(
    debounce(async (pid: string | null) => {
      if (!pid) {
        onChangeFieldToDefaultValue();
        return;
      }
      const patient = await getPatientInfomation({
        triggerGetListPatient: triggerPatient,
        pid,
      });

      if (patient) {
        reset(patient);
        setHasPatientInfo(true);
        setCurrentPatient && setCurrentPatient(patient);
      } else {
        onChangeFieldToDefaultValue(pid);
        notifySnackbar({
          message: translate.messages.notification.notFoundPatient({ pid }),
        });
        setCurrentPatient && setCurrentPatient(undefined);
      }
    }, 1000),
    [],
  );

  useEffect(() => {
    onChangePid(watchPid);
  }, [onChangePid, watchPid]);

  return (
    <MyFormTextField
      name={name}
      control={control}
      MyTextFieldProps={{
        label: translate.resources.patient.id(),
        placeholder: translate.resources.patient.id(),
        fullWidth: true,
        size: 'small',
        disabled: disabled,
        required: true,
      }}
    />
  );
};

export default PatientIdFieldCreate;
