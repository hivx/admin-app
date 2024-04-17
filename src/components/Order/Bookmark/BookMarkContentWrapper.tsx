import { styled } from '@mui/material';
import React, { FC, ReactNode } from 'react';

import { globalStyles } from '@/providers/ThemeProvider';
type BookMarkContentWrapperProps = {
  OrderInfo: ReactNode;
  BookmarkFields: ReactNode;
};
const BookMarkContentWrapper: FC<BookMarkContentWrapperProps> = (props) => {
  const { OrderInfo, BookmarkFields } = props;
  return (
    <StyledBookMarkContentWrapper>
      {OrderInfo}
      <StyledBookmarkFieldsMain>{BookmarkFields}</StyledBookmarkFieldsMain>
    </StyledBookMarkContentWrapper>
  );
};

export default BookMarkContentWrapper;

const StyledBookMarkContentWrapper = styled('div')`
  display: grid;
  grid-template-columns: auto;
  row-gap: ${(props) => props.theme.spacing(2)};
`;

const StyledBookmarkFieldsMain = styled('div')`
  ${globalStyles.ellipsisEffect};
  width: 100%;
  padding-top: ${(props) => props.theme.spacing(1)};
`;
