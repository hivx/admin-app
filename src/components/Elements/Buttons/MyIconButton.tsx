import { IconButton, IconButtonProps, styled } from '@mui/material';
import { forwardRef } from 'react';

import { globalStyles } from '@/providers/ThemeProvider';
import { CustomSizeField } from '@/types/CustomSizeFieldMui';
import { filterTransientProps } from '@/utils/filterTransientProps';

export type IMyIconButtonProps = Omit<IconButtonProps, 'size'> & {
  size?: IconButtonProps['size'] | CustomSizeField;
};
const StyledButton = styled(IconButton, filterTransientProps)<{
  $customSize: CustomSizeField;
}>`
  border-radius: ${(props) => props.theme.pacs?.layout.borderRadius};
  ${globalStyles.onMenuHover};
  padding: ${(props) => props.theme.spacing(0.75)};
  ${(props) => {
    switch (props.$customSize) {
      case 'extrasmall':
        return globalStyles.extraSmallButton;
    }
  }}
`;
export const MyIconButtonDefaults: IMyIconButtonProps = {};
/**
 * iTech themed Button from MUI
 */
export const MyIconButton = forwardRef<HTMLButtonElement, IMyIconButtonProps>(
  (props: IMyIconButtonProps, ref) => {
    const { size } = props;
    let muiSize: IconButtonProps['size'];
    let customSize: CustomSizeField;
    if (size === 'large' || size === 'medium' || size === 'small') muiSize = size;
    else {
      customSize = size;
    }
    return (
      <StyledButton
        {...MyIconButtonDefaults}
        {...props}
        size={muiSize}
        ref={ref}
        $customSize={customSize}
      >
        {props.children}
      </StyledButton>
    );
  },
);
MyIconButton.displayName = 'MuiIconButton';
