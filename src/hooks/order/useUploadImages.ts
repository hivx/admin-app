import { useCallback, useRef } from 'react';

import { MAX_IMAGE, MediaData } from '@/hooks/order/useMediaRadiology';
import { useNotifySnackbar } from '@/providers/NotificationProvider';
import { uuidv4 } from '@/utils/uuidv4';

import { useTranslate } from '../useTranslate';

export type OpenChooseImageButtonProps = {
  setUploadFile: React.Dispatch<React.SetStateAction<MediaData[]>>;
  handleUploadNonDicom: (files: File[]) => Promise<boolean>;
  numberOFImages: number;
};
export const useUploadImages = (arg: OpenChooseImageButtonProps) => {
  const { handleUploadNonDicom, setUploadFile, numberOFImages } = arg;
  const inputImageRef = useRef<HTMLInputElement>(null);
  const translate = useTranslate();
  const notify = useNotifySnackbar();
  // open popup for choose file image
  const handleOpenChooseImage = useCallback(() => {
    inputImageRef && inputImageRef.current && inputImageRef.current.click();
  }, [inputImageRef]);

  // handle up image
  const handleUpImage = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;

      /**
       * Create array temp type Media[]
       */
      const imageListData: MediaData[] = [];
      /**
       * Forearch image list
       */
      if (fileList && fileList.length > 0) {
        if (numberOFImages + fileList.length > MAX_IMAGE) {
          notify({
            message: translate.messages.notification.outOfImagesNumber(),
            options: {
              variant: 'warning',
            },
          });
          return;
        }

        for (let i = 0; i < fileList.length; i++) {
          /**
           * Create obj type MediaData
           */
          const imageData: MediaData = {
            id: uuidv4(),
            previewImage: fileList[i],
            uploadValue: fileList[i],
          };
          /**
           * Push obj(imageData) to array(imageListData)
           */
          imageListData.push(imageData);
        }
      }
      /**
       * Files using POST to API
       */
      const filesUpload = imageListData.map((data) => data.uploadValue);
      /**
       * If true, after upload images from user's computer will call  API uploadNonDicom
       */
      const isSuccess = await handleUploadNonDicom(filesUpload);
      if (isSuccess) {
        setUploadFile((preImageData) => [...imageListData, ...preImageData]);
      }
    },
    [
      handleUploadNonDicom,
      numberOFImages,
      notify,
      setUploadFile,
      translate.messages.notification,
    ],
  );

  return {
    inputImageRef,
    handleOpenChooseImage,
    handleUpImage,
  };
};
