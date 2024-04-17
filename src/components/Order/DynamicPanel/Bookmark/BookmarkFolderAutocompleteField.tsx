import { Box } from '@mui/material';
import { forwardRef } from 'react';
import { LocalizedString } from 'typesafe-i18n';

import { MyTextField } from '@/components';
import {
  IMyAutoCompleteProps,
  MyAutoComplete,
} from '@/components/Elements/Inputs/MyAutoComplete';
import { DropdownPaper } from '@/components/Elements/Surfaces/DropdownPaper';
import { LoadingDropdownPaper } from '@/components/Elements/Surfaces/LoadingDropdownPaper';
import { StyledLongText } from '@/components/Layout/StyledDiv';
import { useDisclosure } from '@/hooks';
import { IBookmarkFolderDTO } from '@/types/dto/bookmarkFolder';

type BookmarkFolderAutocompleteFieldProps = {
  folders: IBookmarkFolderDTO[];
  initialValue?: IBookmarkFolderDTO | null;
  isFetching: boolean;
  label?: string | LocalizedString;
  disabled?: boolean;
  placeholder: string | LocalizedString;
  onSelectFolder: (folder: IBookmarkFolderDTO) => void;
  onOpen: () => void;
};
/**
 * Handles display of bookmark folder selection field in personal folder side panel
 */
export const BookmarkFolderAutocompleteField = forwardRef<
  HTMLElement,
  BookmarkFolderAutocompleteFieldProps
>((props, ref) => {
  const {
    folders,
    initialValue,
    label,
    placeholder,
    isFetching,
    onSelectFolder,
    onOpen,
    disabled,
  } = props;

  const { isOpen, close, open } = useDisclosure(false);

  // fetch data on open
  const handleOpen = () => {
    onOpen();
    open();
  };

  const handleOnChange: IMyAutoCompleteProps<IBookmarkFolderDTO>['onChange'] = (
    e,
    value,
    reason,
    detail,
  ) => {
    const selectedFolder = detail?.option;
    reason === 'selectOption' && selectedFolder && onSelectFolder(selectedFolder);
  };

  return (
    <Box ref={ref}>
      <MyAutoComplete
        open={isOpen}
        onClose={close}
        onOpen={handleOpen}
        options={folders}
        defaultValue={initialValue}
        disabled={disabled}
        renderInput={(params) => (
          <MyTextField {...params} label={label} placeholder={placeholder} size="small" />
        )}
        fullWidth
        getOptionLabel={(option) => option?.name ?? ''}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        disableCloseOnSelect={false}
        PaperComponent={isFetching ? LoadingDropdownPaper : DropdownPaper}
        multiple={false}
        onChange={handleOnChange}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              <StyledLongText title={option?.name ?? ''}>{option?.name}</StyledLongText>
            </li>
          );
        }}
      />
    </Box>
  );
});

BookmarkFolderAutocompleteField.displayName = 'BookmarkFolderAutocompleteField';
