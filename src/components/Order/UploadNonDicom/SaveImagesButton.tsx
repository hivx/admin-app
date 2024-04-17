import React, { FC } from 'react';

import { useTranslate } from '@/hooks';
import { MediaData } from '@/hooks/order/useMediaRadiology';

import { useSaveImagesButton } from '../../../features/order/hooks/useSaveImagesButton';

import { StyledActionButton } from './UploadNonDicom';

export type SaveImagesButtonProps = {
  uploadFile: MediaData[];
  selectedImgIds: number[];
  handleUploadNonDicom: (files: File[]) => void;
};

/**
 * Save Image Button
 */
const SaveImagesButton: FC<SaveImagesButtonProps> = (props) => {
  const translate = useTranslate();
  const saveImages = useSaveImagesButton({ ...props });

  return (
    <StyledActionButton variant="outlined" onClick={saveImages}>
      {translate.pages.orderReport.media.saveImage()}
    </StyledActionButton>
  );
};

export default SaveImagesButton;
