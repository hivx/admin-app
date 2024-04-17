import { Stack } from '@mui/material';
import React, { FC } from 'react';

import { MyFormTextField } from '@/components/Elements';
import { IFormControlInputProps } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { IBookmarkDTO } from '@/types/dto';
import { IBookmarkFolderDTOUpdate } from '@/types/dto/bookmarkFolder';

export type IBookmarkFolderFormFields = Omit<IBookmarkFolderDTOUpdate, 'id'>;

type BookmarkFolderFormFieldsProps = IFormControlInputProps<IBookmarkFolderFormFields> & {
  folder?: IBookmarkDTO;
};

const BookmarkFolderFormFields: FC<BookmarkFolderFormFieldsProps> = (props) => {
  const { control } = props;
  const translate = useTranslate();
  return (
    <Stack spacing={1.5}>
      <MyFormTextField
        name="name"
        control={control}
        MyTextFieldProps={{
          label: translate.bookmark.folderName(),
          fullWidth: true,
          size: 'small',
          required: true,
        }}
      />
      <MyFormTextField
        name="description"
        control={control}
        MyTextFieldProps={{
          label: translate.bookmark.description(),
          fullWidth: true,
          size: 'small',
        }}
      />
    </Stack>
  );
};

export default BookmarkFolderFormFields;
