import CloseIcon from '@mui/icons-material/Close';
import { Paper, styled, SxProps, Typography } from '@mui/material';
import { FC, useCallback, ReactNode } from 'react';
import { LocalizedString } from 'typesafe-i18n';

import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { IMousePosition, useAppDispatch, useAppSelector, useDisclosure } from '@/hooks';
import { globalStyles } from '@/providers/ThemeProvider';
import {
  selectCollapsiblePanelHeight,
  setCollapsiblePanelHeight,
} from '@/stores/layoutSlice';
import { filterTransientProps } from '@/utils/filterTransientProps';

import { DragHandler } from './DragHandler';

type CloseablePanelProps = {
  title?: string | LocalizedString;
  /**
   * Initial open panel state.
   * Will unmount child component if state is false
   * @default false
   */
  initialExpanded?: boolean;
  /**
   * Callback that runs on expansion
   */
  onExpand?: () => void;
  /**
   * Callback that runs on collapse
   */
  onCollapse?: () => void;
  /**
   * Allow close
   */
  onClose?: () => void;
  /**
   * Not allow toggle when click to panel title
   */
  isNotToggle?: boolean;
  /**
   * Override sx props for container
   */
  sx?: SxProps;
  children?: ReactNode;
};

export const CloseableCollapsiblePanel: FC<CloseablePanelProps> = (props) => {
  const { onClose, initialExpanded = true, ...rest } = props;
  const { isOpen, close } = useDisclosure(true);
  const handleClose = useCallback(() => {
    onClose && onClose();
    close();
  }, [close, onClose]);

  return isOpen ? (
    <CollapsiblePanel {...rest} initialExpanded={initialExpanded} onClose={handleClose} />
  ) : (
    <></>
  );
};

/**
 * Render a panel with a close button
 */
export const CollapsiblePanel: FC<CloseablePanelProps> = (props) => {
  const {
    title,
    initialExpanded = false,
    onClose,
    onExpand,
    onCollapse,
    sx,
    isNotToggle,
  } = props;
  // Move useDisclosure here because the open/close state of this panel is local
  // to this component only
  const { isOpen, toggle } = useDisclosure(initialExpanded);
  const height = useAppSelector(selectCollapsiblePanelHeight);
  // const [height, setHeight] = useState<number>(initialHeight);
  const dispatch = useAppDispatch();

  const handleExpand = useCallback(() => {
    if (isOpen) onCollapse && onCollapse();
    else onExpand && onExpand();
    toggle();
  }, [isOpen, onCollapse, onExpand, toggle]);

  const handleDragEnd = useCallback(
    (e: MouseEvent, delta: IMousePosition) => {
      const newHeight = height - (delta.y ?? 0);
      dispatch(setCollapsiblePanelHeight(newHeight));
    },
    [dispatch, height],
  );

  return (
    <StyledContainer sx={sx}>
      {isOpen && (
        <DragHandler type="horizontal" onDrag={handleDragEnd} mouseEvent="mouseup" />
      )}
      <StyledHeader>
        <StyledTitleGroup
          $isNotToggle={isNotToggle}
          onClick={!isNotToggle ? handleExpand : undefined}
        >
          {title && (
            <Typography
              px={1}
              textTransform="uppercase"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {title}
            </Typography>
          )}
        </StyledTitleGroup>

        {onClose && (
          <StyledCloseIcon onClick={onClose}>
            <CloseIcon />
          </StyledCloseIcon>
        )}
      </StyledHeader>
      <StyledChildrenContainer $isOpen={isOpen} $height={`${height}px`}>
        {isOpen && props.children}
      </StyledChildrenContainer>
    </StyledContainer>
  );
};

/**
 * Styles
 */
const StyledContainer = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
  /* bottom: 0; */
  border-radius: 3px;
  width: 100%;
  max-width: 100%;
  /* box-shadow: 0px -3px 3px -2px rgba(0, 0, 0, 0.2), 0px -3px 4px 0px rgba(0, 0, 0, 0.14),
    0px -1px 8px 0px rgba(0, 0, 0, 0.12); */
  // when render below a table, the table's border gets shown on the bottom, translate down by 2px to hide it */
  /* transform: translateY(
    2px
  ); */
`;

const StyledHeader = styled('div')`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${(props) => props.theme.spacing(4)};
  ${globalStyles.sidebarHeader}
  white-space: nowrap;
  border-radius: ${(props) => props.theme.pacs?.layout.borderRadius}
    ${(props) => props.theme.pacs?.layout.borderRadius} 0 0;
  :hover {
    ${globalStyles.onSideHeaderHover};
  }
  border-top: 0;
  border-bottom: 0;
`;

const StyledTitleGroup = styled(StyledDivLeftChildren, filterTransientProps)<{
  $isNotToggle?: boolean;
}>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  ${(props) => (!props.$isNotToggle ? globalStyles.sidebarHeader : undefined)};
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
  :hover {
    ${globalStyles.onSideHeaderHover};
  }
`;

const StyledChildrenContainer = styled(Paper, filterTransientProps)<{
  $isOpen: boolean;
  $height: string;
}>`
  height: ${(props) => (props.$isOpen ? props.$height : 0)};
  transition: height ${(props) => props.theme.transitions.duration.standard}ms
    ${(props) => props.theme.transitions.easing.easeOut};
  overflow: auto;
  box-shadow: none;
`;

const StyledActionIcon = styled('div')`
  ${globalStyles.centerChildren};
  max-width: ${(props) => props.theme.spacing(4)};
  :hover {
    ${globalStyles.onSideHeaderHover};
  }
`;

const StyledCloseIcon = styled(StyledActionIcon)`
  position: absolute;
  right: 0;
`;
