import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Modal } from '@mui/material';
import { useSnackbar, OptionsObject } from 'notistack';
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { LocalizedString } from 'typesafe-i18n';

import { MyButton } from '@/components';
import { NotificationModalContent } from '@/components/Elements/Modal/NotificationModalContent';
import { useDisclosure, useTranslate } from '@/hooks';
import { IModalNotification, ISnackbarNotification } from '@/types';
import { uuidv4 } from '@/utils/uuidv4';

type INotifySnackbar = (payload: ISnackbarNotification) => void;
type INotifyModal = (payload: IModalNotification) => void;

type NotificationProviderValues = {
  notifySnackbar: INotifySnackbar;
  notifyModal: INotifyModal;
};
const NotificationContext = createContext<NotificationProviderValues>({
  notifySnackbar: () => ({}),
  notifyModal: () => ({}),
});

/**
 * Use this outside of React Components
 */
export const NotificationController: NotificationProviderValues = {
  notifyModal: () => {},
  notifySnackbar: () => {},
};

/**
 * Provider for notification services
 * Must be placed as a child of SnackbarProvider
 */
export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modal, setModal] = useState<IModalNotification | undefined>();
  const { isOpen, open, close } = useDisclosure();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const SNACKBAR_DEFAULTS: OptionsObject = useMemo(
    () => ({
      variant: 'info',
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
      autoHideDuration: 3000,
      action: (id) => (
        <MyButton onClick={() => closeSnackbar(id)} color="inherit">
          <HighlightOffIcon />
        </MyButton>
      ),
    }),
    [closeSnackbar],
  );

  const notifySnackbar: INotifySnackbar = useCallback(
    (payload) => {
      enqueueSnackbar(payload.message, {
        id: uuidv4(),
        ...SNACKBAR_DEFAULTS,
        ...payload.options,
      });
    },
    [SNACKBAR_DEFAULTS, enqueueSnackbar],
  );

  const notifyModal: INotifyModal = useCallback(
    (payload) => {
      setModal(payload);
      if (payload) open();
    },
    [open],
  );

  NotificationController.notifyModal = notifyModal;
  NotificationController.notifySnackbar = notifySnackbar;

  const value = useMemo(
    () => ({ notifySnackbar, notifyModal }),
    [notifyModal, notifySnackbar],
  );

  return (
    <NotificationContext.Provider value={value}>
      {modal && (
        <Modal open={isOpen} onClose={close}>
          <NotificationModalContent {...modal} onClose={close} />
        </Modal>
      )}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifySnackbar = () => useContext(NotificationContext).notifySnackbar;
export const useNotifyModal = () => useContext(NotificationContext).notifyModal;

export const useGenericNotifySnackbar = (
  type: 'success' | 'error',
  resource?: string,
  customMessage?: string,
) => {
  const translate = useTranslate();
  let translateFunction: (arg0: { subject: string }) => string | LocalizedString;
  switch (type) {
    case 'success':
      translateFunction = translate.messages.result.genericSuccess;
      break;
    case 'error':
      translateFunction = translate.messages.result.genericUnsuccess;
      break;
  }

  const notify = useNotifySnackbar();
  return () =>
    notify({
      message: customMessage ?? translateFunction({ subject: resource || '' }),
      options: {
        variant: type,
      },
    });
};
