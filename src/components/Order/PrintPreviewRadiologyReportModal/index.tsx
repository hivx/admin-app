import { Box, Modal, Stack, styled, Typography } from '@mui/material';
import { FC, forwardRef, useCallback } from 'react';

import { MyButton } from '@/components';
import { ICommonAppModalProps } from '@/components/Elements/Modal/AppModalContent';
import { ModalContent } from '@/components/Elements/Modal/ModalContent';
import { ModalFooterLayout } from '@/components/Layout/ModalFooterLayout';
import { useTranslate } from '@/hooks';
import { InformationPrintFormData } from '@/hooks/printRadiologyReport/usePrintReportButton';
import { useSlowPrintRadiologyReport } from '@/hooks/printRadiologyReport/useSlowPrintRadiologyReport';
import { ImageDataState, useSelectDicomImage } from '@/hooks/useSelectDicomImage';

import { InfomationUpdatePdf } from './InfomationUpdatePdf';
import PrintPreviewRadiologyReportModalShell from './PrintPreviewRadiologyReportModalShell';

type PrintPreviewRadiologyReportModalProps = ICommonAppModalProps &
  ReturnType<typeof useSlowPrintRadiologyReport>;

export const PrintPreviewRadiologyReportModal: FC<
  PrintPreviewRadiologyReportModalProps
> = (props) => {
  return (
    <Modal disableEnforceFocus open={!!props.isOpen}>
      <PrintPreviewRadiologyReportModalContent {...props} />
    </Modal>
  );
};

/**
 * We split the content into a seperate component so that the hooks called in this component
 * only calls when the popup is open
 */
const PrintPreviewRadiologyReportModalContent: FC<PrintPreviewRadiologyReportModalProps> =
  forwardRef<HTMLElement, PrintPreviewRadiologyReportModalProps>((props, ref) => {
    const {
      closeModal,
      printData,
      currentOrder,
      updatePDFBlob,
      handleConfirm,
      // handleSignReport,
      currentTemplate,
      currentRequest,
      reportID,
      isOpen,
    } = props;

    const translate = useTranslate();
    /**
     * Condition can close modal close modal
     */
    // const currentUser = useAppSelector(selectCurrentUser);
    /**
     * Can close modal when
     * - final pdf report exist
     * OR
     * - user approved is not current user
     * If modal mode is print only, the close button will always show
     */
    // const canCloseModal =
    //   modalMode === PRINT_MODAL_OPEN_MODE.PRINT_ONLY
    //     ? true
    //     : currentRequest?.finalPdfReport?.id ||
    //       currentRequest?.finalApprover?.id !== currentUser?.id;
    /**
     * Can Create and sign
     * - Has role user approved is current user
     */
    // const canCreateAndSign = currentRequest?.finalApprover?.id === currentUser?.id;

    const handlePrintFieldsChange = useCallback(
      async (formData: InformationPrintFormData, selectedImages?: ImageDataState[]) => {
        await updatePDFBlob({
          formData,
          images: selectedImages,
          currentReportID: reportID,
        });
      },
      [reportID, updatePDFBlob],
    );
    const selectDicomImage = useSelectDicomImage(
      currentOrder?.id ?? 0,
      currentTemplate?.numOfImages ?? 0,
    );

    return isOpen ? (
      <StyledPrintPreviewRadiologyReportModal
        ref={ref}
        key={currentOrder?.id}
        renderTitle={() => (
          <StyledPrintPreviewRadiologyReportModalHeaderTitle textTransform="uppercase">
            {translate.buttons.printPreviewRadiologyReport()}
          </StyledPrintPreviewRadiologyReportModalHeaderTitle>
        )}
        renderBody={() => (
          <StyledPrintPreviewRadiologyReportModalBody>
            <PrintPreviewRadiologyReportModalShell
              PreviewPdf={
                <Box padding={1} height={'100%'}>
                  <iframe
                    width={'100%'}
                    height={'100%'}
                    src={printData?.blobURL}
                    title="print-preview"
                  />
                </Box>
              }
              InfomationUpdatePdf={
                <InfomationUpdatePdf
                  selectDicomImage={selectDicomImage}
                  currentTemplate={currentTemplate}
                  onPrintFieldsChange={handlePrintFieldsChange}
                  order={currentOrder}
                  request={currentRequest}
                />
              }
            />
          </StyledPrintPreviewRadiologyReportModalBody>
        )}
        renderFooter={() => (
          <StyledPrintPreviewRadiologyReportModalFooter>
            <ModalFooterLayout
              ActionButton={
                <Stack spacing={1} direction="row">
                  {/**
                   * If current user has role create report will enable button 'Tạo và ký' and button print will change text to 'In trước'
                   * Else ẩn button 'Tạo và ký' and button print will change text to 'In kết quả'
                   */}
                  {/* {canCreateAndSign && (
                  <StyledPrimaryButton variant="contained" onClick={() => {}}>
                    {translate.buttons.createReport()}
                  </StyledPrimaryButton>
                )} */}

                  <StyledPrimaryButton variant="contained" onClick={handleConfirm}>
                    {translate.buttons.printPreviewPdf()}
                  </StyledPrimaryButton>
                </Stack>
              }
              OptionalButtons={[
                <MyButton
                  key={translate.buttons.close()}
                  variant="outlined"
                  onClick={() => {
                    selectDicomImage.unSelectAllImages();
                    closeModal();
                  }}
                >
                  {translate.buttons.close()}
                </MyButton>,
              ]}
            />
          </StyledPrintPreviewRadiologyReportModalFooter>
        )}
      />
    ) : (
      <></>
    );
  });

PrintPreviewRadiologyReportModalContent.displayName = 'PrintPreviewRadiologyReportModal';

const StyledPrintPreviewRadiologyReportModal = styled(ModalContent)`
  width: 95vw;
  max-width: 85vw;
`;

const StyledPrintPreviewRadiologyReportModalFooter = styled('div')`
  padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(2)};
`;

export const StyledPrimaryButton = styled(MyButton)`
  padding: ${(props) => props.theme.spacing(0.2)} ${(props) => props.theme.spacing(1)};
`;

const StyledPrintPreviewRadiologyReportModalBody = styled('div')`
  overflow: auto;
  height: 85vh;
  width: 100%;
  padding: ${(props) => props.theme.spacing(2)};
`;

const StyledPrintPreviewRadiologyReportModalHeaderTitle = styled(Typography)`
  text-align: center;
  background-color: ${(props) => props.theme.pacs?.customColors.tableHeaderBackground};
  padding: ${(props) => props.theme.spacing(0.5)} 0;
`;
