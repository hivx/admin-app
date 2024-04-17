import React, { FC } from 'react';
import Webcam from 'react-webcam';

import { useTranslate } from '@/hooks';
import { MediaData } from '@/hooks/order/useMediaRadiology';

import { useTakePictureNonDicom } from '../../../features/order/hooks/useTakePictureNonDicom';

import { StyledActionButton } from './UploadNonDicom';

type PrimaryButtonProps = {
  viewMode: boolean;
  setViewMode: React.Dispatch<React.SetStateAction<boolean>>;
  webcamRef: React.RefObject<Webcam>;
  handleUploadNonDicom: (files: File[]) => void;
  setUploadFile: React.Dispatch<React.SetStateAction<MediaData[]>>;
};

const PrimaryButton: FC<PrimaryButtonProps> = (props) => {
  const translate = useTranslate();

  const { handleTakePicture, startShooting } = useTakePictureNonDicom({ ...props });

  return props.viewMode ? (
    <StyledActionButton variant="outlined" onClick={startShooting}>
      {translate.pages.orderReport.media.startShooting()}
    </StyledActionButton>
  ) : (
    <StyledActionButton variant="outlined" onClick={handleTakePicture}>
      {translate.pages.orderReport.media.takePicture()}
    </StyledActionButton>
  );
};

export default PrimaryButton;
