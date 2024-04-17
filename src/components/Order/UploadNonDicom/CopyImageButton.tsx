import React, { FC } from 'react';

import { ItechCopyFileIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useCurrentOrderID } from '@/features/order';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { MediaData } from '@/hooks/order/useMediaRadiology';
import { convertFileToBase64 } from '@/lib/dataHelper/base64FileHelper';
import {
  selectCurrentRequestID,
  setRadiologyReportSubmissionData,
} from '@/stores/OrderRadiology';
import { IRadiologyReportSubmissionData } from '@/types/radiology/reportContext';

type CopyImageButtonProps = {
  uploadFile: MediaData[];
  selectedImgIds: number[];
};

/**
 * Chưa có chwucs năng
 */
export const CopyImageButton: FC<CopyImageButtonProps> = ({
  selectedImgIds,
  uploadFile,
}) => {
  const orderID = useCurrentOrderID();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));
  const dispatch = useAppDispatch();

  /**
   * Lưu image vào trong redux store
   */
  const onCopyImage = async (uploadFile: MediaData[], selectedImgIds: number[]) => {
    const imagesToCopy = uploadFile
      .filter((file, index) => selectedImgIds.includes(index))
      .map((item) => item.uploadValue);
    const images: IRadiologyReportSubmissionData['images'] = {};

    for (let i = 0; i < imagesToCopy.length; i++) {
      const imageDataURI = await convertFileToBase64(imagesToCopy[i]);
      images[i.toString()] = imageDataURI;
    }

    if (images) {
      dispatch(
        setRadiologyReportSubmissionData({
          orderID,
          requestID,
          images,
        }),
      );
    }
  };

  const translate = useTranslate();
  return (
    <IconButtonWithToolTip
      title={translate.pages.orderReport.media.copyToReport()}
      disabled={false}
      onClick={() => onCopyImage(uploadFile, selectedImgIds)}
    >
      <TableSVGIcon
        IconComponent={ItechCopyFileIcon}
        IconComponentProps={{ color: 'action' }}
      />
    </IconButtonWithToolTip>
  );
};
