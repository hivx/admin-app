import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography, styled } from '@mui/material';
import React, { FC } from 'react';

import { MyIconButton } from '@/components';

type DynamicTopbarProps = {
  onBackward: () => void;
  title: string;
};

/**
 * Topbar
 * Gồm nút Quay lại và Tiêu đề
 */
export const DynamicTopbar: FC<DynamicTopbarProps> = ({ onBackward, title }) => {
  return (
    <StyledTopbarWrapper>
      <StyledArrowButton onClick={onBackward} size="extrasmall">
        <ArrowBackIcon />
      </StyledArrowButton>
      <StyledTitle textTransform={'uppercase'}>{title}</StyledTitle>
      <div></div>
    </StyledTopbarWrapper>
  );
};

const StyledTitle = styled(Typography)`
  font-weight: 300;
  font-size: 1rem;
  color: ${(props) => props.theme.palette.background.default};
`;

const StyledArrowButton = styled(MyIconButton)`
  position: absolute;
  left: 0;
  font-size: 1.8rem;
  color: ${(props) => props.theme.palette.background.default};
`;

const StyledTopbarWrapper = styled('div')`
  padding: ${(props) => props.theme.spacing(0.4)};
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
