import { useCallback, useEffect, useState } from 'react';
import { PixelCrop } from 'react-image-crop';

import { useGetDicomImageByOrderIDQuery } from '@/api/dicomImage';
import { useUploadNonDicomMutation } from '@/api/nonDicom';
import { useCurrentOrderID } from '@/features/order';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import {
  getCropSize,
  getVideoConstraints,
  selectApprovedModalityID,
  selectCurrentRequestID,
  selectToggleCreateNewSeries,
  setCropSize,
} from '@/stores/OrderRadiology';
import { BaseEntity } from '@/types';
import { urltoFile } from '@/utils/fileUtils';

/**
 * Data using for image va video
 */
export type MediaData = {
  id: string;
  previewImage: Blob;
  uploadValue: File;
};

export const MAX_IMAGE = 36;

const VIDEO = 'webcam-non-dicom';
/**
 *
 * Hook
 * @returns
 */
const useMediaRadiology = () => {
  const dispatch = useAppDispatch();
  const translate = useTranslate();

  /**
   * Get data from redux
   */
  const orderID = useCurrentOrderID();

  const {
    isFetching: isFetchingGetImage,
    data,
    refetch: refetchGetImage,
  } = useGetDicomImageByOrderIDQuery({
    id: orderID,
  });
  const images = data?.list;

  useEffect(() => {
    // danh sách file upload mặc định hiển thị theo ảnh lấy đc từ order
    const initalMediaData = async () => {
      const listImage: MediaData[] = [];
      if (images && images.length !== 0) {
        for (let index = 0; index < images.length; index++) {
          const file = await urltoFile(images[index], `image${index}`);
          const element = {
            id: index.toString(),
            previewImage: file,
            uploadValue: file,
          };
          listImage.push(element);
        }
        setUploadFile(listImage);
      }
    };
    initalMediaData();
  }, [images]);

  const cropSize = useAppSelector(getCropSize);
  const videoConstraints = useAppSelector(getVideoConstraints);
  const requestID = useAppSelector(selectCurrentRequestID(orderID));
  const approvedModalityID = useAppSelector(
    selectApprovedModalityID({ orderID, requestID }),
  );
  const isCreateNewSeries = useAppSelector(selectToggleCreateNewSeries);
  const [uploadNonDicom] = useUploadNonDicomMutation();

  const [selectedImgIds, setSelectedImgIds] = useState<BaseEntity['id'][]>([]);
  const [viewMode, setViewMode] = useState<boolean>(false); // status of main frame for view image
  /**
   * State files preview and upload
   */
  const [uploadFile, setUploadFile] = useState<MediaData[]>([]);

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.uploadNonDicom(),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.uploadNonDicom(),
  );
  const handleUploadNonDicom = useCallback(
    async (files: File[]) => {
      if (approvedModalityID) {
        try {
          const res = await uploadNonDicom({
            orderID,
            modalityID: approvedModalityID,
            newSeries: isCreateNewSeries,
            files,
          });
          if ('error' in res) {
            notifyError();
            return false;
          } else {
            notifySuccess();
            return true;
          }
        } catch (e) {
          notifyError();
          return false;
        }
      }
      return false;
    },
    [
      approvedModalityID,
      isCreateNewSeries,
      notifyError,
      notifySuccess,
      orderID,
      uploadNonDicom,
    ],
  );

  const onCropSizeChange = useCallback(
    (crop: PixelCrop) => {
      const { width, height } = crop;
      if (width > 50 && height > 50) {
        dispatch(setCropSize({ ...crop }));
      }
    },
    [dispatch],
  );

  const onUserMedia = useCallback(
    (stream: MediaStream) => {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          devices.forEach((device) => {
            undefined;
          });
        })
        .catch((err) => {
          undefined;
        });
      const video = document.getElementById(VIDEO);
      if (video && video instanceof HTMLVideoElement) {
        video.addEventListener(
          'loadedmetadata',
          () => {
            const initCropSize = cropSize ?? {
              x: 0,
              y: 0,
              width: video.videoWidth,
              height: video.videoHeight,
            };
            dispatch(setCropSize({ ...initCropSize }));
          },
          true,
        );
      }
    },
    [cropSize, dispatch],
  );

  /**
   * Paste image to view main nondicom
   **/

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const clipboardData = event.clipboardData;
    if (!clipboardData) return;

    const items = clipboardData.items as DataTransferItemList;

    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file) {
          const imageData: MediaData = {
            id: file.name,
            previewImage: file,
            uploadValue: file,
          };
          setUploadFile((preMediaData) => [imageData, ...preMediaData]);
          handleUploadNonDicom([imageData.uploadValue]);
        }
      }
    }
  };

  return {
    uploadFile,
    selectedImgIds,
    isCreateNewSeries,
    videoConstraints,
    cropSize,
    viewMode,
    setViewMode,
    setSelectedImgIds,
    // setCropSize,
    setUploadFile,
    handleUploadNonDicom,
    onCropSizeChange,
    onUserMedia,
    handlePaste,
  };
};

export default useMediaRadiology;
