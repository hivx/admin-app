import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useUpdateBookmarkFolderMutation } from '@/api/bookmarkFolder';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { useRegisterBookmarkFunctions } from '@/providers/Order/BookmarkFunctionsProvider';
import { IBookmarkFolderDTO, IBookmarkFolderDTOCreate } from '@/types/dto/bookmarkFolder';

import BookmarkFolderFormFields from './BookmarkFolderFormFields';

type UpdateBookmarkFolderFormProps = {
  onSuccessCallback?: () => void;
  folder: IBookmarkFolderDTO;
};

export const UpdateBookmarkFolderForm: FC<UpdateBookmarkFolderFormProps> = (props) => {
  const { onSuccessCallback, folder } = props;
  const translate = useTranslate();
  const register = useRegisterBookmarkFunctions();
  const [updateBookmarkFolder] = useUpdateBookmarkFolderMutation();

  const notifyEditBookmarkFolderSuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.bookmark.folder().toLowerCase(),
    }),
  );

  const notifyEditBookmarkFolderError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.bookmark.folder().toLowerCase(),
    }),
  );
  const handleSubmit = async (formData: IBookmarkFolderDTOCreate) => {
    const res = await updateBookmarkFolder({ ...formData, id: folder.id });
    if ('error' in res) {
      notifyEditBookmarkFolderError();
    } else {
      notifyEditBookmarkFolderSuccess();
      onSuccessCallback && onSuccessCallback();
    }
  };

  const formOptions: UseFormProps<IBookmarkFolderDTOCreate> = {
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(
      z.object({
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
      }),
    ),
    defaultValues: {
      name: folder.name ?? '',
      description: folder.description ?? '',
    },
  };
  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register(
          'updateBookMarkFolder',
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
