import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IModalityDTO, IModalityDTOUpdate, IProcedureDTO } from '@/types/dto';
import { checkUpdateField } from '@/utils/checkUpdateFields';
import { isJsonObject } from '@/utils/validateJSON';

import { useUpdateModalityMutation } from '../../../../api/modality';
import { useModalityForm } from '../../hooks/useModalityForm';

import { MIN_LENGTH_MODALITY_NAME } from './ModalityCreateForm';
import { ModalityFormFields } from './ModalityFormFields';

type ModalityEditFormProps = {
  onSuccessCallback: () => void;
  record: IModalityDTO;
};

export type IModalityFormFields = IModalityDTOUpdate & {
  procedures?: IProcedureDTO[];
};

export const ModalityEditForm: FC<ModalityEditFormProps> = (props) => {
  const { onSuccessCallback, record } = props;
  const [updateModality] = useUpdateModalityMutation();
  const translate = useTranslate();
  const register = useRegisterAdminFunctions();

  const { modalityList } = useModalityForm({
    record,
  });

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
                if (value === record.code) return true;
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
              resource: translate.resources.modality.modalityType.long(),
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
            .transform((item) => {
              const num = parseInt(item as string);
              if (isNaN(num)) return 0;
              return num;
            })
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
      id: record.id,
      name: record.name ?? '',
      code: record.code ?? '',
      groupID: record.group ? record.group.id : undefined,
      roomID: record.room ? record.room.id : undefined,
      modalityType: record?.modalityType ?? undefined,
      aeTitle: record.aeTitle ?? '',
      ipAddress: record.ipAddress ?? '',
      institutionName: record?.institutionName ?? '',
      stationName: record.stationName ?? '',
      enabled: record?.enabled ?? false,
      procedures: record.procedures ?? undefined, // trung gian for select field
      procedureIDs: [],
      manufacturerModelName: record?.manufacturerModelName ?? '',
      capability: record?.capability ?? undefined,
    },
  };

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.modality.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.modality.title().toLowerCase(),
    }),
  );

  const handleSubmit = async (formData: IModalityFormFields) => {
    type ModalityEditFormSubmit = Omit<IModalityFormFields, 'procedures'>;

    const currentModalityData = {
      ...record,
      roomID: record?.room?.id,
      groupID: record?.group?.id,
      procedureIDs: record?.procedures?.map((item) => item.id),
    } as ModalityEditFormSubmit;

    const { updateData, canUpdate } = checkUpdateField<ModalityEditFormSubmit>(
      Object.keys(formData) as (keyof ModalityEditFormSubmit)[], // can be safely typecasted
      currentModalityData, // can be safely typecasted
      formData,
    );

    if (canUpdate) {
      try {
        const res = await updateModality({ ...updateData, id: record.id });
        if ('error' in res) {
          notifyError();
        } else {
          notifySuccess();
          onSuccessCallback();
        }
      } catch (e) {
        notifyError();
      }
    }
  };
  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register('submitEditForm', () => formInstance.submit && formInstance.submit())
      }
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={(controls) => {
        return <ModalityFormFields {...controls} record={record} />;
      }}
    />
  );
};
