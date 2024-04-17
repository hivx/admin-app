import { useCallback } from 'react';
import Webcam from 'react-webcam';

import { HOTKEYS } from '@/config';
import { useAppSelector, useKeybinds } from '@/hooks';
import { MediaData } from '@/hooks/order/useMediaRadiology';
import { uuidv4 } from '@/utils/uuidv4';

import { getCropSize } from '../../../stores/OrderRadiology';

type useTakePictureNonDicomProps = {
  viewMode: boolean;
  setViewMode: React.Dispatch<React.SetStateAction<boolean>>;
  webcamRef: React.RefObject<Webcam>;
  handleUploadNonDicom: (files: File[]) => void;
  setUploadFile: React.Dispatch<React.SetStateAction<MediaData[]>>;
};

const IMAGE_VIEW_CANVAS = 'image-main-view';

export const useTakePictureNonDicom = (agr: useTakePictureNonDicomProps) => {
  const { setViewMode, webcamRef, handleUploadNonDicom, setUploadFile } = agr;
  const cropSize = useAppSelector(getCropSize);

  // change state of view mode to take picture
  const startShooting = useCallback(() => {
    setViewMode(false);
  }, [setViewMode]);

  /**
   * Take picture and upload to server
   */
  const handleTakePicture = useCallback(async () => {
    const imageSrc = webcamRef?.current?.getScreenshot(); // imageSrc is dataURI
    if (!imageSrc) {
      //   notify('page.study.notification.createStudy.captureFail', 'warning');
    } else {
      // xoa viewport
      const imageViewCanvas = document.getElementById(IMAGE_VIEW_CANVAS);
      if (imageViewCanvas && imageViewCanvas instanceof HTMLCanvasElement) {
        const imageViewCtx = imageViewCanvas.getContext('2d');
        if (imageViewCtx) {
          imageViewCtx.save();
          imageViewCtx.resetTransform();
          imageViewCtx.clearRect(0, 0, imageViewCanvas.width, imageViewCanvas.height);

          const image = new Image();
          image.src = imageSrc;

          // cau hinh canvas ao de ve hinh dung kich thuoc
          const imageCanvas = document.createElement('canvas');
          const imageCtx = imageCanvas.getContext('2d');
          imageCanvas.width = cropSize.width;
          imageCanvas.height = cropSize.height;

          image.onload = async () => {
            imageCtx?.drawImage(
              image,
              cropSize.x,
              cropSize.y,
              cropSize.width,
              cropSize.height,
              0,
              0,
              cropSize.width,
              cropSize.height,
            );
            imageViewCtx.drawImage(
              imageCanvas,
              (imageViewCanvas.width - cropSize.width) / 2,
              (imageViewCanvas.height - cropSize.height) / 2,
            );
            imageViewCtx.restore();
            // base64ToBlob(imageCanvas.toDataURL(), 'image/jpeg');
            const imageConvert: Blob = await new Promise((resolve) => {
              imageCanvas.toBlob(
                (blob) => {
                  blob && resolve(blob);
                },
                'image/jpeg',
                1,
              );
            });
            const convertImageBlobToFile = new File([imageConvert], uuidv4(), {
              type: 'image/jpeg',
            });
            handleUploadNonDicom([convertImageBlobToFile]);
            const imageData: MediaData = {
              id: convertImageBlobToFile.name,
              previewImage: imageConvert,
              uploadValue: convertImageBlobToFile,
            };
            setUploadFile((preMediaData) => [imageData, ...preMediaData]);
          };
        }
      }
    }
  }, [
    webcamRef,
    cropSize.width,
    cropSize.height,
    cropSize.x,
    cropSize.y,
    setUploadFile,
    handleUploadNonDicom,
  ]);

  /**
   * Take picture key shortcut
   */
  useKeybinds(HOTKEYS.TAKE_PICTURE_ACTION.key, () => {
    handleTakePicture();
  });

  return { handleTakePicture, startShooting };
};
