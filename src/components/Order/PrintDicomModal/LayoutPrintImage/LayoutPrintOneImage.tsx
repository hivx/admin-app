import React, { FC } from 'react';

import { LayoutPrintImageProps } from '..';

export const LayoutPrintOneImage: FC<LayoutPrintImageProps> = (props) => {
  const { images } = props;
  return (
    <div>
      {images[0] ? <img src={images[0]} alt="dicomImage" width={'100%'} /> : <></>}
    </div>
  );
};
