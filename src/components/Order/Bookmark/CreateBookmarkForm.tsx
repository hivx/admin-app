import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useCreateBookmarkMutation } from '@/api/bookmark';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { useRegisterBookmarkFunctions } from '@/providers/Order/BookmarkFunctionsProvider';
import { IBookmarkDTOCreate, IOrderDTO } from '@/types/dto';

import BookmarkFormFields from './BookmarkFormFields';

type CreateBookmarkFormProps = {
  onSuccessCallback?: () => void;
  order: IOrderDTO;
};

export const CreateBookmarkForm: FC<CreateBookmarkFormProps> = (props) => {
  const { onSuccessCallback, order } = props;
  const translate = useTranslate();
  const register = useRegisterBookmarkFunctions();
  const [createBookmark] = useCreateBookmarkMutation();

  const notifyCreateSuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.createResource({
      resource: translate.bookmark.title().toLowerCase(),
    }),
  );

  const notifyCreateError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.bookmark.title().toLowerCase(),
    }),
  );
  const handleSubmit = async (formData: IBookmarkDTOCreate) => {
    const res = await createBookmark({ ...formData, orderID: order.id });
    if ('error' in res) {
      notifyCreateError();
    } else {
      notifyCreateSuccess();
      onSuccessCallback && onSuccessCallback();
    }
  };

  const formOptions: UseFormProps<IBookmarkDTOCreate> = {
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(
      z.object({
        description: z.string().optional(),
        folderID: z
          .number()
          .refine(
            (value) => {
              if (value > 0) {
                return true;
              }
              return false;
            },
            {
              message: translate.messages.validation.genericRequired({
                resource: translate.bookmark.folder(),
              }),
            },
          )
          .optional(),
      }),
    ),
    defaultValues: {
      folderID: -1,
    },
  };
  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register('createBookMark', () => formInstance.submit && formInstance.submit())
      }
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={(controls) => <BookmarkFormFields {...controls} />}
    />
  );
};
