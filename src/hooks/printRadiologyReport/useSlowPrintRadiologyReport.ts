import { useCallback, useState } from 'react';

import { useAppSelector } from '@/hooks';
import { usePrintRadiologyReport } from '@/hooks/order/usePrintRadiologyReport';
import { printPDF } from '@/lib/dataHelper/printPDF';
import { getOrderLayout } from '@/stores/OrderRadiology/orderLayoutSlice';
import { BaseEntity } from '@/types';
import {
  ILayoutDTO,
  IOrderDTO,
  IOrderRequestDTO,
  IRadiologyReportDTO,
} from '@/types/dto';

import { ImageDataState } from '../useSelectDicomImage';

import { PRINT_MODAL_OPEN_MODE } from './printModal';
import { InformationPrintFormData } from './usePrintReportButton';

export enum StatusTemplate {
  SUCCESS = 'SUCCESS',
  NO_TEMPLATE = 'NO_TEMPLATE',
}

type PrintData = {
  blobURL?: string;
  blobPdf?: Blob;
};

type Options = {
  order: IOrderDTO;
  requestID?: IOrderRequestDTO['id'];
  reportID?: BaseEntity['id'];
};

/**
 * Use ONLY for PrintPreviewRadiologyReportModal
 */
export const useSlowPrintRadiologyReport = (options: Options) => {
  const { order: currentOrder, requestID = 0, reportID = 0 } = options;

  // const currentOrderID = orderID ?? rowSelected;
  const [printData, setPrintData] = useState<PrintData | undefined>();
  const currentTemplate = useAppSelector(getOrderLayout());

  const [modalMode, setModalMode] = useState<PRINT_MODAL_OPEN_MODE>(
    PRINT_MODAL_OPEN_MODE.PRINT_ONLY,
  );
  const { exportReportPdf } = usePrintRadiologyReport({
    orderID: currentOrder.id,
    requestID,
  });

  const currentRequest = currentOrder?.requests?.find((item) => item.id === requestID);
  /**
   * Update pdf blob
   */
  const updatePDFBlob = useCallback(
    async ({
      formData,
      currentReportID,
      images,
    }: {
      formData?: InformationPrintFormData;
      currentReportID?: IRadiologyReportDTO['id'];
      order?: IOrderDTO;
      images?: ImageDataState[];
      printOnly?: boolean;
    }) => {
      if (currentRequest) {
        const reportID = currentReportID ?? currentRequest.finalReportID;
        if (currentTemplate && currentOrder && currentOrder.patient && reportID) {
          const templateID: ILayoutDTO['id'] = formData?.templateID ?? currentTemplate.id;

          // const composeHTML = await getReportHTML(options);
          // const contentHTML = composeHTML.body.innerHTML;
          const blobPdf = await exportReportPdf({
            order: currentOrder,
            reportID,
            request: currentRequest,
            templateID,
            selectedImages: images,
            formData,
          });
          const blobURL = URL.createObjectURL(blobPdf);
          setPrintData({ blobPdf, blobURL });
        }
      }
    },
    [currentRequest, currentTemplate, currentOrder, exportReportPdf],
  );

  const getValidateTemplateStatus = useCallback(async (): Promise<StatusTemplate> => {
    return currentTemplate ? StatusTemplate.SUCCESS : StatusTemplate.NO_TEMPLATE;
  }, [currentTemplate]);

  /**
   * Open print dialog and sign report if possible
   */
  const handleConfirm = useCallback(() => {
    printData?.blobPdf && printPDF(printData.blobPdf);
  }, [printData?.blobPdf]);

  return {
    currentOrder,
    printData,
    updatePDFBlob,
    currentRequest,
    handleConfirm,
    getValidateTemplateStatus,
    modalMode,
    setModalMode,
    currentTemplate,
    reportID,
  };
};
