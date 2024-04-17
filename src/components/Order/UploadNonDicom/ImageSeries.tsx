import { FC, useCallback } from 'react';

import { BaseEntity } from '@/types';

import { ImageFrame } from './ImageFrame';

/**
 * ImageSeries Component
 * */
type ImageSeriesProps = {
  /**
   * List image show
   */
  images: Blob[];

  /**
   * Images selected in list Image
   */
  selectedImgIds: BaseEntity['id'][];

  /**
   * Control list image selected set/unset item in array 'selectedImgsIds'
   */
  setSelectedImgIds: React.Dispatch<React.SetStateAction<BaseEntity['id'][]>>;

  /**
   * Current Image Show
   */
  currentImage: string;

  /**
   * Set state true/false view mode
   */
  setViewMode: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Set current image
   */
  setCurrentImage: React.Dispatch<React.SetStateAction<string>>;
};

export const ImageSeries: FC<ImageSeriesProps> = (props) => {
  const { images, setViewMode, setCurrentImage, selectedImgIds, setSelectedImgIds } =
    props;

  /**
   * After selected a image(set viewMode = true) in list image can preview image on main view, check or uncheck itself
   * If checked will push it on selectedImgIds array prepare for uploadNonDicom API
   * If uncheck remove from selectedImgIds
   */
  const onSelectFrame = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const { source, index } = event.currentTarget.dataset;
      setViewMode(true);
      if (index && source) {
        setCurrentImage(source);
        if (selectedImgIds.includes(parseInt(index))) {
          const newArray = selectedImgIds.filter((id) => id !== parseInt(index));
          setSelectedImgIds(newArray);
        } else {
          setSelectedImgIds([...selectedImgIds, parseInt(index)]);
        }
      }
    },
    [selectedImgIds, setCurrentImage, setSelectedImgIds, setViewMode],
  );
  return (
    <>
      {images &&
        images.length > 0 &&
        images.map((imageSrc, index) => {
          return (
            <ImageFrame
              {...props}
              key={`${imageSrc}-${index}`}
              imageSrc={imageSrc}
              index={index}
              onSelectFrame={onSelectFrame}
            />
          );
        })}
    </>
  );
};
