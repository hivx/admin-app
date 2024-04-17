import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Box, useTheme } from '@mui/material';
import { Markup } from 'interweave';
import { forwardRef } from 'react';

import { ModalFooterLayout } from '@/components/Layout/ModalFooterLayout';
import { useTranslate } from '@/hooks';
import { IModalNotification, IModalNotificationOptions } from '@/types';

import CancelButton from '../Buttons/CancelButton';

import { StyledModalBodyText } from './ModalContent.styles';
import {
  StyledNotificationModalBody,
  StyledNotificationModalContent,
  StyledNotificationModalTitle,
  StyledConfirmButton,
} from './NotificationModalContent.styles';

type INotificationModalContentProps = {
  /**
   * Modal close function
   */
  onClose: () => void;
} & IModalNotification;

const getNotificationIcon = (variant: IModalNotificationOptions['variant']) => {
  switch (variant) {
    case 'error':
      return <ErrorIcon fontSize="large" />;
    case 'info':
      return <InfoIcon fontSize="large" />;
    case 'warning':
      return <WarningAmberIcon fontSize="large" />;
  }
};

/**
 * Modal contents for displaying notifications such as Info, Error messages
 */
export const NotificationModalContent = forwardRef<
  HTMLElement,
  INotificationModalContentProps
>((props, ref) => {
  const {
    message,
    options = { variant: 'info', hideOptionalButton: false },
    onClose,
  } = props;
  const { variant, onConfirm, onCancel, cancelLabel, confirmLabel } = options;
  const theme = useTheme();
  const translate = useTranslate();
  return (
    <StyledNotificationModalContent
      ref={ref}
      width="min(85dvw,500px)"
      height="300px"
      renderTitle={() => (
        <StyledNotificationModalTitle $variant={variant}>
          <Box
            p={theme.spacing(0, 1)}
            alignItems="center"
            justifyContent="center"
            display="flex"
          >
            {getNotificationIcon(variant)}
          </Box>
          {translate.messages.notification[variant]()}
        </StyledNotificationModalTitle>
      )}
      renderBody={() => (
        <StyledNotificationModalBody>
          <StyledModalBodyText>
            <Markup content={message} />
          </StyledModalBodyText>
        </StyledNotificationModalBody>
      )}
      renderFooter={() => (
        <Box p={2}>
          <ModalFooterLayout
            ActionButton={
              onConfirm && (
                <StyledConfirmButton
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  $variant={variant}
                >
                  {confirmLabel ?? translate.buttons.confirm()}
                </StyledConfirmButton>
              )
            }
            OptionalButtons={
              !options.hideOptionalButton
                ? [
                    <CancelButton
                      key=""
                      onClick={() => {
                        onCancel && onCancel();
                        onClose();
                      }}
                    >
                      {cancelLabel ??
                        (onConfirm
                          ? translate.buttons.cancel()
                          : translate.buttons.close())}
                    </CancelButton>,
                  ]
                : [<></>]
            }
          />
        </Box>
      )}
    />
  );
});

NotificationModalContent.displayName = 'NotificationModalContent';
