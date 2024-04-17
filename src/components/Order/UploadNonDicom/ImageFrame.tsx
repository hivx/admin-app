import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleIcon from '@mui/icons-material/Circle';
import { styled } from '@mui/material';
import { FC, useCallback, useEffect } from 'react';
import { Crop } from 'react-image-crop';

import { MyIcon } from '@/components/Elements/Icons/MyIcon';
import { BaseEntity } from '@/types';

/**
 * Image frame component
 */
type ImageFrameProps = {
  imageSrc: Blob;
  index: BaseEntity['id'];
  currentImage: string;
  selectedImgIds: BaseEntity['id'][];
  setSelectedImgIds: React.Dispatch<React.SetStateAction<BaseEntity['id'][]>>;
  setCurrentImage: React.Dispatch<React.SetStateAction<string>>;
  setViewMode: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectFrame: (event: React.MouseEvent<HTMLCanvasElement>) => void;
};
export const ImageFrame: FC<ImageFrameProps> = (props) => {
  const { imageSrc, index, selectedImgIds, onSelectFrame } = props;
  /**
   * Status selected image if id exist in selectedImgIds => true
   * @returns boolean
   */
  const checkSelected = selectedImgIds.includes(index);
  const handleDrawCanvas = useCallback(
    (elementId: string, size?: Pick<Crop, 'width' | 'height'>) => {
      const image = new Image();
      if (imageSrc instanceof Blob) {
        image.src = URL.createObjectURL(imageSrc);
      } else {
        image.src = imageSrc;
      }
      const canvas = document.getElementById(elementId);
      if (canvas instanceof HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.save();
          ctx.resetTransform();
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          // note: canvas width/height is always larger than image width/height due to cropping from canvas
          if (size) {
            const { width, height } = size;
            image.onload = () => {
              ctx.drawImage(image, 0, 0, width, height);
              ctx.restore();
            };
          } else {
            image.onload = () => {
              ctx.drawImage(
                image,
                (canvas.width - image.width) / 2,
                (canvas.height - image.height) / 2,
              );
              ctx.restore();
            };
          }
        }
      }
    },
    [imageSrc],
  );

  useEffect(() => {
    if (imageSrc) {
      const elementId = `${imageSrc}-${index}`;
      const size = { width: 200, height: 140 };
      handleDrawCanvas(elementId, size);
    }
  }, [imageSrc, handleDrawCanvas, index]);

  const handleShowImageMainFrame = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      onSelectFrame(event);
      const elementId = 'image-main-view';
      handleDrawCanvas(elementId);
    },
    [onSelectFrame, handleDrawCanvas],
  );

  return (
    <div
      key={`${imageSrc}-${index}`}
      style={{
        position: 'relative',
        // backgroundColor: `${imageSrc.toString() === currentImage ? '#616161' : '#000'}`,
      }}
    >
      <StyledIconCircleMain>
        {checkSelected ? <StyledCheckCircleIcon /> : <StyledCircleIcon />}
      </StyledIconCircleMain>
      <canvas
        id={`${imageSrc}-${index}`}
        data-source={imageSrc}
        data-index={index}
        className="cornerstone-canvas"
        width={200}
        height={140}
        onClick={handleShowImageMainFrame}
      />
    </div>
  );
};

/**
 * Styles Image Frame
 */
const StyledIconCircleMain = styled(MyIcon)`
  position: absolute;
  margin: ${(props) => props.theme.spacing(0.5)};
`;
const StyledCheckCircleIcon = styled(CheckCircleIcon)`
  color: ${(props) => props.theme.palette.primary.main};
`;
const StyledCircleIcon = styled(CircleIcon)`
  color: ${(props) => props.theme.palette.background.default};
`;
