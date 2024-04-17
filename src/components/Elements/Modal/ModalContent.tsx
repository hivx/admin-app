import {
  CircularProgress,
  DialogContent,
  Grid,
  Paper,
  styled,
  Typography,
} from '@mui/material';
import { ForwardedRef, forwardRef, ReactNode } from 'react';

import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { filterTransientProps } from '@/utils/filterTransientProps';

import { MyDivider } from '../DataDisplay';

type IModalContentProps = {
  /**
   * Forwarded Ref. Required for children of MUI Modal
   */
  ref?: ForwardedRef<HTMLElement>;
  /**
   * Width CSS Property
   */
  width?: string;
  /**
   * Height CSS Property
   */
  height?: string;
  /**
   * Title text, if provided, modal will render a basic title text in the center
   */
  title?: string;
  /**
   * If true, render a progress indicator instead
   */
  isLoading?: boolean;
  /**
   * Custom render function for title portion
   */
  renderTitle?: () => ReactNode;
  /**
   * Custom render function for body portion
   * @Required
   */
  renderBody: () => ReactNode;
  /**
   * Custom render function for footer portion
   */
  renderFooter?: () => ReactNode;
  /**
   * Receive className from StyledModalContent
   */
  className?: string;
};

const ModalContentBase = forwardRef<HTMLElement, IModalContentProps>((props, ref) => {
  const { renderTitle, renderBody, renderFooter, title, isLoading = false } = props;
  return (
    <DialogContent ref={ref} tabIndex={-1}>
      <Paper className={props.className} elevation={24}>
        {isLoading && (
          <LoadingOverlay>
            <CircularProgress />
          </LoadingOverlay>
        )}
        <StyledModalLayout
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          $isLoading={isLoading}
        >
          {(renderTitle || title) && (
            <Grid item xs={1} sx={{ width: '100%', height: '100%' }}>
              {title && (
                <StyledDivCenterChildren>
                  <Typography variant="h5">{title}</Typography>
                </StyledDivCenterChildren>
              )}
              {renderTitle && renderTitle()}
              <MyDivider />
            </Grid>
          )}
          <Grid
            item
            xs
            sx={{ width: '100%', height: '100%' }}
            container
            direction="column"
          >
            {renderBody()}
          </Grid>
          {renderFooter && (
            <Grid item xs={1} sx={{ width: '100%', height: '100%' }}>
              <MyDivider />
              {renderFooter()}
            </Grid>
          )}
        </StyledModalLayout>
      </Paper>
    </DialogContent>
  );
});
ModalContentBase.displayName = 'ModalContent';

/**
 * Modal shell containing Title, Body, and Footer
 * This component must be a child of Modal component
 */
export const ModalContent = styled(ModalContentBase)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => (props.width ? props.width : 'fit-content')};
  height: ${(props) => (props.height ? props.height : 'fit-content')};
`;

/**
 * Styles
 */

const LoadingOverlay = styled('div')`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const StyledModalLayout = styled(Grid, filterTransientProps)<{ $isLoading: boolean }>`
  width: 100%;
  height: 100%;
  filter: ${(props) => props.$isLoading && 'blur(5px)'};
`;
