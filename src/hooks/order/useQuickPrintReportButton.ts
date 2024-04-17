import { useCallback } from 'react';

import { useTranslate } from '@/hooks';
import { printPDF } from '@/lib/dataHelper/printPDF';
import { useNotifySnackbar } from '@/providers/NotificationProvider';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';

import { useLazyGetFinalPdfFileDataQuery } from '../../features/order/api/radiologyReportPdf';

// import { usePrintRadiologyReport } from './usePrintRadiologyReport';

export const useQuickPrintReportButton = (
  order?: IOrderDTO,
  request?: IOrderRequestDTO,
) => {
  const buttonState: BUTTON_STATE =
    request?.finalHtmlReportID || request?.finalSignedReportID
      ? BUTTON_STATE.ACTIVE
      : BUTTON_STATE.DISABLED;

  // const { printReport } = usePrintRadiologyReport();
  const notify = useNotifySnackbar();
  const translate = useTranslate();

  const [triggerFinalPdfData] = useLazyGetFinalPdfFileDataQuery();

  /**
   * Quick print report will get pdf by final pdf id in fisrt request  if the order approved and create report pdf & sign
   */
  const quickPrintReport = useCallback(async () => {
    if (order) {
      if (request && (request.finalHtmlReportID || request.finalSignedReportID)) {
        const res = await triggerFinalPdfData({
          orderID: order.id,
          requestID: request.id,
        });
        const pdf = res.data;
        if ('error' in res) {
          notify({
            message: translate.messages.notification.notFoundPdf(),
            options: {
              variant: 'warning',
            },
          });
        } else {
          if (pdf) {
            printPDF(pdf);
          }
        }
      }
    }
  }, [notify, order, request, translate.messages.notification, triggerFinalPdfData]);

  return {
    buttonState,
    onClick: quickPrintReport,
    onListItemClick: quickPrintReport,
  };
};
