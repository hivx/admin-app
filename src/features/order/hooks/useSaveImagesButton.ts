import { useCallback } from 'react';

import { SaveImagesButtonProps } from '../../../components/Order/UploadNonDicom/SaveImagesButton';

export const useSaveImagesButton = (arg: SaveImagesButtonProps) => {
  const { uploadFile, selectedImgIds, handleUploadNonDicom } = arg;
  /**
   * Save button on click will call Api uploadNonDicom
   */
  const saveImages = useCallback(() => {
    /**
     * get data prepare fo call APi filter selected image
     */
    const imagesToUpload = uploadFile
      .filter((file, index) => selectedImgIds.includes(index))
      .map((item) => item.uploadValue);

    /**
     * Call Api uploadNonDicom
     */
    if (imagesToUpload && imagesToUpload.length > 0) {
      handleUploadNonDicom(imagesToUpload);
    }
  }, [handleUploadNonDicom, selectedImgIds, uploadFile]);
  return saveImages;
};
