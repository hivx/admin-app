import { SnackbarOrigin, VariantType } from 'notistack';
import { LocalizedString } from 'typesafe-i18n';

export type IModalNotificationOptions = {
  // ModalProps?: ModalProps;
  variant: 'info' | 'error' | 'warning';
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  hideOptionalButton?: boolean;
};

export type IModalNotification = {
  message: string | LocalizedString;
  options?: IModalNotificationOptions;
};

export type ISnackbarNotification = {
  message: string | LocalizedString;
  options?: {
    variant: VariantType;
    autoHideDuration?: number;
    anchorOrigin?: SnackbarOrigin;
    persist?: boolean;
  };
};
