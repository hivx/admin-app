import { ComponentProps } from 'react';

import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { useTranslate } from '@/hooks';
import { PRINT_MODAL_OPEN_MODE } from '@/hooks/printRadiologyReport/printModal';
import { usePrintReportButton } from '@/hooks/printRadiologyReport/usePrintReportButton';
import { useSlowPrintRadiologyReport } from '@/hooks/printRadiologyReport/useSlowPrintRadiologyReport';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO, IOrderRequestDTO, IRadiologyReportDTO } from '@/types/dto';
import { IRenderActionButton } from '@/types/order/buttons';

import { PrintPreviewRadiologyReportModal } from '../../../../../components/Order/PrintPreviewRadiologyReportModal';
import { useRegisterRadiologyFunctions } from '../../../../order/providers';
type PrintRadiologyReportButtonProps = {
  /**
   * If a order is provided, use this order instead of fetching current order under RadiologyReportProvider
   */
  order: IOrderDTO;
  requestID?: IOrderRequestDTO['id'];
  reportID?: IRadiologyReportDTO['id'];
  renderButton: IRenderActionButton;
  // viewImageProps?: ComponentProps<typeof IconButtonWithToolTip>;
} & ComponentProps<typeof IconButtonWithToolTip>;
/**
 *  Nút in kết quả + ký số (Luồng cũ)
 * -> Luồng mới : Nút xem trước kết quả
 */
export const PrintRadiologyReportButton = (props: PrintRadiologyReportButtonProps) => {
  const { renderButton, requestID, reportID, order } = props;
  const translate = useTranslate();

  const register = useRegisterRadiologyFunctions();
  const slowPrintFunctions = useSlowPrintRadiologyReport({
    order,
    requestID,
    reportID,
  });

  const {
    isOpenPrintAndApprove,
    closePrintAndApprove,
    openModalPrintRadiologyReport,
    buttonState,
  } = usePrintReportButton({
    onModalOpen: slowPrintFunctions.updatePDFBlob,
    currentRequest: slowPrintFunctions.currentRequest,
    getValidateTemplateStatus: slowPrintFunctions.getValidateTemplateStatus,
    setModalMode: slowPrintFunctions.setModalMode,
    currentReportID: reportID,
  });
  const isActive = buttonState === BUTTON_STATE.ACTIVE;

  register('openModalPrintRadiologyReport', openModalPrintRadiologyReport);
  return (
    <>
      {renderButton({
        onClick: () =>
          openModalPrintRadiologyReport({
            currentReportID: reportID,
            modalMode: PRINT_MODAL_OPEN_MODE.PRINT_ONLY,
            order,
          }),
        title: translate.buttons.printPreviewRadiologyReport(),
        disabled: !isActive,
      })}
      <PrintPreviewRadiologyReportModal
        closeModal={closePrintAndApprove}
        isOpen={isOpenPrintAndApprove}
        {...slowPrintFunctions}
      />
    </>
  );
};
