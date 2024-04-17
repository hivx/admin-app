import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { ICertificateDTO, ICertificateDTOCreate } from '@/types/dto';
import { isJsonObject } from '@/utils/validateJSON';

import { useCreateCertificateMutation } from '../../api/certificate';

import { CertificateFormFields, ICertificateFormFields } from './CertificateFormFields';

type CertificateCreateFormProps = {
  onSuccessCallback: () => void;
  certificateList: ICertificateDTO[];
};

export const CertificateCreateForm: FC<CertificateCreateFormProps> = (props) => {
  const { onSuccessCallback, certificateList } = props;
  const translate = useTranslate();
  const [createCertificate] = useCreateCertificateMutation();
  const register = useRegisterAdminFunctions();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.createResource({
      resource: translate.resources.certificate.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.resources.certificate.title().toLowerCase(),
    }),
  );
  const handleSubmit = async (formData: ICertificateFormFields) => {
    try {
      // final validation
      if (formData.account && formData.name) {
        const submitForm: ICertificateDTOCreate = {
          account: formData.account,
          name: formData.name,
          provider: formData.provider,
          secret: formData.maskedSecret ?? '',
          config: formData.config,
        };
        const res = await createCertificate(submitForm);
        if ('error' in res) {
          notifyError();
        } else {
          notifySuccess();
          onSuccessCallback();
        }
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
      account: '',
      name: '',
      provider: '',
      maskedSecret: '',
      config: '',
    },
  };
  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register('submitCreateForm', () => formInstance.submit && formInstance.submit())
      }
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={(controls) => <CertificateFormFields {...controls} />}
    />
  );
};
