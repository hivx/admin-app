import { ClassNames } from '@emotion/react';
import { styled, Select, SelectProps, useTheme } from '@mui/material';
import { ForwardedRef, forwardRef, ForwardRefRenderFunction, RefObject } from 'react';

import { globalStyles } from '@/providers/ThemeProvider';
import { CustomSizeField } from '@/types/CustomSizeFieldMui';
import { filterTransientProps } from '@/utils/filterTransientProps';

export type IMySelectProps<T> = Omit<SelectProps<T>, 'size'> & {
  ref?: ForwardedRef<HTMLElement>;
  size?: SelectProps['size'] | CustomSizeField;
};
const StyledSelect = styled('div', filterTransientProps)<{
  $customSize: CustomSizeField;
}>`
  .MuiInputBase-root {
    &:hover {
      & > .MuiOutlinedInput-notchedOutline {
        border-color: ${(props) =>
          props.theme.pacs?.customColors.notchedOutlineInputColor};
      }
      & > .MuiSvgIcon-root {
        color: ${(props) => props.theme.palette.primary.main};
      }
    }
  }
  .MuiSelect-select {
    background-color: ${(props) => props.theme.palette.background.default};
  }
  .MuiSelect-select.Mui-disabled {
    background-color: ${(props) =>
      props.theme?.pacs?.customColors.fieldDisabledBackground};
    -webkit-text-fill-color: ${(props) => props.theme.palette.text.primary};
  }

  /* .MuiSelect-select {
   
  } */
  ${(props) => {
    switch (props.$customSize) {
      case 'extrasmall':
        return globalStyles.extraSmallSelectField;
    }
  }}
`;

const MySelectFn = (<T,>(props: IMySelectProps<T>, ref: RefObject<HTMLDivElement>) => {
  const theme = useTheme();
  const { size } = props;
  let muiSize: SelectProps['size'];
  let customSize: CustomSizeField;
  if (size === 'medium' || size === 'small') muiSize = size;
  else {
    customSize = size;
  }
  return (
    <StyledSelect ref={ref} $customSize={customSize}>
      <ClassNames>
        {({ css }) => (
          <Select
            MenuProps={{
              PopoverClasses: {
                paper: css({ background: theme.palette.background.default }),
              },
            }}
            {...props}
            size={muiSize}
          />
        )}
      </ClassNames>
    </StyledSelect>
  );
}) as ForwardRefRenderFunction<HTMLElement, IMySelectProps<unknown>>;

export const MySelect = forwardRef(MySelectFn) as <T>(
  props: IMySelectProps<T>,
) => ReturnType<typeof MySelectFn>;

MySelectFn.displayName = 'MuiSelect';
