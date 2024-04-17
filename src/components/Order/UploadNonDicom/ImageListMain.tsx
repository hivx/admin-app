import { Divider, styled, Typography } from '@mui/material';
import React, { ReactNode, FC, ClipboardEventHandler } from 'react';

type ImageListMainProps = {
  title: string;
  ImageListComponent: ReactNode;
  handlePaste: ClipboardEventHandler<HTMLDivElement>;
};
const ImageListMain: FC<ImageListMainProps> = (props) => {
  return (
    <StyledImageListMain onPaste={props.handlePaste}>
      <StyledListImageComponent>
        {/*  image list */}
        {props.ImageListComponent}
      </StyledListImageComponent>
      <Divider />
      <StyledImageListTitleWrapper>
        <StyledImageListTitle>{props.title}</StyledImageListTitle>
      </StyledImageListTitleWrapper>
    </StyledImageListMain>
  );
};

export default ImageListMain;

const StyledImageListMain = styled('div')`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr auto auto;
`;
const StyledListImageComponent = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  max-height: 300px;
  overflow: auto;
  height: 100%;
  padding: ${(props) => props.theme.spacing(1)};
  gap: ${(props) => props.theme.spacing(1)};
`;
const StyledImageListTitleWrapper = styled('div')`
  align-items: center;
  padding: ${(props) => props.theme.spacing(1)};
`;
const StyledImageListTitle = styled(Typography)`
  ${(props) => props.theme.typography.body1};
  /* background-color: ${(props) => props.theme.palette.primary.main}; */
`;
