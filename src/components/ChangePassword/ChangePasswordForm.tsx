import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import React from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useUpdatePasswordMutation } from '@/api/password';
import { MyFormGroupUnstyled } from '@/components/Form';
import MyPasswordForm from '@/components/Form/MyPasswordForm';
import { useDisclosure, useTranslate } from '@/hooks';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';

import { AppModalContent } from '../Elements/Modal/AppModalContent';

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  reNewPassword: string;
};
export const MIN_PASSWORD_LENGTH = 6;

export const ChangePasswordForm = ({
  disclosure,
}: {
  disclosure: ReturnType<typeof useDisclosure>;
}) => {
  const translate = useTranslate();

  const [updatePassword] = useUpdatePasswordMutation();
  const formOptions: UseFormProps<PasswordForm> = {
    mode: 'onChange',
    criteriaMode: 'all',
    // form validation and pre-processing
    resolver: zodResolver(
      z
        .object({
          currentPassword: z
            .string()
            .trim()
            .min(
              MIN_PASSWORD_LENGTH,
              translate.messages.validation.genericMinLength({
                resource: translate.resources.user.currentPassword(),
                length: MIN_PASSWORD_LENGTH,
              }),
            ),
          newPassword: z
            .string()
            .trim()
            .min(
              MIN_PASSWORD_LENGTH,
              translate.messages.validation.genericMinLength({
                resource: translate.resources.user.newPassword(),
                length: MIN_PASSWORD_LENGTH,
              }),
            ),
          reNewPassword: z
            .string()
            .trim()
            .min(
              MIN_PASSWORD_LENGTH,
              translate.messages.validation.genericMinLength({
                resource: translate.resources.user.rePassword(),
                length: MIN_PASSWORD_LENGTH,
              }),
            ),
        })
        .refine((data) => data.newPassword === data.reNewPassword, {
          message: translate.messages.validation.passwordDontMatch(),
          path: ['reNewPassword'],
        }),
    ),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      reNewPassword: '',
    },
  };

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.user.password().toLowerCase(),
    }),
  );
  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.user.password().toLowerCase(),
    }),
  );

  const handleSubmit = async (formData: PasswordForm) => {
    try {
      const res = await updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      if ('error' in res) {
        notifyError();
      } else {
        disclosure.close();
        notifySuccess();
      }
    } catch (e) {
      notifyError();
    }
  };
  return (
    <MyFormGroupUnstyled
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={({ control, formState, onKeyDown, submit }) => (
        <AppModalContent
          title={translate.buttons.changePassword()}
          BodyComponent={
            <Stack spacing={2} padding={2}>
              <MyPasswordForm
                name="currentPassword"
                control={control}
                MyTextFieldProps={{
                  label: translate.resources.user.currentPassword(),
                  placeholder: translate.resources.user.currentPassword(),
                  fullWidth: true,
                  required: true,
                  onKeyDown,
                }}
              />
              <MyPasswordForm
                name="newPassword"
                control={control}
                MyTextFieldProps={{
                  label: translate.resources.user.newPassword(),
                  placeholder: translate.resources.user.newPassword(),
                  fullWidth: true,
                  required: true,
                  onKeyDown,
                }}
              />
              <MyPasswordForm
                name="reNewPassword"
                control={control}
                MyTextFieldProps={{
                  label: translate.resources.user.rePassword(),
                  placeholder: translate.resources.user.rePassword(),
                  fullWidth: true,
                  required: true,
                  onKeyDown,
                }}
              />
            </Stack>
          }
          handleConfirm={submit}
          handleClose={disclosure.close}
          width="30%"
        />
      )}
    />
  );
};
