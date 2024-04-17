import { Box, Checkbox } from '@mui/material';
import { forwardRef } from 'react';
import { LocalizedString } from 'typesafe-i18n';

import { MyTextField } from '@/components';
import {
  IMyAutoCompleteProps,
  MyAutoComplete,
} from '@/components/Elements/Inputs/MyAutoComplete';
import { DropdownPaper } from '@/components/Elements/Surfaces/DropdownPaper';
import { LoadingDropdownPaper } from '@/components/Elements/Surfaces/LoadingDropdownPaper';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { useDisclosure } from '@/hooks';
import { ICloudUserDTO, IUserDTO } from '@/types/dto';
import { userToCloudUser } from '@/utils/userToCloudUser';

type RadiologyReportUserAutocompleteFieldProps = {
  users: IUserDTO[];
  initialValue?: ICloudUserDTO | null;
  isFetching: boolean;
  label: string | LocalizedString;
  disabled?: boolean;
  placeholder: string | LocalizedString;
  onSelectUser: (user: ICloudUserDTO) => void;
  onRemoveUser: (user: ICloudUserDTO) => void;
  onClear: () => void;
  onOpen: () => void;
};
/**
 * Handles display of user selection field in Radiology Report
 */
export const RadiologyReportUserAutocompleteField = forwardRef<
  HTMLElement,
  RadiologyReportUserAutocompleteFieldProps
>((props, ref) => {
  const {
    users,
    initialValue,
    label,
    placeholder,
    isFetching,
    onSelectUser,
    onRemoveUser,
    onClear,
    onOpen,
    disabled,
  } = props;

  const { isOpen, close, open } = useDisclosure(false);

  // fetch data on open
  const handleOpen = () => {
    onOpen();
    open();
  };

  const handleOnChange: IMyAutoCompleteProps<ICloudUserDTO>['onChange'] = (
    e,
    value,
    reason,
    detail,
  ) => {
    const selectedUser = detail?.option;
    switch (reason) {
      case 'selectOption':
        // add user
        selectedUser && onSelectUser(selectedUser);
        break;
      case 'removeOption':
        // remove user
        selectedUser && onRemoveUser(selectedUser);
        break;
      case 'clear':
        value && onClear();
        break;
      default:
        break;
    }
    // close();
  };

  const cloudUsers = users.map(userToCloudUser);
  return (
    <Box ref={ref}>
      <MyAutoComplete
        open={isOpen}
        onClose={close}
        onOpen={handleOpen}
        options={cloudUsers}
        defaultValue={initialValue}
        disabled={disabled}
        renderInput={(params) => (
          <MyTextField
            {...params}
            label={label}
            placeholder={placeholder}
            size="small"
            InputProps={{
              ...params.InputProps,
              endAdornment: disabled ? <></> : params.InputProps.endAdornment,
            }}
          />
        )}
        fullWidth
        getOptionLabel={(option) => `${option?.username} - ${option?.fullname}`}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        disableCloseOnSelect={false}
        PaperComponent={isFetching ? LoadingDropdownPaper : DropdownPaper}
        multiple={false}
        onChange={handleOnChange}
        renderOption={(props, option, { selected }) => {
          return (
            <li {...props}>
              <StyledDivLeftChildren>
                <Checkbox size="small" checked={selected} />
                {`${option?.username} - ${option?.fullname}`}
              </StyledDivLeftChildren>
            </li>
          );
        }}
      />
    </Box>
  );
});

RadiologyReportUserAutocompleteField.displayName = 'RadiologyReportUserAutocompleteField';
