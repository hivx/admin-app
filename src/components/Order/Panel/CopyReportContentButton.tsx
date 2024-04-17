import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { FC } from 'react';

import {
  useGetOneRadiologyReportImageDataMutation,
  useGetOneRadiologyReportQuery,
} from '@/api/radiologyReport';
import { ItechCopyFileIcon } from '@/assets/icon';
import { DynamicPanelHeaderButton } from '@/components/Layout/DynamicSidepanel/DynamicPanelHeaderButton';
import { useAppDispatch, useTranslate } from '@/hooks';
import { OrderPanelApproveButtonProps } from '@/hooks/dynamicSidepanelDataController/useQuickApproveButton';
import { base64Coded, convertFileToBase64 } from '@/lib/dataHelper/base64FileHelper';
import { setRadiologyReportSubmissionData } from '@/stores/OrderRadiology';
import { IRadiologyReportSubmissionData } from '@/types/radiology/reportContext';
import { isFulfilled } from '@/utils/checkPromiseStatus';

export const CopyReportContentButton: FC<OrderPanelApproveButtonProps> = ({
  order,
  request,
  reportID,
}) => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const isReportInRequest =
    reportID && request?.reports
      ? !!request.reports.map((item) => item.id).includes(reportID)
      : false;
  const { data: reportData, isFetching } = useGetOneRadiologyReportQuery(
    isReportInRequest && reportID
      ? {
          orderID: order.id,
          requestID: request.id,
          reportID: reportID,
        }
      : skipToken,
  );

  const [trigger] = useGetOneRadiologyReportImageDataMutation();

  /**
   * Copy nội dung report, và ảnh vào trong stores
   */
  const onCopyReportContent = async () => {
    if (reportData) {
      const { imageFileIDs } = reportData;
      const reportImagesIDs: number[] = [];

      const images: IRadiologyReportSubmissionData['images'] = {};

      imageFileIDs &&
        Object.keys(imageFileIDs).map((item) => {
          if (item.includes('image')) {
            reportImagesIDs.push(imageFileIDs[item]);
          }
        });
      if (reportImagesIDs && reportImagesIDs.length !== 0) {
        try {
          const promises: Promise<string>[] = reportImagesIDs.map(async (id) => {
            const data = await trigger({
              id,
              orderID: order.id,
              requestID: request.id,
              reportID: reportID,
            }).unwrap();
            const base64Image = await convertFileToBase64(data);
            return base64Coded(base64Image);
          });
          const listImage = await Promise.allSettled(promises);
          listImage
            .filter(isFulfilled)
            .map((item) => item.value)
            .forEach((value, index) => {
              images[(index + 1).toString()] = value;
            });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
        }
      }
      if (isReportInRequest) {
        dispatch(
          setRadiologyReportSubmissionData({
            orderID: order.id,
            requestID: request.id,
            findings: reportData?.findings,
            comments: reportData?.comments,
            impression: reportData?.impression,
            images,
          }),
        );
      }
    }
  };

  return (
    <DynamicPanelHeaderButton
      title={translate.buttons.copyResult()}
      onClick={onCopyReportContent}
      disabled={!isReportInRequest || !order.lockedBy}
      IconComponent={ItechCopyFileIcon}
    />
  );
};
