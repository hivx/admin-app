import { styled } from '@mui/material';

import { useTranslate } from '@/hooks';

import { usePreviewDocx } from '../../../../hooks/usePreviewDocx';

type PreviewFileDocxProps = {
  fileData?: Blob;
};

/**
 * This component is used to render preview file docx
 */
export const PreviewFileDocx = ({ fileData }: PreviewFileDocxProps) => {
  const translate = useTranslate();
  const { renderFinish, renderSuccess, docxRef } = usePreviewDocx({
    fileData,
  });

  const renderContent = () => {
    if (!renderFinish) {
      return null;
    }
    if (renderSuccess && renderFinish) {
      const previewDocxEle = docxRef.current;
      if (previewDocxEle?.style) {
        // set container to display after read file success
        previewDocxEle.style.display = 'block';
      }
      return null;
    }
    // show cannot preview file text if cannot transfer docx data to HTML
    return <div>{translate.resources.report.attachment.fileCannotPreview()}</div>;
  };

  return (
    <>
      {renderContent()}
      {/* for preview docx, need to create element first */}
      <StyledDocxContainer ref={docxRef} />
    </>
  );
};

const StyledDocxContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: none;
`;
