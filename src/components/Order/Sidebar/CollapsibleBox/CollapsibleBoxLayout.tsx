import { KeyboardArrowUp } from '@mui/icons-material';
import { Box, SxProps, Typography, styled } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';

import { AnimatedIcon } from '@/components/Elements/Icons/AnimatedIcon';
import { MyIcon } from '@/components/Elements/Icons/MyIcon';
import { useDisclosure } from '@/hooks';
import { globalStyles } from '@/providers/ThemeProvider';
import { filterTransientProps } from '@/utils/filterTransientProps';

type CollapsibleBoxLayoutType = { title: string; collapsible?: boolean; sx?: SxProps };

/**
 * Layout can toggle expand use to wrap any component inside
 */

export const CollapsibleBoxLayout: FC<PropsWithChildren<CollapsibleBoxLayoutType>> = ({
  title,
  children,
  collapsible = false,
  sx,
}) => {
  const { isOpen, toggle } = useDisclosure(true);

  return (
    <StyledCollapsibleBox>
      <StyledTitleWrapper $collapsible={collapsible} onClick={toggle}>
        <Typography textTransform={'uppercase'}>{title}</Typography>
        <StyledToggleIcon>
          <AnimatedIcon isActive={isOpen} finalTransform="rotate(180deg)">
            <MyIcon>
              <KeyboardArrowUp />
            </MyIcon>
          </AnimatedIcon>
        </StyledToggleIcon>
      </StyledTitleWrapper>
      <StyledContentWrapper $isOpen={isOpen} sx={sx}>
        {children}
      </StyledContentWrapper>
    </StyledCollapsibleBox>
  );
};

const StyledCollapsibleBox = styled(Box)`
  transition: all ${(props) => props.theme.transitions.duration.standard}ms ease;
`;

const StyledTitleWrapper = styled(Box, filterTransientProps)<{ $collapsible: boolean }>`
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
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;
