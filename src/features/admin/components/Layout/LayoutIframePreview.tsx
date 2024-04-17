import { Box } from '@mui/material';

import { useGetPdfQuery } from '@/api/convertPdf';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { PAPER_CONFIG } from '@/types/pdf';

type LayoutIframePreviewProps = {
  html: string;
};

export const LayoutIframePreview = (props: LayoutIframePreviewProps) => {
  const { html } = props;

  const { data: blobPdf } = useGetPdfQuery({
    contentHTML: html,
    ...PAPER_CONFIG.normalA4,
  });

  const urlPdf = blobPdf && URL.createObjectURL(blobPdf);

  return urlPdf ? (
    <Box padding={1} height={'100%'}>
      <iframe width={'100%'} height={'100%'} src={urlPdf} title="layout-preview" />
    </Box>
  ) : (
    <FullPageSpinner></FullPageSpinner>
  );
};
