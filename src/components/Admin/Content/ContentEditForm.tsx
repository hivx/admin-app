import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useUpdateContentMutation } from '@/api/content';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import {
  IContentDTO,
  IContentDTOUpdate,
  IContentGroupDTO,
  IProcedureDTO,
} from '@/types/dto';

import { MIN_LENGTH_CONTENT_NAME } from './ContentCreateForm';
import { ContentFormFields, IContentFormFields } from './ContentFormFields';

type ContentEditFormProps = {
  onSuccessCallback: () => void;
  record: IContentDTO;
  procedureData: IProcedureDTO[];
  groupData: IContentGroupDTO[];
};

type ContentEditFormOptions = IContentFormFields;
export const ContentEditForm: FC<ContentEditFormProps> = (props) => {
  const { onSuccessCallback, record } = props;
  const translate = useTranslate();
  const [updateContent] = useUpdateContentMutation();

  const register = useRegisterAdminFunctions();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.content.title().toLowerCase(),
    }),
  );
  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.content.title().toLowerCase(),
    }),
  );
  const handleSubmit = async (formData: IContentFormFields) => {
    try {
      const submitEditForm: IContentDTOUpdate = {
        name: formData.name,
        description: formData.description ?? '',
        groupIDs: formData.groupIDs,
        procedureIDs: formData.procedureIDs,
        id: record.id,
        findings: formData.findings,
        impression: formData.impression,
      };
      const res = await updateContent({ ...submitEditForm });
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

  const formOptions: UseFormProps<ContentEditFormOptions> = {
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
          impression: z.string().optional(),
          description: z.string().optional(),
          procedures: z.array(z.object({ id: z.number() })).optional(),
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
      name: record.name ?? '',
      procedures: record?.procedures ?? [],
      groups: record?.groups ?? [],
      description: record.description ?? '',
      impression: record.impression ?? '',
      findings: record.findings ?? '',
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
      renderInputs={(controls) => <ContentFormFields record={record} {...controls} />}
    />
  );
};
