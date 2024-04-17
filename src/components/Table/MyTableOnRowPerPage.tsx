import { FormControl, MenuItem, Stack, styled, SxProps } from '@mui/material';
import { FC } from 'react';

import { ITablePaginationInfo } from '@/hooks';

import { MySelect } from '../Elements';

type MyTableOnRowPerPageProps = {
  displayRowsPerPage?: boolean;
  /**
   * Custom theme override
   */
  sx?: SxProps;
} & Partial<
  Pick<ITablePaginationInfo, 'rowsPerPage' | 'onRowsPerPageChange' | 'rowsPerPageOptions'>
>;

export const MyTableOnRowPerPage: FC<MyTableOnRowPerPageProps> = (props) => {
  const {
    displayRowsPerPage = true,
    rowsPerPage,
    onRowsPerPageChange,
    rowsPerPageOptions,
    sx,
  } = props;

  return (
    <StyledTableOnRowPerPage sx={sx}>
      {displayRowsPerPage && (
        <Stack direction="row" alignItems="center">
          <StyledFormControl sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <StyledRowsPerPageSelect
              variant="outlined"
              value={rowsPerPage}
              // sx={{ fontSize: '14px' }}
              onChange={(e) => {
                onRowsPerPageChange &&
                  onRowsPerPageChange(parseInt(e.target.value as string));
              }}
            >
              {(rowsPerPageOptions || []).map((item) => (
                <MenuItem key={item} value={item} defaultValue={1}>
                  {item}
                </MenuItem>
              ))}
            </StyledRowsPerPageSelect>
          </StyledFormControl>
        </Stack>
      )}
    </StyledTableOnRowPerPage>
  );
};

const StyledTableOnRowPerPage = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  ${(props) => props.theme.typography.body2}
  & > :not(:last-child) {
    margin-right: ${(props) => props.theme.spacing(1)};
  }

  & .MuiInput-underline:hover:before {
    border-bottom-color: ${(props) => props.theme.palette.primary.main};
  }
`;

const StyledRowsPerPageSelect = styled(MySelect)`
  color: inherit;

  .MuiSelect-select,
  .MuiSelect-outlined {
    background-color: transparent !important;
    padding: 0 !important;
    padding-right: 12px !important;
    ${(props) => props.theme.typography.body2}
  }
`;

const StyledFormControl = styled(FormControl)`
  .MuiInputBase-root {
    fieldset {
      border: none;
      border-width: 0;
    }
  }
  .MuiSelect-icon {
    position: absolute;
    right: -6px;
    /* margin: ${(props) => props.theme.spacing(0.5)}; */
  }
  &:hover {
    cursor: pointer;
  }
`;
