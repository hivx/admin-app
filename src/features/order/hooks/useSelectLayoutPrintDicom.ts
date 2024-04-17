import { useState } from 'react';

import {
  LAYOUT_DISPLAY_NAME,
  printImageConfig,
} from '@/components/Order/PrintDicomModal';

export const useSelectLayoutPrintDicom = () => {
  const [layoutID, setLayoutID] = useState<LAYOUT_DISPLAY_NAME>(
    LAYOUT_DISPLAY_NAME.ONE_IMAGE_LAYOUT,
  );

  const totalNumberOfImages = printImageConfig[layoutID].numberOfImages;

  return {
    layoutID,
    setLayoutID,
    totalNumberOfImages,
  };
};
