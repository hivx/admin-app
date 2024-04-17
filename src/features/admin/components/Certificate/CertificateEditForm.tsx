import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { ICertificateDTO } from '@/types/dto';
import { checkUpdateField } from '@/utils/checkUpdateFields';
import { isJsonObject } from '@/utils/validateJSON';

import { useUpdateCertificateMutation } from '../../api/certificate';

import { CertificateFormFields, ICertificateFormFields } from './CertificateFormFields';

type CertificateEditFormProps = {
  onSuccessCallback: () => void;
  certificateList: ICertificateDTO[];
  record: ICertificateDTO;
};

export type CertificateEditFormSubmit = Omit<ICertificateFormFields, 'maskedSecret'> & {
  secret: string;
};
export const CertificateEditForm: FC<CertificateEditFormProps> = (props) => {
  const { onSuccessCallback, record, certificateList } = props;
  const translate = useTranslate();
  const [updateCertificate] = useUpdateCertificateMutation();
  const register = useRegisterAdminFunctions();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.certificate.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.certificate.title().toLowerCase(),
    }),
  );
  const handleSubmit = async (formData: ICertificateFormFields) => {
    const { maskedSecret, ...rest } = formData;

    const lastDataSubmit: CertificateEditFormSubmit = {
      secret: maskedSecret || '',
      ...rest,
    };
    try {
      const res = await updateCertificate({
        ...lastDataSubmit,
        id: record?.id,
      });
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

  const formOptions: UseFormProps<ICertificateFormFields> = {
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(
      z.object({
        account: z
          .string()
          .trim()
          .min(
            1,
            translate.messages.validation.genericRequired({
              resource: translate.resources.certificate.account(),
            }),
          )
          .refine(
            (value) => {
              if (value === record.account) return true;
              // check if there is any department code exist in the list
              if (
                certificateList &&
                certificateList.some((item) => item.account === value)
              ) {
                return false;
              }
              return true;
            },
            {
              message: translate.messages.validation.genericDuplicated({
                name: translate.resources.certificate.account(),
              }),
            },
          ),
        name: z
          .string()
          .trim()
          .min(
            1,
            translate.messages.validation.genericRequired({
              resource: translate.resources.certificate.name(),
            }),
          ),
        provider: z.string().optional(),
        maskedSecret: z.string().optional(),
        config: z
          .string()
          .refine(
            (value) => {
              if (value.length) return isJsonObject(value);
              return true;
            },
            translate.messages.validation.genericRequiredType({
              resource: translate.resources.certificate.config(),
              type: 'jsonObject',
            }),
          )
          .optional(),
      }),
    ),
    defaultValues: {
      account: record.account ?? '',
      name: record.name ?? '',
      provider: record.provider ?? '',
      maskedSecret: record.maskedSecret ?? '',
      config: record.config ?? '',
    },
  };
  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register('submitEditForm', () => formInstance.submit && formInstance.submit())
      }
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={(controls) => <CertificateFormFields record={record} {...controls} />}
    />
  );
};
