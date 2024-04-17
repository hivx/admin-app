import {
  CircularProgress,
  colors,
  Skeleton,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { ReactNode } from 'react';

import { useTranslate } from '@/hooks/useTranslate';

const StyledContainer = styled(Stack)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StyledText = styled(Typography)`
  font-weight: 400;
  font-size: 1em;
  /* color: ${colors.grey[700]}; */
  z-index: 1;
  /* transform: translateY(200%); */
`;

const StyledCircularProgress = styled(CircularProgress)`
  /* position: absolute; */
`;

interface FullPageSpinnerProps {
  /**
   * Display text with the spinner
   */
  text?: string;
  /**
   * Custom display text as another component, will replace `text`
   */
  render?: () => ReactNode;
}

export const FullPageSpinner = (props: FullPageSpinnerProps) => {
  const translate = useTranslate();
  const { text = translate.messages.loading(), render } = props;
  return (
    <StyledContainer spacing={1}>
      <Skeleton
        sx={{
          backgroundColor: 'transparent',
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          transform: 'none',
        }}
        animation="wave"
      />
      <StyledCircularProgress />
      {render ? render() : <StyledText>{text}</StyledText>}
    </StyledContainer>
  );
};
