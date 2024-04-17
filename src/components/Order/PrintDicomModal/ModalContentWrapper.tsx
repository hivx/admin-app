import { Typography, styled } from '@mui/material';

import { MyButton, MyDivider } from '@/components';
import { ModalContent } from '@/components/Elements/Modal/ModalContent';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { ModalFooterLayout } from '@/components/Layout/ModalFooterLayout';
import { useTranslate } from '@/hooks';
import { useSelectDicomImage } from '@/hooks/useSelectDicomImage';
import { BaseEntity } from '@/types';

import { usePrintDicomImage } from '../../../features/order/hooks/usePrintDicomImage';
import { useSelectLayoutPrintDicom } from '../../../features/order/hooks/useSelectLayoutPrintDicom';

import { PrintImageIframePreview } from './PrintImageIframePreview';
import { PrintImagePanel } from './PrintImagePanel';

export const ModalContentWrapper = ({
  orderID,
  close,
}: {
  close: () => void;
  orderID: BaseEntity['id'];
}) => {
  // const orderID = useCurrentOrderID();
  const translate = useTranslate();

  const { layoutID, setLayoutID, totalNumberOfImages } = useSelectLayoutPrintDicom();

  const { listImage, onSelectImage, selectedImages, selectedDicomImageIDs } =
    useSelectDicomImage(orderID, totalNumberOfImages);

  const { onSubmitPrint, blobPdf, isFetching } = usePrintDicomImage({
    images: selectedImages,
    layoutID,
  });

  return (
    <StyledReportPrintImageModal
      renderTitle={() => (
        <StyledPrintDicomTitle textTransform="uppercase">
          {translate.resources.report.dicomImage.title()}
        </StyledPrintDicomTitle>
      )}
      renderBody={() => (
        <StyledPrintModalContentShell>
          {blobPdf && !isFetching ? (
            <PrintImageIframePreview blobPdf={blobPdf} />
          ) : (
            <FullPageSpinner />
          )}
          <MyDivider orientation="vertical" />
          <PrintImagePanel
            setLayoutID={setLayoutID}
            listImage={listImage}
            selectedDicomImageIDs={selectedDicomImageIDs}
            onSelectImage={onSelectImage}
            layoutID={layoutID}
          />
        </StyledPrintModalContentShell>
      )}
      renderFooter={() => (
        <StyledModalPrintDicomFooter>
          <ModalFooterLayout
            ActionButton={
              <MyButton variant="contained" onClick={onSubmitPrint}>
                {translate.resources.report.dicomImage.printImage()}
              </MyButton>
            }
            OptionalButtons={[
              <MyButton key="close" variant="outlined" onClick={close}>
                {translate.buttons.close()}
              </MyButton>,
            ]}
          />
        </StyledModalPrintDicomFooter>
      )}
    />
  );
};

const StyledPrintModalContentShell = styled('div')`
  height: 85vh;
  display: grid;
  grid-template-columns: 5fr auto 1.5fr;
  row-gap: ${(props) => props.theme.spacing(2)};
`;

const StyledReportPrintImageModal = styled(ModalContent)`
  width: 85vw;
  max-width: 85vw;
`;

const StyledPrintDicomTitle = styled(Typography)`
  text-align: center;
  background-color: ${(props) => props.theme.pacs?.customColors.tableHeaderBackground};
  padding: ${(props) => props.theme.spacing(0.5)} 0;
`;

const StyledModalPrintDicomFooter = styled('div')`
  padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(2)};
`;
