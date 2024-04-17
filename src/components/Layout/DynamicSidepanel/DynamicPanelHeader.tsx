import CloseIcon from '@mui/icons-material/Close';
import { Stack, styled } from '@mui/material';
import React, { FC, ReactNode } from 'react';

import { globalStyles } from '@/providers/ThemeProvider';

export type DynamicPanelHeaderProps = {
  onClose?: () => void;
  Title: ReactNode;
  ActionButtons?: ReactNode;
};

export const DynamicPanelHeader: FC<DynamicPanelHeaderProps> = (props) => {
  const { onClose, Title, ActionButtons } = props;
  return (
    <StyledOrderPanelHeaderContainer>
      <StyledActionButtonsMain direction="row" spacing={0.5}>
        {ActionButtons ? ActionButtons : <div></div>}
      </StyledActionButtonsMain>
      <StyledTitleAndCloseContainer direction="row" spacing={1} height="100%">
        <StyledTitle>{Title}</StyledTitle>
        {onClose && (
          <StyledCloseIcon onClick={onClose}>
            <CloseIcon />
          </StyledCloseIcon>
        )}
      </StyledTitleAndCloseContainer>
    </StyledOrderPanelHeaderContainer>
  );
};

const StyledOrderPanelHeaderContainer = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 ${(props) => props.theme.spacing(1)};
  ${globalStyles.sidebarHeader}
  border-top: 0;
  border-right: 0;
  border-left: 0;
  /* color: white; */
  overflow: hidden;
  :hover {
    ${globalStyles.onSideHeaderHover};
  }
`;

const StyledTitleAndCloseContainer = styled(Stack)`
  overflow: hidden;
  width: fit-content;
  display: flex;
  justify-content: end;
`;

const StyledCloseIcon = styled('div')`
  ${globalStyles.centerChildren};
  max-width: ${(props) => props.theme.spacing(4)};
  :hover {
    background-color: ${(props) => props.theme.palette.primary.main};
    svg {
      color: ${(props) => props.theme.pacs?.customColors.textIconHoverColor};
    }
  }
`;

const StyledActionButtonsMain = styled(Stack)`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: start;
  svg {
    color: ${(props) => props.theme.pacs?.customColors.iconDynamicPanelInactiveColor};
  }
  &:hover {
    button {
      background-color: transparent;
    }
    svg {
      color: ${(props) => props.theme.pacs?.customColors.iconDynamicPanelInactiveColor};
    }
  }
`;

const StyledTitle = styled('div')`
  display: flex;
  margin-left: ${(props) => props.theme.spacing(1)};
  text-transform: uppercase;
  text-align: right;
  align-items: center;
`;
