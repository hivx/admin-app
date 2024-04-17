import { KeyboardDoubleArrowRight } from '@mui/icons-material';
import { Box, styled, Typography } from '@mui/material';
import { FC, PropsWithChildren, ReactNode } from 'react';

import { useDisclosure } from '@/hooks';
import { globalStyles } from '@/providers/ThemeProvider';
import { filterTransientProps } from '@/utils/filterTransientProps';

import { AnimatedIcon } from '../Icons/AnimatedIcon';
import { MyIcon } from '../Icons/MyIcon';

type SidebarLayoutProps = {
  title: string;
  collapsible?: boolean;
  /**
   * Unmounts contents on collapse
   * If false, contents state will be preserved
   * @default false
   */
  unmountOnCollapse?: boolean;
  /**
   * When menu collapse will show this component
   */
  MenuCollapse?: ReactNode;
};

export const SidebarLayout: FC<PropsWithChildren<SidebarLayoutProps>> = ({
  children,
  title,
  collapsible = false,
  unmountOnCollapse = false,
  MenuCollapse,
}) => {
  const { isOpen, toggle } = useDisclosure(true);
  return (
    <StyledSidebarContainer $isOpen={isOpen}>
      <StyledSidebarHeader
        $collapsible={collapsible}
        onClick={() => collapsible && toggle()}
      >
        {isOpen && (
          <Typography textTransform="uppercase" overflow="hidden" textOverflow="ellipsis">
            {title}
          </Typography>
        )}
        {collapsible && (
          <StyledToggleIcon>
            <AnimatedIcon isActive={isOpen} finalTransform="rotate(180deg)">
              <MyIcon>
                <KeyboardDoubleArrowRight />
              </MyIcon>
            </AnimatedIcon>
          </StyledToggleIcon>
        )}
      </StyledSidebarHeader>
      {isOpen ? (
        <StyledContentWrapper $isOpen={isOpen}>
          {unmountOnCollapse ? isOpen && children : children}
        </StyledContentWrapper>
      ) : (
        MenuCollapse
      )}
    </StyledSidebarContainer>
  );
};

type StyledSidebarContainerProps = {
  $isOpen: boolean;
};

const StyledSidebarContainer = styled(
  Box,
  filterTransientProps,
)<StyledSidebarContainerProps>`
  max-height: 100%;
  width: ${(props) =>
    props.$isOpen ? props.theme.pacs?.layout.sidebarWidth : props.theme.spacing(4)};
  min-width: ${(props) =>
    props.$isOpen ? props.theme.pacs?.layout.sidebarWidth : props.theme.spacing(4)};
  display: flex;
  flex-direction: column;
  transition: all ${(props) => props.theme.transitions.duration.standard}ms ease;
  overflow: hidden;
  border-right: 1px solid
    ${(props) => props.theme.pacs?.customColors.borderSideHeaderColor};
`;

const StyledSidebarHeader = styled(Box, filterTransientProps)<{ $collapsible: boolean }>`
  ${globalStyles.centerChildren};
  ${globalStyles.sidebarHeader};
  position: sticky;
  top: 0;
  border-right: 0;
  :hover {
    ${(props) => props.$collapsible && globalStyles.onSideHeaderHover};
  }
`;

const StyledToggleIcon = styled(Box)`
  ${globalStyles.centerChildren};
  max-width: ${(props) => props.theme.spacing(4)};
  position: absolute;
  right: 0;
  :hover {
    ${globalStyles.onSideHeaderHover};
  }
`;

const StyledContentWrapper = styled(Box, filterTransientProps)<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  height: 100%;
  max-height: 100%;
  /* padding-top: ${(props) => (props.$isOpen ? props.theme.spacing(1) : '0')}; */
  overflow-y: auto;
  overflow-x: hidden;
`;
