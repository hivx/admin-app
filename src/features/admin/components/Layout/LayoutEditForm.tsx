import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useUpdateLayoutMutation } from '@/api/layout';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { ILayoutDTO, ILayoutDTOUpdate, IProcedureDTO } from '@/types/dto';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';

import { useLayoutTemplateForm } from '../../hooks/useLayoutTemplateForm';

import { ILayoutFormFields, LayoutFormFields } from './LayoutFormFields';

type LayoutEditFormProps = {
  record: ILayoutDTO;
  onSuccessCallback: () => void;
};

export const LayoutEditForm = (props: LayoutEditFormProps) => {
  const { record, onSuccessCallback } = props;
  const [updateLayout] = useUpdateLayoutMutation();

  const translate = useTranslate();

  const register = useRegisterAdminFunctions();

  const { modalityTypeNames } = useLayoutTemplateForm();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.createResource({
      resource: translate.resources.layout.title.short().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.resources.layout.title.short().toLowerCase(),
    }),
  );

  const formOptions: UseFormProps<ILayoutFormFields> = {
    criteriaMode: 'all',
    resolver: zodResolver(
      z
        .object({
          name: z
            .string()
            .trim()
            .min(
              3,
              translate.messages.validation.genericMinLength({
                resource: translate.resources.layout.name.long(),
                length: 3,
              }),
            ),
          data: z
            .string()
            .trim()
            .min(
              1,
              translate.messages.validation.genericRequired({
                resource: translate.resources.layout.data(),
              }),
            ),
          format: z.string().optional().transform(mapNullOrEmptyStringToUndefined),
          modalityType: z.string().optional(),
          description: z.string().optional(),
          procedures: z.array(z.object({ id: z.number() })).optional(),
          procedureIDs: z.array(z.number()).optional(),
          departments: z.array(z.object({ id: z.number() })).optional(),
          departmentIDs: z.array(z.number()).optional(),
          numOfImages: z.coerce.number(),
        })
        .transform((val) => {
          return {
            ...val,
            procedureIDs: val.procedures
              ? val.procedures.map((item) => item.id)
              : undefined,
            departmentIDs: val.departments
              ? val.departments.map((item) => item.id)
              : undefined,
            procedures: undefined,
          };
        }),
    ),
    defaultValues: {
      data: record.data ?? '',
      description: record.description ?? '',
      format: record.format ?? '',
      modalityType: record.modalityType ?? '',
      name: record.name ?? '',
      procedures: record?.procedures ?? [],
      departments: record?.departments ?? [],
      numOfImages: record.keyImageNames?.length ?? undefined,
    },
  };

  const handleSubmit = async (formData: ILayoutFormFields) => {
    const keyImageNames: string[] = [];
    if (formData.numOfImages) {
      for (let index = 0; index < formData.numOfImages; index++) {
        keyImageNames.push(`image${index + 1}`);
      }
    }

    try {
      const submitEditForm: ILayoutDTOUpdate = {
        name: formData.name,
        description: formData.description,
        procedureIDs: formData?.procedureIDs,
        departmentIDs: formData?.departmentIDs,
        id: record.id,
        data: formData.data,
        format: formData.format ?? '',
        modalityType: formData.modalityType,
        keyImageNames: keyImageNames,
      };
      const res = await updateLayout({ ...submitEditForm });
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
        register('submitEditForm', () => formInstance.submit && formInstance.submit())
      }
      formOptions={formOptions}
      submitOnEnter
      onSubmit={handleSubmit}
      renderInputs={(controls) =>
        modalityTypeNames && (
          <LayoutFormFields modalityTypeNames={modalityTypeNames} {...controls} />
        )
      }
    />
  );
};
