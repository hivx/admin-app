import { Box } from '@mui/material';

import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';

export type PrintImageIframePreviewProps = {
  blobPdf: Blob;
};

export const PrintImageIframePreview = (props: PrintImageIframePreviewProps) => {
  const { blobPdf } = props;
  const urlPdf = blobPdf && URL.createObjectURL(blobPdf);
  return urlPdf ? (
    <Box padding={1} height={'100%'}>
      <iframe width={'100%'} height={'100%'} src={urlPdf} title="layout-preview" />
    </Box>
  ) : (
    <FullPageSpinner></FullPageSpinner>
  );
};
