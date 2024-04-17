import {
  useGetOneOrderFileDataQuery,
  useLazyGetOneOrderFileDataQuery,
} from '@/api/orderFile';
import { useTranslate } from '@/hooks';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IOrderFileDTO } from '@/types/dto';
import { checkFileCanPreview, downloadFileFromBlob } from '@/utils/fileUtils';

export const usePreviewAttachment = (filePreview: IOrderFileDTO) => {
  // use for preview file attachment
  const { orderID, id, size, contentType, originalName } = filePreview || {};
  const translate = useTranslate();
  const canPreviewFile = checkFileCanPreview(size, contentType);
  const {
    data: fileData,
    isFetching,
    isSuccess,
  } = useGetOneOrderFileDataQuery(
    { fileID: id, orderID, contentType },
    { skip: !canPreviewFile },
  );
  const [triggerGetFileData, { isLoading }] = useLazyGetOneOrderFileDataQuery();
  const filePreviewUrl = fileData && URL.createObjectURL(fileData);
  const notifyDownloadError = useGenericNotifySnackbar(
    'error',
    translate.buttons.download(),
  );

  const handleDownloadFile = async () => {
    if (fileData) {
      // if pre-fetched, just download
      return downloadFileFromBlob(fileData, originalName);
    }
    // if not, get data from server and then download file
    try {
      const data = await triggerGetFileData({ fileID: id, orderID, contentType });
      if (data.data) {
        downloadFileFromBlob(data.data, originalName);
      }
    } catch (e) {
      notifyDownloadError();
    }
  };

  return {
    fileData,
    filePreviewUrl,
    initFile: isSuccess,
    handleDownloadFile,
    isLoading: isFetching || isLoading,
  };
};
