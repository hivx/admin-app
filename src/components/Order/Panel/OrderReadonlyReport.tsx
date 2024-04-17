import { Stack, styled } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC } from 'react';

import { useGetOneRadiologyReportQuery } from '@/api/radiologyReport';
import { HtmlEditorWithLabel } from '@/components/Editor/HtmlEditorWithLabel';
import { useTranslate } from '@/hooks';
import { BaseEntity } from '@/types';
import { IOrderDTO, IOrderRequestDTO, IRadiologyReportDTO } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

type OrderReadonlyReportProps = {
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
  reportID?: IRadiologyReportDTO['id'];
  label?: string;
};
/**
 * Handle report selection
 */
export const OrderReadonlyReport: FC<OrderReadonlyReportProps> = (props) => {
  const { order, request, reportID, label } = props;

  /**
   * If doesn't exist request or finalReportID => no content report
   */
  if (!request || !reportID) return <OrderReadonlyReportContent label={label} />;

  /**
   * Final Report
   */
  return (
    <OrderReadonlyReportContent
      label={label}
      request={request}
      order={order}
      reportQuery={
        order
          ? {
              orderID: order.id,
              requestID: request.id,
              reportID,
            }
          : undefined
      }
    />
  );
};

type OrderReadonlyReportContentProps = {
  label?: string;
  request?: IOrderRequestDTO;
  order?: IOrderDTO;
  reportQuery?: {
    orderID: BaseEntity['id'];
    requestID: BaseEntity['id'];
    reportID: BaseEntity['id'];
  };
};

/**
 * Handle Readonly Report UI
 */
const OrderReadonlyReportContent: FC<OrderReadonlyReportContentProps> = (props) => {
  const { reportQuery, request, label, order } = props;
  const translate = useTranslate();
  const isReportInRequest =
    request?.reports && reportQuery
      ? !!request.reports.map((item) => item.id).includes(reportQuery.reportID)
      : false;
  const { data: reportData, isFetching } = useGetOneRadiologyReportQuery(
    reportQuery && isReportInRequest
      ? {
          orderID: reportQuery.orderID,
          requestID: reportQuery.requestID,
          reportID: reportQuery.reportID,
        }
      : skipToken,
  );
  return (
    <OrderReadonlyReportContainer width="100%">
      <HtmlEditorWithLabel
        label={label}
        placeholder={label}
        value={
          isFetching
            ? translate.messages.loading()
            : combineReportData(reportData, request, order)
        }
        height="100%"
        inline
        readonly
      />
    </OrderReadonlyReportContainer>
  );
};

/**
 * Combine report findings and impression into one string
 * to display in one editor
 */
const combineReportData = (
  reportData?: IRadiologyReportDTO,
  request?: IOrderRequestDTO,
  order?: IOrderDTO,
) => {
  return reportData?.findings || reportData?.impression
    ? `<div>
        <div>
          <span style="font-weight: 500; margin: 0; font-size:14px; text-decoration: underline; color: #0E8A72 " >
            Chỉ định:
          </span>
          <span style="margin: 0; font-size:14px;" >
             ${request?.procedure?.name ?? ''}
          </span>
        </div>
        <div>
          <span style="font-weight: 500; margin: 0; font-size:14px; text-decoration: underline; color: #0E8A72" >
            Bác sĩ KL:
          </span>
          <span style="margin: 0; font-size:14px;" >
           ${request?.finalApprover?.fullname ?? ''} ${
        request?.finalApprovedTime
          ? `(${itechDateTimeToDayjs(request?.finalApprovedTime)?.format(
              DISPLAY_FORMAT.dateTimeNoSecond,
            )})`
          : ''
      }
          </span>
        </div>
        <div>
        <div style="display:inline-block">
          <p style="font-weight: 500; margin: 0; font-size:14px; text-decoration: underline; color: #0E8A72" >
            Nội dung
          </p>
        </div>
        <div style="font-size:14px; padding-left: 20px;">${reportData.findings} </div>
        </div>
        <div>
        <div style="display:inline-block">
          <p style="font-weight: 500; margin-bottom: 0; font-size:14px; text-decoration: underline; color: #0E8A72" >
            Kết luận
          </p>
        </div>
        <div style="font-size:14px; padding-left: 20px;">${reportData.impression}</div>
        <div style="display:inline-block">
          <p style="font-weight: 500; margin-bottom: 0; font-size:14px; text-decoration: underline; color: #0E8A72" >
           Đề nghị
          </p>
        </div>
        <div style="font-size:14px; padding-left: 20px;">${reportData.comments}</div>
        <div>
          <span style="font-weight: 500; margin: 0; font-size:14px; text-decoration: underline; color: #0E8A72" >
            Máy chụp:
          </span>
          <span style="margin: 0; font-size:14px;" >
             ${request?.modality?.name ?? ''} ${
        order?.study?.studyTime
          ? `(${itechDateTimeToDayjs(order?.study?.studyTime)?.format(
              DISPLAY_FORMAT.dateTimeNoSecond,
            )})`
          : ''
      }
          </span>
        </div>
        <div>
          <span style="font-weight: 500; margin: 0; font-size:14px; text-decoration: underline; color: #0E8A72" >
            KTV:
          </span>
          <span style="margin: 0; font-size:14px;" >
             ${request?.operators?.map((operator) => operator.fullname).toString() ?? ''}
          </span>
        </div>
        </div>`
    : `<div></div>`;
};

const OrderReadonlyReportContainer = styled(Stack)`
  height: 100%;
  overflow: auto;
  padding-top: ${(props) => props.theme.spacing(0.8)};
`;
