import { useCallback, useState } from 'react';

import { useGetDicomImageByOrderIDQuery } from '@/api/dicomImage';
import { useTranslate } from '@/hooks';
import { base64toURI } from '@/lib/dataHelper/base64FileHelper';
import { useNotifySnackbar } from '@/providers/NotificationProvider';
import { IOrderDTO } from '@/types/dto';

export type ImageDataState = {
  id: string;
  /**
   * base64
   */
  data: string;
};
export type OnSelectImage = (
  e: React.MouseEvent<HTMLDivElement>,
  imageID: ImageDataState['id'],
  image: string,
  onSelectImageCallback?: (
    imageID: ImageDataState['id'],
    selectedImages: ImageDataState[],
  ) => void,
) => void;

/**
 * All logic to get images from API,pick/unpick images
 * @param orderId orderID to get imaages
 * @param totalNumberOfImages total number of images from layout
 */
export const useSelectDicomImage = (
  orderId: IOrderDTO['id'],
  totalNumberOfImages?: number,
) => {
  const [selectedImages, setSelectedImages] = useState<ImageDataState[]>([]);
  const selectedDicomImageIDs = selectedImages.map((item) => item.id);
  const numberImageSelected = selectedDicomImageIDs.length;
  const notify = useNotifySnackbar();
  const translate = useTranslate();

  /**
   * allow select image if number of selected image < totalNumberOfImages in layout
   */

  const allowSelectedImages = totalNumberOfImages
    ? numberImageSelected < totalNumberOfImages
    : true;
  /**
   * get list image data
   */
  const {
    isFetching: isFetchingGetImage,
    data,
    refetch: refetchGetImage,
  } = useGetDicomImageByOrderIDQuery(
    {
      id: orderId,
    },
    { skip: !orderId },
  );
  const listImage: ImageDataState[] = data?.list
    ? data.list.map((item, index) => {
        return { id: index.toString(), data: base64toURI(item) };
      })
    : [];

  /**
   * Pick or un pick image
   */
  const onSelectImage: OnSelectImage = useCallback(
    (e, imageID, image, onSelectImageCallback) => {
      const isCurentImageSelected = selectedImages
        .map((item) => item.id)
        .includes(imageID);
      let tempSelectedImages: ImageDataState[] = selectedImages;
      setSelectedImages((state) => {
        if (isCurentImageSelected) {
          tempSelectedImages = state.filter((image) => image.id !== imageID);
          onSelectImageCallback && onSelectImageCallback(imageID, tempSelectedImages);
          return tempSelectedImages;
        } else if (allowSelectedImages) {
          tempSelectedImages = [...state, { id: imageID, data: image }];
          onSelectImageCallback && onSelectImageCallback(imageID, tempSelectedImages);
          return tempSelectedImages;
        } else {
          notify({
            message: translate.messages.notification.outOfImagesNumber(),
            options: {
              variant: 'warning',
            },
          });
        }
        tempSelectedImages = state;
        onSelectImageCallback && onSelectImageCallback(imageID, tempSelectedImages);
        return tempSelectedImages;
      });
    },
    [allowSelectedImages, notify, selectedImages, translate.messages.notification],
  );
  const unSelectAllImages = () => {
    setSelectedImages([]);
  };

  return {
    isFetchingGetImage,
    listImage,
    onSelectImage,
    selectedImages,
    selectedDicomImageIDs,
    refetchGetImage,
    unSelectAllImages,
  };
};
