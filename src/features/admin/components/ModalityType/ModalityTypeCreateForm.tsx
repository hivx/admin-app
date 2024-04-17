import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useCreateModalityTypeMutation } from '@/api/modalityType';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IModalityTypeCreateDTO, IModalityTypeUpdateDTO } from '@/types/dto';
import { isJsonObject } from '@/utils/validateJSON';

import { useModalityTypeForm } from '../../hooks/useModalityTypeForm';

import {
  IModalityTypeFormFields,
  ModalityTypeFormFields,
} from './ModalityTypeFormFields';

type ModalityTypeCreateFormProps = {
  onSuccessCallback: () => void;
};

export const ModalityTypeCreateForm: FC<ModalityTypeCreateFormProps> = (props) => {
  const { onSuccessCallback } = props;
  const [createModalityType] = useCreateModalityTypeMutation();

  const { modalityTypes } = useModalityTypeForm({});

  const translate = useTranslate();
  const register = useRegisterAdminFunctions();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.createResource({
      resource: translate.resources.modalityType.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.resources.modalityType.title().toLowerCase(),
    }),
  );

  const formOptions: UseFormProps<IModalityTypeFormFields> = {
    mode: 'onChange',
    criteriaMode: 'all',
    // form validation and pre-processing
    resolver: zodResolver(
      z
        .object({
          name: z
            .string()
            .trim()
            .min(
              1,
              translate.messages.validation.genericRequired({
                resource: translate.resources.modalityType.name(),
              }),
            )
            .refine(
              // check if there is any modalityType name exist in the list
              (value) => {
                if (modalityTypes && modalityTypes.some((item) => item.name === value)) {
                  return false;
                }
                return true;
              },
              {
                message: translate.messages.validation.genericDuplicated({
                  name: translate.resources.modalityType.name(),
                }),
              },
            ),
          otherNames: z.string().optional(),
          preferredModalityID: z.number().optional(),
          preferredProcedureID: z.number().optional(),
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
          haveOperators: z.boolean().optional(),
          requireDicom: z.boolean().optional(),
          requireConsumable: z.boolean().optional(),
          haveTranscribers: z.boolean().optional(),
          otherNamesObjectList: z.array(z.object({ id: z.string() })).optional(),
        })
        .transform((val) => {
          const otherNames =
            val.otherNamesObjectList && val.otherNamesObjectList.map((item) => item.id);
          return {
            ...val,
            otherNames,
            otherNamesObjectList: undefined,
          };
        }),
    ),

    defaultValues: {
      name: '',
      preferredModalityID: undefined,
      preferredProcedureID: undefined,
    },
  };

  const handleSubmit = async (formData: IModalityTypeFormFields) => {
    try {
      if (formData.name) {
        const attributes: IModalityTypeUpdateDTO['attributes'] = {
          requires_transcriber: formData.haveTranscribers?.toString(),
          requires_technician: formData.haveOperators?.toString(),
          preferred_procedure: formData.preferredProcedureID?.toString(),
          require_consumable: formData.requireConsumable?.toString(),
        };
        const submitForm: IModalityTypeCreateDTO = {
          name: formData.name,
          config: formData.config,
          preferredModalityID: formData.preferredModalityID,
          otherNames: formData.otherNames,
          requireDicom: formData.requireDicom,
          attributes,
        };
        const res = await createModalityType(submitForm);
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

  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register('submitCreateForm', () => formInstance.submit && formInstance.submit())
      }
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={(controls) => {
        return <ModalityTypeFormFields {...controls} />;
      }}
    />
  );
};
