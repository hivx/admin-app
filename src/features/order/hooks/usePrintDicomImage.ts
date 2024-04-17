import { useGetPdfQuery } from '@/api/convertPdf';
import {
  getLayoutPrintHTML,
  LAYOUT_DISPLAY_NAME,
} from '@/components/Order/PrintDicomModal';
import { ImageDataState } from '@/hooks/useSelectDicomImage';
import { printPDF } from '@/lib/dataHelper/printPDF';

/**
 * @returns urlPdf & func print pdf data from images dicom & layoutID
 */
export const usePrintDicomImage = ({
  images,
  layoutID,
}: {
  images: ImageDataState[];
  layoutID: LAYOUT_DISPLAY_NAME;
}) => {
  /**
   * map images to layout
   */
  const view = getLayoutPrintHTML(
    layoutID,
    images.map((item) => item.data),
  );

  const { data: blobPdf, isFetching: isFetchingConvert } = useGetPdfQuery({
    contentHTML: view ?? '',
  });

  const onSubmitPrint = () => {
    if (blobPdf) {
      printPDF(blobPdf);
    }
  };

  return {
    blobPdf,
    onSubmitPrint,
    isFetching: isFetchingConvert,
  };
};
