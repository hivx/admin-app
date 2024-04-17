import { useCallback } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import {
  useExportOneRadiologyReportMutation,
  useSignOneRadiologyReportMutation,
} from '@/api/radiologyReport';
import { useTranslate } from '@/hooks';
import { base64Coded } from '@/lib/dataHelper/base64FileHelper';
import { PrintDocumentFormat } from '@/lib/dataHelper/htmlElementHelper';
import { printPDF } from '@/lib/dataHelper/printPDF';
// import { useHospitalProvider } from '@/providers/HospitalConfigProvider';
import { getCommonImagesSubmissionForOrderReport } from '@/lib/dataHelper/radiologyReport/getPatientPortalURL';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IOrderReportKey } from '@/stores/OrderRadiology';
import { BaseEntity } from '@/types';
import { IOrderDTO, IOrderRequestDTO, IPatientDTO } from '@/types/dto';
import { PaperConfig } from '@/types/pdf';
import { IRadiologyReportSubmissionData } from '@/types/radiology/reportContext';
import { PrintRadiolyReportParametersType } from '@/utils/radiology/printRadiologyReportHelper';

import { useLazyGetOneRadiologyReportFileDataQuery } from '../../features/order/api/radiologyReportPdf';
import { InformationPrintFormData } from '../printRadiologyReport/usePrintReportButton';
import { ImageDataState } from '../useSelectDicomImage';

export type PrintReportOptions = {
  order: IOrderDTO;
  request: IOrderRequestDTO;
  reportID?: BaseEntity['id'];
  templateID: BaseEntity['id'];
  format?: PrintDocumentFormat;
  paperConfig?: PaperConfig;
  selectedImages?: ImageDataState[];
  formData?: InformationPrintFormData;
};

export type SignReportOptions = {
  contentHTML: string;
  templateID: BaseEntity['id'];
  paperConfig?: PaperConfig;
};

export type FinalPdfBlob = {
  orderID: BaseEntity['id'];
  requestID: BaseEntity['id'];
  pdfID: BaseEntity['id'];
  signed: boolean;
};

type UsePrintRadiologyReportOptions = IOrderReportKey;

/**
 * hook để lấy file pdf preview
 */
export const usePrintRadiologyReport = (props: UsePrintRadiologyReportOptions) => {
  const translate = useTranslate();
  const { data: order } = useGetOneOrderQuery({ id: props.orderID });
  // const [triggerCreateReportPDF] = useCreateOneRadiologyReportPdfMutation();
  const [triggerGetOneRadiologyReportFileData] =
    useLazyGetOneRadiologyReportFileDataQuery();
  const [triggerExportReport] = useExportOneRadiologyReportMutation();
  const [triggerSignReport] = useSignOneRadiologyReportMutation();
  // const { isConnectHsm } = useHospitalProvider();

  const notifySignReportSuccess = useGenericNotifySnackbar(
    'success',
    translate.pages.orderReport.actions.signReport(),
  );
  const notifySignReportError = useGenericNotifySnackbar(
    'error',
    translate.pages.orderReport.actions.signReport(),
  );

  // const currentUser = useAppSelector(selectCurrentUser);
  // const { pacsIcon } = useGetHospitalLogo();

  const notifyPrintError = useGenericNotifySnackbar(
    'error',
    translate.buttons.printRadiologyReport(),
  );

  /**
   * Gọi API
   * BE tự ghép order vào layout
   */
  const exportReportPdf = useCallback(
    async (options: PrintReportOptions): Promise<Blob> => {
      const {
        reportID,
        order,
        request,
        templateID,
        format,
        selectedImages = [],
        formData,
      } = options;

      const listKey = selectedImages?.map((value, index) => `image${index + 1}`);
      const objImages: Record<string, string> = {};

      listKey?.forEach((imageKey, index) => {
        objImages[imageKey] = base64Coded(selectedImages[index].data);
      });

      const commonImages = await getCommonImagesSubmissionForOrderReport(order);

      const parameters: PrintRadiolyReportParametersType = {
        patientName: formData?.patientName ?? undefined,
        patientBirthday: formData?.patientBirthday ?? undefined,
        patientGender: formData?.patientGender
          ? translate?.messages.gender({
              gender: (formData.patientGender as IPatientDTO['gender']) ?? 'O',
            })
          : undefined,
        requestedProcedureName: formData?.requestedProcedureName ?? undefined,
        clinicalDiagnosis: formData?.clinicalDiagnosis ?? undefined,
      };

      return triggerExportReport({
        exportFormat: 'PDF',
        layoutID: templateID,
        orderID: order.id,
        reportID,
        requestID: request.id,
        includeSignature: formData?.includeSignature ?? false,
        images: {
          ...objImages,
          ...commonImages,
        },
        parameters,
      }).unwrap();
    },
    [translate?.messages, triggerExportReport],
  );

  const getFinalPdfBlob = useCallback(
    async (options: FinalPdfBlob) => {
      const pdfBlob = await triggerGetOneRadiologyReportFileData(
        { ...options },
        true,
      ).unwrap();
      return pdfBlob;
    },
    [triggerGetOneRadiologyReportFileData],
  );

  /**
   * Call API http://27.72.147.196:39999/swagger-ui.html?urls.primaryName=Secured#/order-report-api/printReportUsingPOST
   * sign final approve report
   */
  const signReport = useCallback(
    async (
      orderID: BaseEntity['id'],
      requestID: BaseEntity['id'],
      reportID: BaseEntity['id'],
      layoutID: BaseEntity['id'],
      images: IRadiologyReportSubmissionData['images'],
      onSuccessCallback?: () => void,
    ) => {
      if (order) {
        const commonImages = await getCommonImagesSubmissionForOrderReport(order);
        /**
         * Viện không kết nối HSM k cho ký số
         */
        // if (!isConnectHsm) {
        //   return;
        // }

        const res = await triggerSignReport({
          orderID,
          requestID,
          reportID,
          exportFormat: 'PDF',
          includeSignature: true,
          layoutID,
          images: { ...images, ...commonImages },
          parameters: {
            patientGender: order?.patient?.gender
              ? translate?.messages.gender({
                  gender: order?.patient?.gender ?? 'O',
                })
              : undefined,
          },
        });
        if ('error' in res) {
          notifySignReportError();
          return;
        }
        onSuccessCallback && onSuccessCallback();
        notifySignReportSuccess();
      }
    },
    [
      notifySignReportError,
      notifySignReportSuccess,
      order,
      translate?.messages,
      triggerSignReport,
    ],
  );

  const printReport = useCallback(
    async (pdfBlob: Blob) => {
      try {
        // trigger print PDF
        printPDF(pdfBlob);
      } catch {
        notifyPrintError();
      }
    },
    [notifyPrintError],
  );
  return {
    printReport,
    // getReportHTML,
    // getPdfBlob,
    signReport,
    getFinalPdfBlob,
    exportReportPdf,
  };
};
