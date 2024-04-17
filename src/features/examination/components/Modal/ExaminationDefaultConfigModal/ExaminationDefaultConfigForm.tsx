import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useGetListUsersQuery } from '@/api/users';
import { MyFormGroupUnstyled } from '@/components/Form';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { useRegisterOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';
import { ICloudUserDTO } from '@/types/dto';

import {
  ExaminationConfigContext,
  ExaminationConfigKey,
  selectDefaultConfigByModalityType,
  updateExaminationDefaultConfig,
} from '../../../stores';

import { ApproverSelectField } from './ApproverSelectField';
import ModalitySelectField from './ModalitySelectField';
import ModalityTypeSelectField from './ModalityTypeSelectField';
import { OperatorAutoCompleteField } from './OperatorAutoCompleteField';
import { ReporterSelectField } from './ReporterSelectField';

export type ExaminationDefaultConfigField = {
  modalityType: ExaminationConfigKey;
} & ExaminationConfigContext;

export const ConnectedExaminationDefaultConfigForm: FC<{
  modalityType: ExaminationDefaultConfigField['modalityType'];
}> = ({ modalityType }) => {
  const defaultConfigData = useAppSelector(
    selectDefaultConfigByModalityType(modalityType),
  );
  const { data, isFetching } = useGetListUsersQuery(
    {
      filter: {},
    },
    { skip: !modalityType },
  );

  let approver: ICloudUserDTO | undefined = undefined;
  let reporter: ICloudUserDTO | undefined = undefined;

  data?.list &&
    data?.list.forEach((item) => {
      if (defaultConfigData?.approverID === item.id) {
        approver = item;
      }
      if (defaultConfigData?.reporterID === item.id) {
        reporter = item;
      }
    });

  return !isFetching ? (
    <ExaminationDefaultConfigForm
      modalityType={modalityType}
      approver={approver}
      reporter={reporter}
      defaultConfigData={defaultConfigData}
    />
  ) : (
    <FullPageSpinner />
  );
};

const ExaminationDefaultConfigForm: FC<{
  modalityType: ExaminationDefaultConfigField['modalityType'];
  approver?: ICloudUserDTO;
  reporter?: ICloudUserDTO;
  defaultConfigData: ExaminationConfigContext | undefined;
}> = ({ modalityType, approver, reporter, defaultConfigData }) => {
  const register = useRegisterOrderListFunctions();
  const translate = useTranslate();
  const dispatch = useAppDispatch();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.order.infomationOrderDefault(),
    }),
  );

  const formOptions: UseFormProps<ExaminationDefaultConfigField> = {
    criteriaMode: 'all',
    resolver: zodResolver(
      z
        .object({
          operators: z
            .array(
              z.object({ id: z.number(), fullname: z.string(), username: z.string() }),
            )
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
          approverID: z
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
          expectedReporter: z
            .object({ id: z.number(), fullname: z.string(), username: z.string() })
            .nullable()
            .optional(),
          approver: z
            .object({ id: z.number(), fullname: z.string(), username: z.string() })
            .nullable()
            .optional(),
        })
        .transform((val) => {
          return {
            ...val,
            reporterID: val?.expectedReporter ? val?.expectedReporter.id : null,
            approverID: val?.approver ? val?.approver.id : null,
          };
        }),
    ),
    defaultValues: {
      operators: defaultConfigData?.operators ?? [],
      reporterID: defaultConfigData?.reporterID ?? undefined,
      modalityID: defaultConfigData?.modalityID ?? undefined,
      expectedReporter: reporter,
      approver: approver,
      approverID: defaultConfigData?.approverID ?? undefined,
    },
  };

  const handleSubmit = async (formData: ExaminationDefaultConfigField) => {
    dispatch(
      updateExaminationDefaultConfig({
        examinationConfigKey: modalityType,
        meta: {
          modalityID: formData.modalityID,
          operators: formData.operators,
          reporterID: formData.reporterID,
          expectedReporter: formData.expectedReporter,
          approverID: formData.approverID,
          approver: formData.approver,
        },
      }),
    );
    notifySuccess();
  };

  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register(
          'submitEditConfigForm',
          () => formInstance.submit && formInstance.submit(),
        )
      }
      formOptions={formOptions}
      submitOnEnter
      onSubmit={handleSubmit}
      renderInputs={({ control }) => (
        <Stack spacing={1}>
          <ModalitySelectField control={control} modalityType={modalityType} />
          <OperatorAutoCompleteField control={control} />
          <ReporterSelectField control={control} />
          <ApproverSelectField control={control} />
        </Stack>
      )}
    />
  );
};
