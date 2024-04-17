import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useCreateBookmarkFolderMutation } from '@/api/bookmarkFolder';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { useRegisterBookmarkFunctions } from '@/providers/Order/BookmarkFunctionsProvider';
import { IBookmarkFolderDTOCreate } from '@/types/dto/bookmarkFolder';

import BookmarkFolderFormFields from './BookmarkFolderFormFields';

type CreateBookmarkFolderFormProps = {
  onSuccessCallback?: () => void;
};

export const CreateBookmarkFolderForm: FC<CreateBookmarkFolderFormProps> = (props) => {
  const { onSuccessCallback } = props;
  const translate = useTranslate();
  const register = useRegisterBookmarkFunctions();
  const [createBookmarkFolder] = useCreateBookmarkFolderMutation();

  const notifyCreateBookmarkFolderSuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.createResource({
      resource: translate.bookmark.folder().toLowerCase(),
    }),
  );

  const notifyCreateBookmarkFolderError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.bookmark.folder().toLowerCase(),
    }),
  );
  const handleSubmit = async (formData: IBookmarkFolderDTOCreate) => {
    const res = await createBookmarkFolder(formData);
    if ('error' in res) {
      notifyCreateBookmarkFolderError();
    } else {
      notifyCreateBookmarkFolderSuccess();
      onSuccessCallback && onSuccessCallback();
    }
  };

  const formOptions: UseFormProps<IBookmarkFolderDTOCreate> = {
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(
      z
        .object({
          description: z.string().optional(),
          name: z
            .string()
            .trim()
            .min(
              1,
              translate.messages.validation.genericRequired({
                resource: translate.bookmark.folderName(),
              }),
            ),
        })
        .transform((val) => {
          return {
            ...val,
          };
        }),
    ),
    defaultValues: {
      name: '',
    },
  };
  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register(
          'createBookMarkFolder',
          () => formInstance.submit && formInstance.submit(),
        )
      }
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={(controls) => <BookmarkFolderFormFields {...controls} />}
    />
  );
};
