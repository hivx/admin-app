import { styled } from '@mui/material';
import React, { FC } from 'react';

type IframeViewerProps = {
  url: string;
};
const VIEWER_TITLE = 'ITECH VIEWER';
const VIEWER_ID = 'itech-viewer';

export const IframeViewer: FC<IframeViewerProps> = (props) => {
  const { url } = props;
  return (
    <StyledViewerContainer>
      <iframe
        allowFullScreen
        title={VIEWER_TITLE}
        id={VIEWER_ID}
        src={url}
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </StyledViewerContainer>
  );
};

const StyledViewerContainer = styled('div')`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;
