import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IContentGroupDTOCreate, IModalityTypeDTO } from '@/types/dto';

import { useCreateContentGroupMutation } from '../../../../api/contentGroup';

import { CONTENT_GROUP_MIN_LENGTH } from './ContentGroupEditForm';
import {
  ContentGroupFormFields,
  IContentGroupFormFields,
} from './ContentGroupFormFields';

type ContentGroupCreateFormProps = {
  onSuccessCallback: () => void;
  modalityTypes: IModalityTypeDTO[];
};
export const ContentGroupCreateForm: FC<ContentGroupCreateFormProps> = (props) => {
  const { onSuccessCallback, modalityTypes } = props;
  const translate = useTranslate();
  const [createContentGroup] = useCreateContentGroupMutation();
  const register = useRegisterAdminFunctions();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.createResource({
      resource: translate.resources.contentGroup.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.resources.contentGroup.title().toLowerCase(),
    }),
  );
  const handleSubmit = async (formData: IContentGroupFormFields) => {
    try {
      // final validation
      if (formData.name) {
        const submitForm: IContentGroupDTOCreate = {
          name: formData.name,
          modalityType: formData.modalityType ?? '',
          description: formData.description ?? '',
        };
        const res = await createContentGroup(submitForm);
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

  const formOptions: UseFormProps<IContentGroupFormFields> = {
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(
      z.object({
        name: z
          .string()
          .trim()
          .min(
            CONTENT_GROUP_MIN_LENGTH,
            translate.messages.validation.genericMinLength({
              resource: translate.resources.contentGroup.name(),
              length: CONTENT_GROUP_MIN_LENGTH,
            }),
          ),
        modalityType: z.string({
          required_error: translate.messages.validation.genericRequired({
            resource: translate.resources.contentGroup.modalityType(),
          }),
        }),
        description: z.string().optional(),
      }),
    ),
    defaultValues: {
      name: '',
      description: '',
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
      renderInputs={(controls) => (
        <ContentGroupFormFields {...controls} modalityTypes={modalityTypes} />
      )}
    />
  );
};
