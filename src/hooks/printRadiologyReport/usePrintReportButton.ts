import { useCallback } from 'react';

import { useDisclosure, useTranslate } from '@/hooks';
import { PrintDocumentFormat } from '@/lib/dataHelper/htmlElementHelper';
import { useNotifySnackbar } from '@/providers/NotificationProvider';
import { BUTTON_STATE, BaseEntity } from '@/types';
import {
  IOrderDTO,
  IOrderRequestDTO,
  IPatientDTO,
  IRadiologyReportDTO,
} from '@/types/dto';
import { IRadiologyReportContextFunctions } from '@/types/radiology/reportContext';

import { PRINT_MODAL_OPEN_MODE } from './printModal';
import {
  StatusTemplate,
  useSlowPrintRadiologyReport,
} from './useSlowPrintRadiologyReport';
export type InformationPrintFormData = PrintDocumentFormat & {
  templateID?: BaseEntity['id'];
  patientName?: string;
  patientBirthday?: string;
  patientGender?: IPatientDTO['gender'] | string;
  requestedProcedureName?: string;
  clinicalDiagnosis?: string;
  includeSignature?: boolean;
};
type Options = {
  onModalOpen?: ({
    formData,
    currentReportID,
    order,
  }: {
    formData?: InformationPrintFormData;
    currentReportID?: IRadiologyReportDTO['id'];
    order?: IOrderDTO;
  }) => Promise<void>;
  currentRequest?: IOrderRequestDTO;
  getValidateTemplateStatus: () => Promise<StatusTemplate>;
  setModalMode: ReturnType<typeof useSlowPrintRadiologyReport>['setModalMode'];
  currentReportID?: BaseEntity['id'];
};

/**
 * Hook dùng cho nút in nhanh kết quả
 */
export const usePrintReportButton = (options: Options) => {
  const {
    onModalOpen,
    currentRequest,
    getValidateTemplateStatus,
    currentReportID,
    setModalMode,
  } = options;
  const translate = useTranslate();
  const notify = useNotifySnackbar();

  const buttonState: BUTTON_STATE =
    currentRequest && currentReportID ? BUTTON_STATE.ACTIVE : BUTTON_STATE.DISABLED;

  const {
    isOpen: isOpenPrintAndApprove,
    open: openPrintAndApprove,
    close: closePrintAndApprove,
  } = useDisclosure(false);

  const openModalPrintRadiologyReport = useCallback<
    IRadiologyReportContextFunctions['openModalPrintRadiologyReport']
  >(
    async (options) => {
      const {
        currentReportID,
        order,
        modalMode = PRINT_MODAL_OPEN_MODE.PRINT_ONLY,
      } = options;
      const statusTemplate = await getValidateTemplateStatus();
      setModalMode(modalMode);
      if (statusTemplate === StatusTemplate.SUCCESS) {
        onModalOpen &&
          (await onModalOpen({
            currentReportID,
            order,
            formData: {
              patientGender: order?.patient?.gender
                ? translate?.messages.gender({ gender: order?.patient?.gender })
                : undefined,
            },
          }));
        openPrintAndApprove();
      } else {
        notify({
          message: translate.messages.notification.noTemplateForOrder(),
          options: {
            variant: 'warning',
          },
        });
      }
    },
    [
      getValidateTemplateStatus,
      notify,
      onModalOpen,
      openPrintAndApprove,
      setModalMode,
      translate.messages,
    ],
  );

  return {
    isOpenPrintAndApprove,
    openPrintAndApprove,
    closePrintAndApprove,
    openModalPrintRadiologyReport,
    buttonState,
  };
};
