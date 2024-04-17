import { TooltipProps } from '@mui/material';
import { FC } from 'react';

import { MyTooltip } from '../Tooltip/MyTooltip';

import { IMyIconButtonProps, MyIconButton } from './MyIconButton';

type IconButtonWithToolTipProps = {
  title?: string;
  placement?: TooltipProps['placement'];
} & IMyIconButtonProps;
export const IconButtonWithToolTip: FC<IconButtonWithToolTipProps> = (props) => {
  const { title, placement, ...rest } = props;
  return (
    <MyTooltip title={title ?? ''} placement={placement ?? 'bottom'}>
      <span>
        <MyIconButton {...rest}>{props.children}</MyIconButton>
      </span>
    </MyTooltip>
  );
};
