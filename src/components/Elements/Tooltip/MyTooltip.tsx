import { Fade, styled, Tooltip, TooltipProps } from '@mui/material';

export type IMyTooltipProps = TooltipProps;

const StyledTooltip = styled(Tooltip)``;

/**
 * iTech themed Tooltip from MUI
 */
export const MyTooltip = (props: IMyTooltipProps) => {
  return (
    <StyledTooltip {...props} arrow TransitionComponent={Fade}>
      {props.children}
    </StyledTooltip>
  );
};
