import {
  useDeleteListOrderFileMutation,
  useDeleteOrderFileMutation,
  useUploadListOrderFileMutation,
} from '@/api/orderFile';
import { useAppSelector, useTranslate } from '@/hooks';
import {
  useGenericNotifySnackbar,
  useNotifyModal,
} from '@/providers/NotificationProvider';
import { TABLE_ATTACHMENT } from '@/stores/table/tableInitialState';
import {
  selectCurrentSelectedRows,
  getCurrentSelectedRow,
} from '@/stores/table/tableSelectors';
import { IOrderDTO, IOrderFileDTO } from '@/types/dto';
import { MAX_FILE_SIZE_MB, validateMaxSizeFile } from '@/utils/fileUtils';

export const useUploadOrderFile = (orderID: IOrderDTO['id']) => {
  /**
   * use for upload file attachment to server
   * after user upload file
   */
  const [triggerUploadFile, { isLoading }] = useUploadListOrderFileMutation();
  const translate = useTranslate();

  const notifyUploadError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.uploadOrderFile(),
  );

  const notifyUploadErrorMaxSize = useGenericNotifySnackbar(
    'error',
    '',
    translate.messages.validation.exceedMaxFileSize({ maxSize: MAX_FILE_SIZE_MB }),
  );

  const notifyUploadSuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.uploadOrderFile(),
  );

  const handleUploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      return;
    }
    const isValidFiles = validateMaxSizeFile(files);
    if (!isValidFiles) {
      return notifyUploadErrorMaxSize();
    }
    try {
      const res = await triggerUploadFile({ orderID, files });
      if ('error' in res) {
        notifyUploadError();
      } else {
        notifyUploadSuccess();
      }
    } catch (e) {
      notifyUploadError();
    }
  };

  return {
    handleUploadFile,
    isLoading,
  };
};

export const useDeleteOrderFile = (orderID: IOrderDTO['id']) => {
  /**
   * use for delete file attachment in server
   */
  const [triggerDeleteMultiFile, { isLoading: isLoadingDeleteFiles }] =
    useDeleteListOrderFileMutation();
  const [triggerDeleteOneFile, { isLoading: isLoadingDeleteFile }] =
    useDeleteOrderFileMutation();

  const translate = useTranslate();

  // const orderID = useCurrentOrderID();
  const notifyModal = useNotifyModal();

  const rowsSelected = useAppSelector(
    selectCurrentSelectedRows<IOrderFileDTO[]>(TABLE_ATTACHMENT),
  );

  const notifyDeleteError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.report.attachment.title().toLowerCase(),
    }),
  );

  const notifyDeleteSuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.report.attachment.title().toLowerCase(),
    }),
  );

  /**
   * Xóa 1 tệp đính kèm
   */
  const handleDeleteOneFile = (orderFile: IOrderFileDTO) => {
    const fileID = orderFile?.id;
    if (fileID) {
      notifyModal({
        message: `${translate.messages.notification.deleteOrderFile()}`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            try {
              const res = triggerDeleteOneFile({ orderID, fileID });
              if ('error' in res) {
                notifyDeleteError();
              } else {
                notifyDeleteSuccess();
              }
            } catch (e) {
              notifyDeleteError();
            }
          },
        },
      });
    }
  };

  const handleDeleteFiles = () => {
    if (rowsSelected) {
      /**
       * swich to func delete one file
       */
      if (rowsSelected.length === 1) {
        handleDeleteOneFile(rowsSelected[0]);
        return;
      }
      notifyModal({
        message: `${translate.messages.notification.deleteOrderFiles()}`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            try {
              const fileIDs = rowsSelected.map((item) => item.id);
              const res = triggerDeleteMultiFile({ orderID, fileIDs });
              if ('error' in res) {
                notifyDeleteError();
              } else {
                notifyDeleteSuccess();
              }
            } catch (e) {
              notifyDeleteError();
            }
          },
        },
      });
    }
  };
  return {
    handleDeleteOneFile,
    handleDeleteFiles,
    isLoading: isLoadingDeleteFile || isLoadingDeleteFiles,
  };
};
