import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormGroupUnstyled } from '@/components/Form';
import { selectSessionRadiologyConfig, setSessionConfig } from '@/features/order';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { BaseEntity } from '@/types';
import { IUserDTO } from '@/types/dto';

import { CheckboxAutoFillTemplate } from './CheckboxAutoFillTemplate';
import { CheckboxFilterTemplateByCurrentUser } from './CheckboxFilterTemplateByCurrentUser';
import { SessionModalityField } from './SessionModalityField';
import { SessionOperatorsField } from './SessionOperatorsField';
import { SessionReporterField } from './SessionReporterField';

export type SessionConfigFormField = {
  modalityID?: BaseEntity['id'];
  operators?: IUserDTO[];
  reporterID?: BaseEntity['id'];
  isAutoFillRadiologyContent?: boolean;
  isFilterContentByCurrentUser?: boolean;
};

export const DefaultInfoRadiolgyForm = () => {
  const register = useRegisterAdminFunctions();
  const dispatch = useAppDispatch();
  const sessionRadiologyData = useAppSelector(selectSessionRadiologyConfig);

  const formOptions: UseFormProps<SessionConfigFormField> = {
    criteriaMode: 'all',
    resolver: zodResolver(
      z.object({
        operators: z
          .array(z.object({ id: z.number(), fullname: z.string(), username: z.string() }))
          .optional(),
        reporterID: z
          .union([z.string(), z.number()])
          .optional()
          .transform((val) => {
            if (!val || val === 0) {
              return undefined;
            }
            return val;
          }),
        modalityID: z
          .union([z.string(), z.number()])
          .optional()
          .transform((val) => {
            if (!val || val === 0) {
              return undefined;
            }
            return val;
          }),
        isAutoFillRadiologyContent: z.boolean().optional(),
        isFilterContentByCurrentUser: z.boolean().optional(),
      }),
    ),
    defaultValues: {
      modalityID: sessionRadiologyData.modalityID,
      operators: sessionRadiologyData.operators,
      reporterID: sessionRadiologyData.reporterID,
      isAutoFillRadiologyContent:
        sessionRadiologyData.isAutoFillRadiologyContent ?? false,
      isFilterContentByCurrentUser:
        sessionRadiologyData.isFilterContentByCurrentUser ?? false,
    },
  };

  const handleSubmit = async (formData: SessionConfigFormField) => {
    dispatch(setSessionConfig(formData));
  };

  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register('submitEditForm', () => formInstance.submit && formInstance.submit())
      }
      autoSubmit
      formOptions={formOptions}
      submitOnEnter
      onSubmit={handleSubmit}
      renderInputs={(controls) => (
        <Stack spacing={1}>
          <SessionModalityField {...controls} />
          <SessionReporterField {...controls} />
          <SessionOperatorsField {...controls} />
          <CheckboxAutoFillTemplate {...controls} />
          <CheckboxFilterTemplateByCurrentUser {...controls} />
        </Stack>
      )}
    />
  );
};
