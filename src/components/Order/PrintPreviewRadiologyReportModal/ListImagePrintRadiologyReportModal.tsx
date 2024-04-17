import { styled, Typography } from '@mui/material';
import React, { FC } from 'react';

import ImageList from '@/components/Order/PrintDicomModal/LayoutShowImage/ImageList';
import { useTranslate } from '@/hooks';
import { useSlowPrintRadiologyReport } from '@/hooks/printRadiologyReport/useSlowPrintRadiologyReport';
import { ImageDataState, useSelectDicomImage } from '@/hooks/useSelectDicomImage';

/**
 * - Show list image get from study
 */

type ListImagePrintRadiologyReportModalProps = {
  onSelectImageCallback?: (
    imageID: ImageDataState['id'],
    selectedImages: ImageDataState[],
  ) => void;
  currentTemplate: ReturnType<typeof useSlowPrintRadiologyReport>['currentTemplate'];
} & ReturnType<typeof useSelectDicomImage>;
const ListImagePrintRadiologyReportModal: FC<ListImagePrintRadiologyReportModalProps> = (
  props,
) => {
  const {
    selectedImages,
    selectedDicomImageIDs,
    onSelectImage,
    listImage,
    currentTemplate,
    onSelectImageCallback,
  } = props;
  const translate = useTranslate();
  return (
    <StyledListImagePrintRadiologyReport>
      <Typography variant="body2">
        {`${translate.resources.study.selectedImages()}: ${selectedImages.length}/${
          currentTemplate?.numOfImages ?? currentTemplate?.numOfImages
        }`}
      </Typography>
      <StyledImageList>
        <ImageList
          selectedDicomImageIDs={selectedDicomImageIDs}
          onSelectImage={onSelectImage}
          listImage={listImage}
          onSelectImageCallback={onSelectImageCallback}
        />
      </StyledImageList>
    </StyledListImagePrintRadiologyReport>
  );
};

export default ListImagePrintRadiologyReportModal;

const StyledListImagePrintRadiologyReport = styled('div')`
  width: 100%;
  overflow: hidden;
`;
const StyledImageList = styled('div')`
  width: 100%;
  overflow: auto;
  height: 100%;
  > div {
    width: 100%;
    align-items: center;
    overflow: auto;
    height: 100%;
  }
`;
