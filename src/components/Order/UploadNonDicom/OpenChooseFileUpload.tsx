import React, { FC } from 'react';

import { ItechUploadAttachmentIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useTranslate } from '@/hooks';
import { MediaData } from '@/hooks/order/useMediaRadiology';
import { useUploadImages } from '@/hooks/order/useUploadImages';

export type OpenChooseVideoButtonProps = {
  setUploadFile: React.Dispatch<React.SetStateAction<MediaData[]>>;
  handleUploadNonDicom: (files: File[]) => Promise<boolean>;
  numberOFImages: number;
};

/**
 * Open choose images button
 */
const OpenChooseFileUpload: FC<OpenChooseVideoButtonProps> = (props) => {
  const translate = useTranslate();
  // const { handleOpenChooseFile, inputVideoRef, handleUpload } = useUploadMedia({
  //   ...props,
  // });

  const { handleOpenChooseImage, handleUpImage, inputImageRef } = useUploadImages(props);

  return (
    <>
      <IconButtonWithToolTip
        title={translate.pages.orderReport.media.uploadImage()}
        onClick={handleOpenChooseImage}
      >
        <TableSVGIcon
          IconComponent={ItechUploadAttachmentIcon}
          IconComponentProps={{ color: 'action' }}
        />
      </IconButtonWithToolTip>

      <input
        type="file"
        hidden
        ref={inputImageRef}
        onChange={handleUpImage}
        accept=".jpeg, .jpg, .png"
        multiple
      />
    </>
  );
};

export default OpenChooseFileUpload;
