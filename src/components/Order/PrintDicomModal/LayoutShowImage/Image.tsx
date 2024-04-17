import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleIcon from '@mui/icons-material/Circle';
import { Box, styled } from '@mui/material';
import React, { FC } from 'react';

import DeleteIcon from '@/assets/icon/DeleteIcon';
import { MyIcon } from '@/components/Elements/Icons/MyIcon';
import { ImageDataState } from '@/hooks/useSelectDicomImage';

import { PrintImagePanelProps } from '../PrintImagePanel';

type ImageProps = {
  imageID: string;
  imageData: string;
  isSelected: boolean;
  onSelectImageCallback?: (imageID: string, selectedImages: ImageDataState[]) => void;
  onDelete?: (imageID: string) => void;
} & Partial<Pick<PrintImagePanelProps, 'onSelectImage'>>;

export const Image: FC<ImageProps> = (props) => {
  const {
    imageData,
    imageID,
    onSelectImage,
    isSelected,
    onSelectImageCallback,
    onDelete,
  } = props;

  return (
    <StyledImageContainer
      onClick={(e) => {
        onDelete && onDelete(imageID);
        onSelectImage && onSelectImage(e, imageID, imageData, onSelectImageCallback);
      }}
    >
      {!onDelete ? (
        <StyledIconCircleMain>
          {isSelected ? <StyledCheckCircleIcon /> : <StyledCircleIcon />}
        </StyledIconCircleMain>
      ) : (
        <StyledIconCircleMain>
          <DeleteIcon color="warning" />
        </StyledIconCircleMain>
      )}
      <img id={imageID.toString()} src={imageData} alt={`img-${imageID}`} width="100%" />
    </StyledImageContainer>
  );
};
const StyledIconCircleMain = styled(MyIcon)`
  position: absolute;
`;
const StyledCheckCircleIcon = styled(CheckCircleIcon)`
  color: ${(props) => props.theme.palette.primary.main};
`;
const StyledCircleIcon = styled(CircleIcon)`
  color: ${(props) => props.theme.palette.background.default};
`;

const StyledImageContainer = styled(Box)`
  position: relative;
  width: 100%;
`;
