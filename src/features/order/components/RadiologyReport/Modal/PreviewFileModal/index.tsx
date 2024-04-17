import { Box, Modal, styled } from '@mui/material';
import { FC } from 'react';

import { AppModalContent } from '@/components/Elements/Modal/AppModalContent';
import { useDisclosure, useTranslate } from '@/hooks';
import { usePreviewAttachment } from '@/hooks/order/usePreviewAttachment';
import { IOrderFileDTO } from '@/types/dto';
import { checkFileCanPreview, FILE_TYPE, getFileType } from '@/utils/fileUtils';

import { PreviewFileDocx } from './PreviewFileDocx';

type PreviewFileModalProps = {
  disclosure: Pick<ReturnType<typeof useDisclosure>, 'close' | 'isOpen' | 'open'>;
  filePreview: IOrderFileDTO;
};

/**
 * Modal preview file attachment
 * Can preview image, audio, video, pdf, docx
 * Other files will need download to view
 */

export const PreviewFileModal: FC<PreviewFileModalProps> = (props) => {
  const { disclosure, filePreview } = props;
  const { size, contentType, originalName } = filePreview;
  const translate = useTranslate();

  const canPreviewFile = checkFileCanPreview(size, contentType);
  const { handleDownloadFile, filePreviewUrl, initFile, isLoading, fileData } =
    usePreviewAttachment(filePreview);

  // for check file is rendering then render loading

  const renderFilePreview = () => {
    const fileType = getFileType(contentType);
    if (!canPreviewFile || (initFile && !filePreviewUrl)) {
      // show cannot preview text when the file is not support preview or cannot fetch file data
      return <div>{translate.resources.report.attachment.fileCannotPreview()}</div>;
    }
    if (initFile && filePreviewUrl) {
      // only render if file is loaded success and have filePreviewUrl
      switch (fileType) {
        case FILE_TYPE.IMAGE: {
          return <StyledImg src={filePreviewUrl} alt="preview-img" />;
        }
        case FILE_TYPE.AUDIO: {
          return (
            <audio controls src={filePreviewUrl}>
              <track kind="captions" />
            </audio>
          );
        }
        case FILE_TYPE.VIDEO: {
          return (
            <StyledVideo controls src={filePreviewUrl}>
              <track kind="captions" />
            </StyledVideo>
          );
        }
        case FILE_TYPE.PDF: {
          return (
            <Box padding={1} height={'100%'} width={'100%'}>
              <iframe
                width={'100%'}
                height={'100%'}
                src={filePreviewUrl}
                title="layout-preview"
                frameBorder={0}
              />
            </Box>
          );
        }
        case FILE_TYPE.DOCX: {
          return <PreviewFileDocx fileData={fileData} />;
        }
      }
    }
  };

  return (
    <Modal open={!!disclosure.isOpen} disableEnforceFocus>
      <AppModalContent
        isLoading={isLoading}
        handleConfirm={handleDownloadFile}
        BoxBodyProps={{ height: '80vh' }}
        BodyComponent={<StyledDivPreview>{renderFilePreview()}</StyledDivPreview>}
        width="85vw"
        handleClose={disclosure.close}
        confirmLabel={translate.buttons.download()}
        title={originalName}
      />
    </Modal>
  );
};

const StyledImg = styled('img')`
  object-fit: contain;
  width: 100%;
  max-height: 100%;
`;

const StyledVideo = styled('video')`
  width: 100%;
`;

const StyledDivPreview = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
