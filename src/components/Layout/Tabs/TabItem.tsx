import { css } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonBase, IconButton, styled, Typography } from '@mui/material';
import { FC, MouseEvent, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

import ItechPatientIcon from '@/assets/icon/PatientIcon';
import { useDeleteLockOrder } from '@/hooks/lockOrder/useDeleteLockOrder';
import { useTab } from '@/hooks/useTab';
import { globalStyles } from '@/providers/ThemeProvider';
import { ITabItem } from '@/types';
import { filterTransientProps } from '@/utils/filterTransientProps';

import { TabRightClickMenu } from './TabRightClickMenu';

type TabsItemProps = {
  tab: ITabItem;
  /**
   * computed tab width
   * @default 170
   */
  width?: number;
};

export const TabItem: FC<TabsItemProps> = (props) => {
  const { tab, width = 170 } = props;
  const { deletable, deleteLockOrder } = useDeleteLockOrder(
    typeof tab.id === 'string' ? parseInt(tab.id) : tab.id,
  );
  const { handleClose, handleContextMenu, isActive } = useTab(
    tab,
    deletable ? deleteLockOrder : undefined,
  );
  return (
    <>
      <TabItemUI
        tab={tab}
        width={width}
        onClose={handleClose}
        isActive={isActive}
        onContextMenu={handleContextMenu}
      />
      <TabRightClickMenu tab={tab} closeOneTabCallback={deleteLockOrder} />
    </>
  );
};

/**
 * Handle UI only
 */
const TabItemUI: FC<{
  tab: ITabItem;
  isActive: boolean;
  width: number;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  onContextMenu?: (e: MouseEvent<HTMLAnchorElement>, tab: ITabItem) => void;
}> = (props) => (
  <StyledTabItem
    to={props.tab.href}
    $isActive={props.isActive}
    $width={props.width}
    onContextMenu={(e) => props.onContextMenu && props.onContextMenu(e, props.tab)}
    title={props.tab.label}
  >
    {/* {!props.isActive && <StyledTabDivider />} */}
    {props.width > 100 && <StyledPatientIcon color="inherit" fontSize="inherit" />}
    <StyledLinkButton>
      <StyledText>{props.tab.label}</StyledText>
    </StyledLinkButton>
    {props.tab.closeable && (
      <StyledIconButton size="small" onClick={props.onClose}>
        <CloseIcon fontSize="inherit" />
      </StyledIconButton>
    )}
  </StyledTabItem>
);

const StyledTabItem = styled(Link, filterTransientProps)<{
  $isActive: boolean;
  $width: number;
}>`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  min-width: ${(props) => props.$width}px;
  max-width: ${(props) => props.$width}px;
  ${(props) =>
    props.$isActive
      ? css`
          background-color: ${props.theme.palette.primary.main};
          color: ${props.theme.palette.getContrastText(props.theme.palette.primary.main)};
          border: none;
          border-bottom: none;
        `
      : css`
          background-color: ${props.theme.palette.background.default};
          color: ${props.theme.palette.getContrastText(
            props.theme.palette.background.default,
          )};
          border: 1px solid ${props.theme.palette.background.paper};
          &:hover {
            background-color: ${props.theme.palette.background.paper};
          }
        `}
  border-radius: 5px 5px 0 0;
  border-color: ${(props) => props.theme.pacs?.customColors.borderColor};
  transition: all ${(props) => props.theme.transitions.duration.standard}ms;
  ${globalStyles.linkAsText};
`;

const StyledLinkButton = styled(ButtonBase)`
  height: 100%;
  width: 100%;
`;

const StyledText = styled(Typography)`
  color: inherit;
  text-transform: uppercase;
  font-family: Kanit;
  font-size: 13px;
  max-width: 50%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
  color: inherit;
  z-index: ${(props) => props.theme.zIndex.appBar};
`;

const StyledTabDivider = styled('div')`
  position: absolute;
  width: 100%;
  z-index: 100;
  top: 25%;
  bottom: 25%;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: ${(props) => props.theme.palette.background.paper};
    opacity: 1;
    transition: opacity 0.2s ease;
  }
  &::after {
    right: -1px;
  }
`;

const StyledPatientIcon = styled(ItechPatientIcon)`
  position: absolute;
  /* font-size: 13px; */
  left: ${(props) => props.theme.spacing(1)};
`;
