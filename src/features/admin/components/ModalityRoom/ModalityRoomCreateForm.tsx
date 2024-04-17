import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IModalityRoomDTOCreate } from '@/types/dto';

import {
  useGetListModalityRoomQuery,
  useCreateModalityRoomMutation,
} from '../../api/modalityRoom';

import {
  IModalityRoomFormFields,
  ModalityRoomFormFields,
} from './ModalityRoomFormFields';

type ModalityRoomCreateFormProps = {
  onSuccessCallback: () => void;
};
export const ModalityRoomCreateForm: FC<ModalityRoomCreateFormProps> = (props) => {
  const { onSuccessCallback } = props;
  const [createModalityRoom] = useCreateModalityRoomMutation();
  const { data } = useGetListModalityRoomQuery({
    filter: {},
  });
  const listModalityRoom = data?.list;
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
              // check if there is any modalityRoom code exist in the list
              if (
                listModalityRoom &&
                listModalityRoom.some((item) => item.code === value)
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
        parentID: z.number().optional(),
        description: z.string().optional(),
      }),
    ),
    defaultValues: {
      name: '',
      code: '',
      description: '',
    },
  };

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.createResource({
      resource: translate.resources.modalityRoom.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.resources.modalityRoom.title().toLowerCase(),
    }),
  );

  const handleSubmit = async (formData: IModalityRoomFormFields) => {
    const { code, description, name } = formData;
    try {
      if (code && name) {
        const submitForm: IModalityRoomDTOCreate = {
          code,
          description,
          name,
        };
        const res = await createModalityRoom(submitForm);
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
      renderInputs={(controls) => <ModalityRoomFormFields {...controls} />}
    />
  );
};
