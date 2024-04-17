import { useTranslate } from '@/hooks';
import {
  useGenericNotifySnackbar,
  useNotifySnackbar,
} from '@/providers/NotificationProvider';

export const useNotifyReportActions = () => {
  const translate = useTranslate();
  const notifySnackbar = useNotifySnackbar();
  const notifyApproveSuccess = useGenericNotifySnackbar(
    'success',
    translate.pages.orderReport.actions.approve(),
  );
  const notifyApproveError = useGenericNotifySnackbar(
    'error',
    translate.pages.orderReport.actions.approve(),
  );

  const notifySaveDraftSuccess = useGenericNotifySnackbar(
    'success',
    translate.pages.orderReport.actions.saveDraft(),
  );
  const notifySaveDraftError = useGenericNotifySnackbar(
    'error',
    translate.pages.orderReport.actions.saveDraft(),
  );

  const notifyLockSuccess = useGenericNotifySnackbar(
    'success',
    translate.pages.orderReport.actions.lock(),
  );
  const notifyLockError = useGenericNotifySnackbar(
    'error',
    translate.pages.orderReport.actions.lock(),
  );

  const notifyDeleteLockSuccess = useGenericNotifySnackbar(
    'success',
    translate.pages.orderReport.actions.deleteLock(),
  );
  const notifyDeleteLockError = useGenericNotifySnackbar(
    'error',
    translate.pages.orderReport.actions.deleteLock(),
  );

  // ca đã được duyệt bởi BS khác
  const notifyApprovedByOtherError = (fullname: string) => {
    notifySnackbar({
      message: translate.messages.notification.orderAlreadyApproved({ name: fullname }),
      options: {
        variant: 'error',
      },
    });
  };

  // ca đã được khoá bởi BS khác
  const notifyLockedByOtherError = (fullname: string) => {
    notifySnackbar({
      message: translate.messages.notification.orderAlreadyLocked({ name: fullname }),
      options: {
        variant: 'error',
      },
    });
  };
  return {
    notifyApproveSuccess,
    notifyApproveError,
    notifySaveDraftSuccess,
    notifySaveDraftError,
    notifyLockSuccess,
    notifyLockError,
    notifyDeleteLockSuccess,
    notifyDeleteLockError,
    notifyApprovedByOtherError,
    notifyLockedByOtherError,
  };
};
