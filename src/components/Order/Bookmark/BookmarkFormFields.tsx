import { MenuItem, Stack, styled } from '@mui/material';
import React, { FC } from 'react';

import {
  useGetOneBookmarkFolderQuery,
  useLazyGetListBookmarkFolderQuery,
} from '@/api/bookmarkFolder';
import { MyFormTextField } from '@/components/Elements';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { IFormControlInputProps } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { globalStyles } from '@/providers/ThemeProvider';
import { IBookmarkDTO, IBookmarkDTOUpdate } from '@/types/dto';

export type IBookmarkFormFields = Omit<IBookmarkDTOUpdate, 'id'>;

type BookmarkFormFieldsProps = IFormControlInputProps<IBookmarkFormFields> & {
  bookmark?: IBookmarkDTO;
};

const BookmarkFormFields: FC<BookmarkFormFieldsProps> = (props) => {
  const { control, bookmark } = props;
  const translate = useTranslate();
  const [triggerBookmarkFolder, { data: bookmarksFolderData }] =
    useLazyGetListBookmarkFolderQuery();

  const { data: bookmarkFolderData } = useGetOneBookmarkFolderQuery(
    { id: bookmark?.folderID ?? 0 },
    { skip: !bookmark?.id },
  );
  const listBookmark = bookmarksFolderData?.list ?? [bookmarkFolderData];
  return (
    <Stack spacing={1.5}>
      <MyFormSelectField
        name="folderID"
        control={control}
        required={true}
        MySelectProps={{
          label: translate.bookmark.folder(),
          size: 'small',
          onOpen: () => {
            triggerBookmarkFolder({ filter: {} }, true);
          },
          MenuProps: {
            sx: {
              '.MuiPopover-paper': {
                maxWidth: '30vw',
                maxHeight: '500px',
              },
            },
          },
        }}
      >
        {listBookmark.map((bookmarkFolder) => (
          <MenuItem key={bookmarkFolder?.id} value={bookmarkFolder?.id}>
            <StyledTextMenuItem title={bookmarkFolder?.name ?? ''}>
              {bookmarkFolder?.name}
            </StyledTextMenuItem>
          </MenuItem>
        ))}
      </MyFormSelectField>
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

export default BookmarkFormFields;

const StyledTextMenuItem = styled('div')`
  ${globalStyles.ellipsisEffect}
`;
