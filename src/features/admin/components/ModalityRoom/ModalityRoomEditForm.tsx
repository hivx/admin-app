import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IModalityRoomDTO, IModalityRoomDTOUpdate } from '@/types/dto';
import { checkUpdateField } from '@/utils/checkUpdateFields';
import { mapUndefinedOrEmptyStringToNull } from '@/utils/format';

import {
  useUpdateModalityRoomMutation,
  useGetListModalityRoomQuery,
} from '../../api/modalityRoom';

import {
  IModalityRoomFormFields,
  ModalityRoomFormFields,
} from './ModalityRoomFormFields';

type ModalityRoomEditFormProps = {
  onSuccessCallback: () => void;
  record: IModalityRoomDTO;
};
export const ModalityRoomEditForm: FC<ModalityRoomEditFormProps> = (props) => {
  const { onSuccessCallback, record } = props;
  const [updateModalityRoom] = useUpdateModalityRoomMutation();
  const { data } = useGetListModalityRoomQuery({
    filter: {},
  });
  const listModalityRoomFiltedred = data?.list.filter((item) => item.id !== record.id);
  const translate = useTranslate();
  const register = useRegisterAdminFunctions();

  const formOptions: UseFormProps<IModalityRoomFormFields> = {
    mode: 'onChange',
    criteriaMode: 'all',
    // form validation and pre-processing
    resolver: zodResolver(
      z.object({
        name: z
          .string()
          .trim()
          .min(
            1,
            translate.messages.validation.genericRequired({
              resource: translate.resources.modalityRoom.name(),
            }),
          ),
        code: z
          .string()
          .trim()
          .min(
            1,
            translate.messages.validation.genericRequired({
              resource: translate.resources.modalityRoom.code(),
            }),
          )
          .refine(
            (value) => {
              // check if there is any modalityRoom code exist in the list EXCEPT itself
              if (
                listModalityRoomFiltedred &&
                listModalityRoomFiltedred.some((item) => item.code === value)
              ) {
                return false;
              }
              return true;
            },
            {
              message: translate.messages.validation.genericDuplicated({
                name: translate.resources.modalityRoom.code(),
              }),
            },
          ),
        description: z.string().optional().transform(mapUndefinedOrEmptyStringToNull),
      }),
    ),
    defaultValues: {
      name: record.name ?? '',
      code: record.code ?? '',
      description: record.description ?? '',
    },
  };

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.modalityRoom.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.modalityRoom.title().toLowerCase(),
    }),
  );

  const handleSubmit = async (formData: IModalityRoomFormFields) => {
    const { updateData, canUpdate } = checkUpdateField<IModalityRoomFormFields>(
      Object.keys(formData) as (keyof IModalityRoomFormFields)[], // can be safely typecasted
      record as IModalityRoomFormFields, // can be safely typecasted
      formData,
    );

    const submitEditFormData: IModalityRoomDTOUpdate = {
      name: updateData.name ?? undefined,
      description: updateData.description ?? undefined,
      code: updateData.code ?? undefined,
      id: record.id,
    };

    if (canUpdate) {
      try {
        const res = await updateModalityRoom(submitEditFormData);
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
      renderInputs={(controls) => (
        <ModalityRoomFormFields record={record} {...controls} />
      )}
    />
  );
};
