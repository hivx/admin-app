import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Stack, Typography } from '@mui/material';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyCheckbox, MyFormCheckboxField, MyFormTextField } from '@/components/Elements';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { TABLE_PICK_PATIENT } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { IPatientDTO, ORDER_CREATION_TYPE } from '@/types/dto';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';

export type PatientFormFilterType = Pick<
  IPatientDTO,
  'pid' | 'fullname' | 'creationType'
> & {
  /**
   * bệnh nhân từ HIS :trung gian để xử lý giá trị của creationType khi submit
   */
  isHisType: boolean;
};
export const PatientFormFilter = () => {
  const dispatch = useAppDispatch();
  const translate = useTranslate();
  const query = useAppSelector(
    getCurrentTableQuery<PatientFormFilterType>(TABLE_PICK_PATIENT),
  );
  const formOptions: UseFormProps<PatientFormFilterType> = {
    mode: 'onChange',
    criteriaMode: 'all',
    // form validation and pre-processing
    resolver: zodResolver(
      z
        .object({
          pid: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
          fullname: z
            .string()
            .trim()
            .optional()
            .transform(mapNullOrEmptyStringToUndefined),
          creationType: z.string().optional(),
          isHisType: z.boolean(),
        })
        .transform((val) => {
          return {
            ...val,
            creationType: val.isHisType ? ORDER_CREATION_TYPE.HIS : undefined,
            isHisType: undefined,
          };
        }),
    ),
    defaultValues: {
      pid: query?.filter.pid ?? '',
      fullname: query?.filter.fullname ?? '',
      creationType: query?.filter.creationType ?? undefined,
      isHisType: query?.filter.creationType === ORDER_CREATION_TYPE.HIS ? true : false,
    },
  };
  const handleSubmit = (formData: PatientFormFilterType) => {
    dispatch(setTableFilter({ tableId: TABLE_PICK_PATIENT, filter: formData }));
  };
  return (
    <MyFormGroupUnstyled
      onSubmit={handleSubmit}
      autoSubmit
      formOptions={formOptions}
      renderInputs={({ control, formState, onKeyDown }) => (
        <Stack spacing={1}>
          <Stack direction={'row'} spacing={2} width={'100%'}>
            <MyFormTextField
              name="pid"
              control={control}
              MyTextFieldProps={{
                label: translate.resources.order.patient.pid.long(),
                placeholder: translate.resources.order.patient.pid.long(),
                fullWidth: true,
                onKeyDown,
              }}
            />
            <MyFormTextField
              name="fullname"
              control={control}
              MyTextFieldProps={{
                label: translate.resources.order.patient.fullname.long(),
                placeholder: translate.resources.order.patient.fullname.long(),
                fullWidth: true,
                onKeyDown,
              }}
            />
          </Stack>
          <MyFormCheckboxField
            control={control}
            render={({ value, onChange }) => (
              <Stack width={'100%'}>
                <Box display="flex" alignItems="center">
                  <MyCheckbox checked={!!value} onChange={onChange} />
                  <Typography>{translate.buttons.selectFromHIS()}</Typography>
                </Box>
              </Stack>
            )}
            name="isHisType"
          />
        </Stack>
      )}
    />
  );
};
