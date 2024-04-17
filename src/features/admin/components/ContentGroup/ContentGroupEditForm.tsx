import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IContentGroupDTO, IContentGroupDTOUpdate, IModalityTypeDTO } from '@/types/dto';
import { checkUpdateField } from '@/utils/checkUpdateFields';

import { useUpdateContentGroupMutation } from '../../../../api/contentGroup';

import {
  ContentGroupFormFields,
  IContentGroupFormFields,
} from './ContentGroupFormFields';

export const CONTENT_GROUP_MIN_LENGTH = 3;

type ContentGroupEditFormProps = {
  onSuccessCallback: () => void;
  modalityTypes: IModalityTypeDTO[];
  record: IContentGroupDTO;
};
export const ContentGroupEditForm: FC<ContentGroupEditFormProps> = (props) => {
  const { onSuccessCallback, record, modalityTypes } = props;
  const translate = useTranslate();
  const [updateContentGroup] = useUpdateContentGroupMutation();
  const register = useRegisterAdminFunctions();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.contentGroup.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.contentGroup.title().toLowerCase(),
    }),
  );
  const handleSubmit = async (formData: IContentGroupFormFields) => {
    try {
      if (formData.name) {
        const submitEditForm: IContentGroupDTOUpdate = {
          name: formData.name,
          description: formData.description ?? '',
          modalityType: formData.modalityType ?? '',
          id: record.id,
        };
        const res = await updateContentGroup({ ...submitEditForm });
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
        description: z.string(),
      }),
    ),
    defaultValues: {
      name: record.name ?? '',
      modalityType: record.modalityType ?? undefined,
      description: record.description ?? '',
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
      renderInputs={(controls) => (
        <ContentGroupFormFields
          modalityTypes={modalityTypes}
          record={record}
          {...controls}
        />
      )}
    />
  );
};
