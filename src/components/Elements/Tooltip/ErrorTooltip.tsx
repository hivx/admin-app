import InfoIcon from '@mui/icons-material/Info';
import { Fade, Paper, Popper, Stack, styled, Typography } from '@mui/material';
import { FC, RefObject } from 'react';

import { useDisclosure } from '@/hooks';

type ErrorTooltipProps = {
  errorMessage?: string;
  fieldRef: RefObject<HTMLElement>;
};

const StyledTooltip = styled(Popper)`
  z-index: ${(props) => props.theme.zIndex.tooltip};
`;

const StyledTooltipContainer = styled(Paper)`
  color: ${(props) => props.theme.palette.error.main};
  border: 1px solid grey;
  background-color: ${(props) => props.theme.palette.background.default};
  padding: ${(props) => props.theme.spacing(0.5)};
  transform: translateY(-50%);
  box-shadow: ${(props) => props.theme.shadows[5]};
`;

const StyledTooltipText = styled(Typography)`
  font-size: 10px;
`;

const ERROR_TIME = 3000;

/**
 * iTech themed Error Tooltip
 */
export const ErrorTooltip: FC<ErrorTooltipProps> = (props) => {
  const { errorMessage, fieldRef } = props;
  const { isOpen, close } = useDisclosure(true);

  if (errorMessage && fieldRef.current && isOpen) {
    setTimeout(close, ERROR_TIME);
    return (
      <StyledTooltip open anchorEl={fieldRef.current} placement="bottom" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} unmountOnExit>
            <StyledTooltipContainer>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <InfoIcon color="inherit" fontSize="small" />
                <StyledTooltipText fontSize="small">{errorMessage}</StyledTooltipText>
              </Stack>
            </StyledTooltipContainer>
          </Fade>
        )}
      </StyledTooltip>
    );
  }
  return <></>;
};
