import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useUpdateBookmarkMutation } from '@/api/bookmark';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { useRegisterBookmarkFunctions } from '@/providers/Order/BookmarkFunctionsProvider';
import { IBookmarkDTO } from '@/types/dto';

import BookmarkFormFields, { IBookmarkFormFields } from './BookmarkFormFields';

type UpdateBookmarkFormProps = {
  onSuccessCallback?: () => void;
  bookmark?: IBookmarkDTO;
};

export const UpdateBookmarkForm: FC<UpdateBookmarkFormProps> = (props) => {
  const { onSuccessCallback, bookmark } = props;
  const translate = useTranslate();
  const register = useRegisterBookmarkFunctions();
  const [updateBookmark] = useUpdateBookmarkMutation();
  const notifyUpdateSuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.bookmark.title().toLowerCase(),
    }),
  );

  const notifyUpdateError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.bookmark.title().toLowerCase(),
    }),
  );
  const handleSubmit = async (formData: IBookmarkFormFields) => {
    if (
      formData.folderID !== bookmark?.folderID ||
      formData.description !== bookmark?.description
    ) {
      const res = await updateBookmark({ ...formData, id: bookmark?.id ?? 0 });
      if ('error' in res) {
        notifyUpdateError();
      } else {
        notifyUpdateSuccess();
        onSuccessCallback && onSuccessCallback();
      }
    }
  };

  const formOptions: UseFormProps<IBookmarkFormFields> = {
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(
      z
        .object({
          description: z.string().optional(),
          folderID: z.number().optional(),
        })
        .transform((val) => {
          return {
            ...val,
          };
        }),
    ),
    defaultValues: {
      folderID: bookmark?.folderID ?? 0,
      description: bookmark?.description ?? '',
    },
  };
  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register('updateBookMark', () => formInstance.submit && formInstance.submit())
      }
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={(controls) => (
        <BookmarkFormFields {...controls} bookmark={bookmark} />
      )}
    />
  );
};
