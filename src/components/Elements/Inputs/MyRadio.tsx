import { RadioProps, css, Radio, styled } from '@mui/material';
import { forwardRef } from 'react';

import { filterTransientProps } from '@/utils/filterTransientProps';

export type IMyRadioProps = {
  compact?: boolean;
} & RadioProps;

const StyledRadio = styled(Radio, filterTransientProps)<{
  $compact?: IMyRadioProps['compact'];
}>`
  ${(props) =>
    props.$compact &&
    css`
      padding: 0;
    `}
`;

export const MyRadioDefaults: IMyRadioProps = {
  color: 'primary',
  size: 'small',
};

export const MyRadio = forwardRef<HTMLButtonElement, IMyRadioProps>(
  (props: IMyRadioProps, ref) => {
    const { compact, ...RadioProps } = props;
    return (
      <StyledRadio {...MyRadioDefaults} {...RadioProps} $compact={compact} ref={ref} />
    );
  },
);

MyRadio.displayName = 'MuiRadio';
