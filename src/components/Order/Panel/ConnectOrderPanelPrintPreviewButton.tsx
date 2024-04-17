import { ItechPrintPreviewIcon } from '@/assets/icon';
import { DynamicPanelHeaderButton } from '@/components/Layout/DynamicSidepanel/DynamicPanelHeaderButton';
import { PrintPreviewRadiologyReportModal } from '@/components/Order/PrintPreviewRadiologyReportModal';
import { useTranslate } from '@/hooks';
import { PRINT_MODAL_OPEN_MODE } from '@/hooks/printRadiologyReport/printModal';
import { usePrintReportButton } from '@/hooks/printRadiologyReport/usePrintReportButton';
import { useSlowPrintRadiologyReport } from '@/hooks/printRadiologyReport/useSlowPrintRadiologyReport';
import { BUTTON_STATE, BaseEntity } from '@/types';
import { IOrderDTO } from '@/types/dto';

export const ConnectOrderPanelPrintPreviewButton = ({
  order,
  requestID,
  reportID,
}: {
  order: IOrderDTO;
  requestID?: BaseEntity['id'];
  reportID?: BaseEntity['id'];
}) => {
  const translate = useTranslate();

  // bind quick print
  // useKeybinds(HOTKEYS.QUICK_PRINT.key, () => quickPrintReport(), {
  //   disabled: !isActive,
  // });

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

  return (
    <>
      <DynamicPanelHeaderButton
        title={translate.buttons.printPreviewRadiologyReport()}
        onClick={() =>
          openModalPrintRadiologyReport({
            currentReportID: reportID,
            modalMode: PRINT_MODAL_OPEN_MODE.PRINT_ONLY,
            order,
          })
        }
        disabled={!isActive}
        IconComponent={ItechPrintPreviewIcon}
      />

      {isActive && (
        <PrintPreviewRadiologyReportModal
          closeModal={closePrintAndApprove}
          isOpen={isOpenPrintAndApprove}
          {...slowPrintFunctions}
        />
      )}
    </>
  );
};
