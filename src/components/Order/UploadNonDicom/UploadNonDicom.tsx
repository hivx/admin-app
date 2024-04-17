import { Divider, darken, styled } from '@mui/material';
import React, { useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import { useMeasure } from 'react-use';
import Webcam from 'react-webcam';

import 'react-image-crop/dist/ReactCrop.css';
import { MyButton } from '@/components';
import { useTranslate } from '@/hooks';
import useMediaRadiology, { MAX_IMAGE } from '@/hooks/order/useMediaRadiology';

import ConfigUploadNonDicomMain from '../../../features/order/components/RadiologyReport/Panel/ConfigUploadNonDicomMain';

import { CopyImageButton } from './CopyImageButton';
import CreateNewSeriesCheckBox from './CreateNewSeriesCheckBox';
import ImageListShell from './ImageListMain';
import { ImageSeries } from './ImageSeries';
import OpenChooseFileUpload from './OpenChooseFileUpload';
import PrimaryButton from './PrimaryButton';
const UploadNonDicom = () => {
  const translate = useTranslate();
  const webcamRef = useRef<Webcam>(null);
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();
  const [currentImage, setCurrentImage] = useState<string>('');
  const {
    cropSize,
    onCropSizeChange,
    onUserMedia,
    setSelectedImgIds,
    selectedImgIds,
    viewMode,
    setViewMode,
    setUploadFile,
    handleUploadNonDicom,
    handlePaste,
    uploadFile,
    videoConstraints,
  } = useMediaRadiology();
  const imageListPreview = uploadFile.map((item) => item.previewImage);

  return (
    <StyledCreateMixedNonDicomContainer>
      <StyledMainFrame>
        {/* main frame */}
        <StyledImageMainView>
          <div
            ref={ref}
            style={{
              display: 'grid',
              justifyContent: 'center',
              minHeight: '300px',
              maxHeight: '100vh',
              alignItems: 'center',
              maxWidth: '100%',
              background: 'black',
            }}
          >
            <canvas
              id="image-main-view"
              className={`cornerstone-canvas`}
              height={height}
              width={width}
              style={{ display: `${viewMode ? '' : 'none'}`, maxWidth: '100%' }}
            />
            <ReactCrop
              crop={cropSize}
              onChange={onCropSizeChange}
              ruleOfThirds
              minWidth={50}
              minHeight={50}
              style={{ display: `${viewMode ? 'none' : ''}` }}
            >
              <Webcam
                id="webcam-non-dicom"
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                screenshotQuality={1}
                onUserMedia={onUserMedia}
                videoConstraints={videoConstraints}
              />
            </ReactCrop>
          </div>
          {/**
           * Action Buttons
           */}
          <StyledBottomComponent>
            {/**
             * Group check box
             */}

            <StyledButtonsAction>
              {/**
               * Group button left side
               */}
              <StyledButtonsActionLeftSide>
                {/**
                 * Take picture button
                 */}
                <PrimaryButton
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  webcamRef={webcamRef}
                  handleUploadNonDicom={handleUploadNonDicom}
                  setUploadFile={setUploadFile}
                />
                <CreateNewSeriesCheckBox />
              </StyledButtonsActionLeftSide>
              {/**
               * Group button right side
               */}
              <StyledButtonsActionRightSide>
                {/**
                 * Copy ảnh ra kết quả
                 */}
                <CopyImageButton
                  selectedImgIds={selectedImgIds}
                  uploadFile={uploadFile}
                />
                {/**
                 * Open choose video file
                 */}
                <OpenChooseFileUpload
                  setUploadFile={setUploadFile}
                  handleUploadNonDicom={handleUploadNonDicom}
                  numberOFImages={uploadFile.length}
                />
                <ConfigUploadNonDicomMain />
              </StyledButtonsActionRightSide>
            </StyledButtonsAction>
            <Divider />
          </StyledBottomComponent>

          <ImageListShell
            title={`${translate.pages.orderReport.media.imageList()} (${
              uploadFile.length
            }/${MAX_IMAGE})`}
            handlePaste={handlePaste}
            ImageListComponent={
              <ImageSeries
                images={imageListPreview}
                selectedImgIds={selectedImgIds}
                setSelectedImgIds={setSelectedImgIds}
                currentImage={currentImage}
                setCurrentImage={setCurrentImage}
                setViewMode={setViewMode}
              />
            }
          />
        </StyledImageMainView>
        {/* series image thumbs */}
      </StyledMainFrame>
    </StyledCreateMixedNonDicomContainer>
  );
};

export default UploadNonDicom;

/**
 * Styles
 */
const StyledMainFrame = styled('div')`
  display: grid;
  grid-template-rows: 1fr;
`;

const StyledCreateMixedNonDicomContainer = styled('div')`
  display: grid;
  grid-template-rows: minmax(200px, 1fr) auto;
  height: 100%;
`;

const StyledImageMainView = styled('div')`
  display: grid;
  grid-template-rows: 1fr 0.1fr 0.9fr;
  min-height: 200px;
  max-width: 100%;
  max-height: 100vh;
  border-right: 2px solid ${(props) => props.theme.palette.background.paper};
  overflow: hidden;
`;

export const StyledActionButton = styled(MyButton)`
  text-transform: uppercase;
  background-color: ${(props) => props.theme.palette.background.paper};
  grid-template-columns: 100%;
  padding: ${(props) => props.theme.spacing(0.5)} ${(props) => props.theme.spacing(1)};
  &:hover {
    background-color: ${(props) => darken(props.theme.palette.background.paper, 0.1)};
  }
`;

const StyledButtonsAction = styled('div')`
  display: grid;
  grid-template-columns: 1fr 0.25fr;
  overflow: auto;
  gap: ${(props) => props.theme.spacing(1)};
  justify-content: space-between;
  align-items: center;
  padding: 0 ${(props) => props.theme.spacing(1)};
`;

const StyledButtonsActionLeftSide = styled('div')`
  display: grid;
  grid-template-columns: minmax(150px, auto) auto;
  gap: ${(props) => props.theme.spacing(1)};
  justify-content: left;
  align-items: center;
`;

const StyledButtonsActionRightSide = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
`;

const StyledBottomComponent = styled('div')`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr;
`;
