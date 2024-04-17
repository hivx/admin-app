import { styled } from '@mui/material';
import React from 'react';

import { ImageDataState } from '@/hooks/useSelectDicomImage';

import { PrintImagePanelProps } from '../PrintImagePanel';

import { Image } from './Image';

export type ImageListProps = Pick<
  PrintImagePanelProps,
  'onSelectImage' | 'listImage' | 'selectedDicomImageIDs'
> & {
  onSelectImageCallback?: (
    imageID: ImageDataState['id'],
    selectedImages: ImageDataState[],
  ) => void;
};

/**
 * Danh sách image dùng ở modal in KQ, modal in ảnh
 */
const ImageList = (props: ImageListProps) => {
  const { onSelectImage, listImage, selectedDicomImageIDs, onSelectImageCallback } =
    props;

  return (
    <ListImageStyled>
      {listImage &&
        listImage?.map((image) => {
          return (
            <Image
              imageData={image.data}
              key={image.id}
              imageID={image.id}
              onSelectImageCallback={onSelectImageCallback}
              onSelectImage={onSelectImage}
              isSelected={selectedDicomImageIDs.includes(image.id)}
            />
          );
        })}
    </ListImageStyled>
  );
};

export default ImageList;

const ListImageStyled = styled('div')`
  display: grid;
  --gap: ${(props) => props.theme.spacing(2)};
  gap: var(--gap);
  grid-template-columns: 1fr 1fr;
  overflow-y: auto;
`;
