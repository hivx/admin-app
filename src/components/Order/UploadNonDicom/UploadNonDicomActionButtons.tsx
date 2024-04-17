import { Box, FormControlLabel, Stack, styled } from '@mui/material';
import React, { FC } from 'react';

import { MyCheckbox } from '@/components';
import { useTranslate } from '@/hooks';

import ConfigUploadNonDicomMain from '../../../features/order/components/RadiologyReport/Panel/ConfigUploadNonDicomMain';

import { StyledActionButton } from './UploadNonDicom';

type UploadNonDicomActionButtonsProps = {
  /**
   * If true: 'Chụp ảnh (Space)' button will **hidden** and **show** 'Bắt đầu chụp'
   * If false: 'Chụp ảnh (Space)' button will **show** and **hidden** 'Bắt đầu chụp'
   */
  viewMode: boolean;

  /**
   * True: After take picture, upload image or video will automatic call API uploadNonDicom
   * False: Manual
   */
  isAutoSave: boolean;

  /**
   * This control state true/false of **isAutoSave**
   */
  handleAutoSave: () => void;

  /**
   * True: From BE will create a new series for file/ files upload
   */
  isCreateNewSeries: boolean;

  /**
   * This control state true/false **isCreateNewSeries**
   */
  handleCreateNewSeries: () => void;

  /**
   * Call APi uploadNonDicom upload files selected
   */
  saveImages: () => void;

  /**
   * This action will set state of viewMode = false
   */
  startShooting: () => void;

  /**
   * Take image inside crop sreen
   */
  handleTakePicture: () => void;

  /**
   * Trigger hidden input upload file user's device
   */
  handleOpenChooseImage: () => void;

  /**
   * Upload image files selected from user's device to app
   */
  handleUpImage: (event: React.ChangeEvent<HTMLInputElement>) => void;

  inputImageRef: React.RefObject<HTMLInputElement>;

  /**
   * Trigger hidden input upload file user's device
   */
  handleOpenChooseFile: () => void;

  /**
   * Upload video selected from user's device to app
   */
  handleUpVideo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputVideoRef: React.RefObject<HTMLInputElement>;
};

const UploadNonDicomActionButtons: FC<UploadNonDicomActionButtonsProps> = (props) => {
  const {
    viewMode,
    startShooting,
    handleTakePicture,
    isAutoSave,
    handleAutoSave,
    isCreateNewSeries,
    handleCreateNewSeries,
    saveImages,
    handleOpenChooseImage,
    handleUpImage,
    inputImageRef,
    handleOpenChooseFile,
    handleUpVideo,
    inputVideoRef,
  } = props;
  const translate = useTranslate();
  return (
    <StyledButtonsAction>
      {/**
       * Group button left side
       */}
      <StyledButtonsActionLeftSide>
        {viewMode ? (
          <StyledActionButton variant="outlined" onClick={startShooting}>
            {translate.pages.orderReport.media.startShooting()}
          </StyledActionButton>
        ) : (
          <StyledActionButton variant="outlined" onClick={handleTakePicture}>
            {translate.pages.orderReport.media.takePicture()}
          </StyledActionButton>
        )}
        <StyledCheckBoxGroup spacing={0.5} direction="row">
          <FormControlLabel
            control={<MyCheckbox checked={isAutoSave} onChange={handleAutoSave} />}
            label={translate.pages.orderReport.media.autoSaveImage()}
          />
          <FormControlLabel
            control={
              <MyCheckbox checked={isCreateNewSeries} onChange={handleCreateNewSeries} />
            }
            label={translate.pages.orderReport.media.createNewSeries()}
          />
        </StyledCheckBoxGroup>
      </StyledButtonsActionLeftSide>
      {/**
       * Group button right side
       */}
      <StyledButtonsActionRightSide>
        <StyledActionButton variant="outlined" onClick={saveImages}>
          {translate.pages.orderReport.media.saveImage()}
        </StyledActionButton>
        <StyledActionButton variant="outlined" onClick={() => {}} disabled>
          {translate.pages.orderReport.media.attachedImages()}
        </StyledActionButton>
        <StyledActionButton variant="outlined" onClick={handleOpenChooseImage}>
          {translate.pages.orderReport.media.uploadImage()}
        </StyledActionButton>
        <input
          type="file"
          hidden
          ref={inputImageRef}
          onChange={handleUpImage}
          accept=".jpeg, .jpg, .png"
          multiple
        />
        <StyledActionButton variant="outlined" onClick={handleOpenChooseFile}>
          {translate.pages.orderReport.media.uploadVideo()}
        </StyledActionButton>
        <input
          type="file"
          hidden
          ref={inputVideoRef}
          onChange={handleUpVideo}
          accept=".mp4, .mpeg"
        />
        <ConfigUploadNonDicomMain />
      </StyledButtonsActionRightSide>
    </StyledButtonsAction>
  );
};

export default UploadNonDicomActionButtons;

/**
 * Styles
 */

const StyledButtonsAction = styled('div')`
  display: grid;
  grid-template-columns: minmax(200px, 1fr) auto;
  grid-template-rows: 1fr;
  align-items: center;
`;

const StyledButtonsActionLeftSide = styled('div')`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: ${(props) => props.theme.spacing(2)};
  justify-content: left;
  align-items: center;
`;

const StyledButtonsActionRightSide = styled('div')`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-column-gap: ${(props) => props.theme.spacing(2)};
  align-items: center;
`;

const StyledCheckBoxGroup = styled(Stack)`
  .MuiFormControlLabel-root {
    .MuiCheckbox-root,
    .MuiFormControlLabel-label {
      color: ${(props) => props.theme.palette.background.default};
    }
  }
`;
