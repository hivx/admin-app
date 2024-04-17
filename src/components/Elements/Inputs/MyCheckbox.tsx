import { Checkbox, CheckboxProps, css, styled } from '@mui/material';
import { forwardRef } from 'react';

import { filterTransientProps } from '@/utils/filterTransientProps';

export type IMyCheckboxProps = {
  compact?: boolean;
} & CheckboxProps;

const StyledCheckbox = styled(Checkbox, filterTransientProps)<{
  $compact?: IMyCheckboxProps['compact'];
}>`
  padding: ${(props) => props.theme.spacing(0.5)};
  svg {
    font-size: 20px;
  }

  ${(props) =>
    props.$compact &&
    css`
      padding: 0;
    `}
`;

export const MyCheckboxDefaults: IMyCheckboxProps = {
  color: 'primary',
  size: 'small',
};

export const MyCheckbox = forwardRef<HTMLButtonElement, IMyCheckboxProps>(
  (props: IMyCheckboxProps, ref) => {
    const { compact, ...CheckBoxProps } = props;
    return (
      <StyledCheckbox
        {...MyCheckboxDefaults}
        {...CheckBoxProps}
        $compact={compact}
        ref={ref}
      />
    );
  },
);

MyCheckbox.displayName = 'MuiCheckbox';
