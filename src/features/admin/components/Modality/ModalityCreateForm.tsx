import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { isJsonObject } from '@/utils/validateJSON';

import { useCreateModalityMutation } from '../../../../api/modality';
import { useModalityForm } from '../../hooks/useModalityForm';

import { IModalityFormFields } from './ModalityEditForm';
import { ModalityFormFields } from './ModalityFormFields';

export const MIN_LENGTH_MODALITY_NAME = 3;

type ModalityCreateFormProps = {
  onSuccessCallback: () => void;
};

export const ModalityCreateForm: FC<ModalityCreateFormProps> = (props) => {
  const { onSuccessCallback } = props;
  const [createModality] = useCreateModalityMutation();
  const translate = useTranslate();
  const register = useRegisterAdminFunctions();

  const { modalityList } = useModalityForm({});

  // validation rule is unique for Edit/Create form so we leave it out of the hook
  const formOptions: UseFormProps<IModalityFormFields> = {
    mode: 'onChange',
    criteriaMode: 'all',
    // form validation and pre-processing
    resolver: zodResolver(
      z
        .object({
          code: z
            .string()
            .trim()
            .min(
              1,
              translate.messages.validation.genericRequired({
                resource: translate.resources.modality.code.short(),
              }),
            )
            .refine(
              (value) => {
                // check if there is any department code exist in the list
                if (modalityList && modalityList.some((item) => item.code === value)) {
                  return false;
                }
                return true;
              },
              {
                message: translate.messages.validation.genericDuplicated({
                  name: translate.resources.modality.code.short(),
                }),
              },
            ),
          name: z
            .string()
            .trim()
            .min(
              MIN_LENGTH_MODALITY_NAME,
              translate.messages.validation.genericMinLength({
                resource: translate.resources.modality.name.short(),
                length: MIN_LENGTH_MODALITY_NAME,
              }),
            ),
          groupID: z.number({
            required_error: translate.messages.validation.genericRequired({
              resource: translate.resources.modality.group.short(),
            }),
          }),
          modalityType: z.string({
            required_error: translate.messages.validation.genericRequired({
              resource: translate.resources.modality.modalityType.short(),
            }),
          }),
          roomID: z.number({
            required_error: translate.messages.validation.genericRequired({
              resource: translate.resources.modality.room.short(),
            }),
          }),
          aeTitle: z.string().optional(),
          ipAddress: z.string().optional(),
          institutionName: z.string().optional(),
          stationName: z.string().optional(),
          enabled: z.boolean().optional(),
          procedures: z.array(z.object({ id: z.number() })).optional(),
          otherModalityList: z.array(z.object({ modalityAbbr: z.string() })).optional(),
          manufacturerModelName: z.string().optional(),
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
          capability: z
            .union([z.string(), z.number()])
            .transform((item) => parseInt(item as string))
            .optional(),
        })
        .transform((val) => {
          return {
            ...val,
            procedureIDs: val.procedures?.map((item) => item.id),
            procedures: undefined,
          };
        }),
    ),
    defaultValues: {
      name: '',
      code: '',
      groupID: undefined,
      roomID: undefined,
      modalityType: undefined,
      aeTitle: '',
      ipAddress: '',
      institutionName: '',
      stationName: '',
      enabled: true,
      // NOTE: do not set this as undefined because Autocomplete is a controlled input
      // https://reactjs.org/docs/uncontrolled-components.html
      procedures: [],
      procedureIDs: [],
      manufacturerModelName: '',
      capability: undefined,
      config: '',
    },
  };

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.createResource({
      resource: translate.resources.modality.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.resources.modality.title().toLowerCase(),
    }),
  );

  const handleSubmit = async (formData: IModalityFormFields) => {
    try {
      const res = await createModality(formData);
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
        register('submitCreateForm', () => formInstance.submit && formInstance.submit())
      }
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={(controls) => {
        return <ModalityFormFields {...controls} />;
      }}
    />
  );
};
