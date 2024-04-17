import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useCreateContentMutation } from '@/api/content';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IContentDTOCreate, IUserDTO } from '@/types/dto';

import { ContentFormFields, IContentFormFields } from './ContentFormFields';

type ContentCreateFormProps = {
  onSuccessCallback: () => void;
  currentUserData?: IUserDTO;
};

export const MIN_LENGTH_CONTENT_NAME = 3;
export const ContentCreateForm: FC<ContentCreateFormProps> = (props) => {
  const { currentUserData, onSuccessCallback } = props;
  const translate = useTranslate();
  const [createContent] = useCreateContentMutation();
  const register = useRegisterAdminFunctions();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.createResource({
      resource: translate.resources.content.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.resources.content.title().toLowerCase(),
    }),
  );
  const handleSubmit = async (formData: IContentFormFields) => {
    try {
      const submitForm: IContentDTOCreate = {
        name: formData.name,
        description: formData.description,
        groupIDs: formData.groupIDs,
        procedureIDs: formData.procedureIDs,
        findings: formData.findings,
        impression: formData.impression,
      };
      const res = await createContent(submitForm);
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

  const formOptions: UseFormProps<IContentFormFields> = {
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(
      z
        .object({
          name: z
            .string()
            .trim()
            .min(
              MIN_LENGTH_CONTENT_NAME,
              translate.messages.validation.genericMinLength({
                resource: translate.resources.content.name.short(),
                length: MIN_LENGTH_CONTENT_NAME,
              }),
            ),
          findings: z
            .string()
            .trim()
            .min(
              1,
              translate.messages.validation.genericRequired({
                resource: translate.resources.content.findings(),
              }),
            ),
          description: z.string().optional(),
          procedures: z.array(z.object({ id: z.number() })).optional(),
          impression: z.string().optional(),
          groups: z.array(z.object({ id: z.number() })).optional(),
          procedureIDs: z.array(z.number()).optional(),
          groupIDs: z.array(z.number()).optional(),
        })
        .transform((val) => {
          return {
            ...val,
            procedureIDs: val.procedures
              ? val.procedures.map((item) => item.id)
              : undefined,
            groupIDs: val.groups ? val.groups.map((item) => item.id) : undefined,
            procedures: undefined,
            groups: undefined,
          };
        }),
    ),
    defaultValues: {
      name: '',
      description: '',
      procedures: [],
      groups: [],
      impression: '',
      findings: '',
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
      renderInputs={(controls) => <ContentFormFields {...controls} />}
    />
  );
};
