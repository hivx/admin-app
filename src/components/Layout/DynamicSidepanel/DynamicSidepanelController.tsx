import { Box, Stack, SxProps, styled, useTheme } from '@mui/material';
import React, {
  FC,
  Fragment,
  ReactEventHandler,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { DragHandler } from '@/components/Elements/Surfaces/DragHandler';
import { IMousePosition, useAppDispatch, useAppSelector } from '@/hooks';
import { globalStyles } from '@/providers/ThemeProvider';
import { selectSidepanels as selectSidepanels } from '@/stores/dynamicSidepanel/dynamicSidepanelSelectors';
import {
  ISidepanelPayload,
  togglePanel,
} from '@/stores/dynamicSidepanel/dynamicSidepanelSlice';
import { getResizePanelHeightHandler } from '@/stores/dynamicSidepanel/dynamicSidepanelUtils';
import {
  selectDynamicSidepanelWidth,
  setDynamicSidepanelWidth,
} from '@/stores/layoutSlice';
import { CSSSize } from '@/types';
import { USER_MODULE } from '@/types/dto';
import { ISidepanel, ISidepanelLayout } from '@/types/dynamicSidepanel';
import { filterTransientProps } from '@/utils/filterTransientProps';

import { Iconbar } from './Iconbar';
import { SidepanelIconButtonCloseAll } from './SidepanelIconButtonCloseAll';

type DynamicSidepanelProps = {
  page: USER_MODULE;
  sidepanels: Record<string, ISidepanel>;
  sxIconBar?: SxProps;
};
/**
 * Controls the dynamic extensible layout panels on the right side of a page
 * Define the child component from outside
 * This component contains only the logic to activate-deactivate components and control
 * panel sizing
 */
export const DynamicSidepanelController: FC<DynamicSidepanelProps> = (props) => {
  const { page, sidepanels, sxIconBar } = props;
  const sidePanelsLayout = useAppSelector(selectSidepanels(page));
  const dispatch = useAppDispatch();

  const getPanelIconOnClickHandler = useCallback(
    (panelPayload: ISidepanelPayload): ReactEventHandler<HTMLButtonElement> =>
      (e) => {
        dispatch(togglePanel(panelPayload));
      },
    [dispatch],
  );
  const sidePanelsWithLayout = useMemo<ISidepanelLayout[]>(() => {
    return sidePanelsLayout.map((panelLayout) => ({
      ...panelLayout,
      ...sidepanels[panelLayout.id],
      onIconClick: getPanelIconOnClickHandler({
        page,
        panelID: panelLayout.id,
      }),
    }));
  }, [getPanelIconOnClickHandler, page, sidePanelsLayout, sidepanels]);

  return (
    <Layout
      sidepanelsWithLayoutInfo={sidePanelsWithLayout}
      page={page}
      sxIconBar={sxIconBar}
    />
  );
};

type SidepanelLayoutProps = {
  sidepanelsWithLayoutInfo: ISidepanelLayout[];
  page: USER_MODULE;
  sxIconBar?: SxProps;
};

// spacing between panels
const PANEL_SPACING = 0.5;
/**
 * UI Layer of DynamicSidebar
 * Consists of a sidebar with icons for each sidepanel item
 * And the main display area
 */
const Layout: FC<SidepanelLayoutProps> = (props) => {
  const { sidepanelsWithLayoutInfo, page, sxIconBar } = props;
  const theme = useTheme();
  const width = useAppSelector(selectDynamicSidepanelWidth);
  const dispatch = useAppDispatch();
  const mainComponentsWrapperRef = useRef<HTMLElement>(null);
  const [parentHeight, setParentHeight] = useState<number | undefined>();
  const enabledPanels = sidepanelsWithLayoutInfo.filter(
    (panel) => panel.isActive || panel.config.runInBackground,
  );
  const visiblePanels = enabledPanels.filter((panel) => panel.isActive);
  const sumHeightRatio = visiblePanels.reduce(
    (acc, curr) => acc + (curr.isActive ? curr.ratio : 0),
    0,
  );
  const spacingHeight = theme.spacing(PANEL_SPACING);

  const handleResizePanelWidth = useCallback(
    (e: MouseEvent, delta: IMousePosition) => {
      const newWidth = width - (delta.x ?? 0);
      dispatch(setDynamicSidepanelWidth(newWidth));
    },
    [dispatch, width],
  );

  // update height of sidepanel whenever window is resized or initialized
  useLayoutEffect(() => {
    const parentElement = mainComponentsWrapperRef.current;

    const updateHeight = () => {
      const height = parentElement?.getBoundingClientRect().height;
      setParentHeight(height);
    };
    if (parentElement) {
      updateHeight();
      window.addEventListener('resize', updateHeight);
    }
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const renderPanel = (panel: ISidepanelLayout, index: number) => {
    if (panel.MainComponent) {
      const ClonedMainComponent = React.cloneElement(panel.MainComponent, {
        onClose: panel.onIconClick,
      });
      const panelHeight: CSSSize = `${(panel.ratio / sumHeightRatio) * 100}%`;
      const isLastElement = index === visiblePanels.length - 1;
      return (
        <StyledMainComponentWrapper
          key={panel.id}
          style={
            {
              '--height': `calc(${panelHeight} - ${
                isLastElement ? '0px' : spacingHeight
              })`,
              display: panel.config.runInBackground && !panel.isActive ? 'none' : 'block',
            } as React.CSSProperties
          }
        >
          {ClonedMainComponent}
          {!isLastElement && (
            <Box position="relative">
              <DragHandler
                type="horizontal"
                mouseEvent="mousemove"
                onDrag={getResizePanelHeightHandler({
                  index,
                  page,
                  dispatch,
                  parentHeight,
                  sumHeightRatio,
                })}
              />
            </Box>
          )}
        </StyledMainComponentWrapper>
      );
    }
    return <Fragment key={panel.id}></Fragment>;
  };

  return (
    <Stack direction="row" maxHeight="100%" overflow="auto" spacing={0}>
      {visiblePanels.length ? (
        <DragHandler
          type="vertical"
          onDrag={handleResizePanelWidth}
          mouseEvent="mousemove"
        />
      ) : (
        <></>
      )}
      <StyledLayoutWrapper direction="row" spacing={0.5}>
        <Iconbar sx={sxIconBar}>
          <SidepanelIconButtonCloseAll
            page={page}
            sidepanelsWithLayoutInfo={sidepanelsWithLayoutInfo}
          />
          {sidepanelsWithLayoutInfo.map((panel) => {
            if (panel.IconComponent) {
              const Cloned = React.cloneElement(panel.IconComponent, {
                color: panel.isActive ? 'primary' : 'action',
              });
              return (
                <StyledIconButton
                  key={panel.id}
                  title={panel.title}
                  placement="left"
                  $isActive={panel.isActive}
                  onClick={panel.onIconClick}
                >
                  {Cloned}
                </StyledIconButton>
              );
            }
          })}
        </Iconbar>
        <StyledMainComponentsWrapper
          ref={mainComponentsWrapperRef}
          direction="column"
          spacing={PANEL_SPACING}
          style={
            { '--width': `${visiblePanels.length ? width : 0}px` } as React.CSSProperties
          }
        >
          {enabledPanels.map((panel, index) => {
            return renderPanel(panel, index);
          })}
        </StyledMainComponentsWrapper>
      </StyledLayoutWrapper>
    </Stack>
  );
};

const StyledMainComponentsWrapper = styled(Stack)`
  max-height: 100%;
  width: var(--width);
  /* transition: width ${(props) => props.theme.transitions.duration.standard}ms
    ${(props) => props.theme.transitions.easing.easeOut}; */
  overflow: hidden;
`;

const StyledMainComponentWrapper = styled('div')`
  width: 100%;
  height: var(--height);
  max-height: var(--height);
  min-height: var(--height);
  position: relative;
`;

export const StyledIconButton = styled(IconButtonWithToolTip, filterTransientProps)<{
  $isActive: boolean;
}>`
  ${(props) => (props.$isActive ? globalStyles.hoverStyles : '')}
  svg {
    font-size: 20px;
    color: ${(props) =>
      props.$isActive
        ? props.theme.pacs?.customColors.textTableRowHoverColor
        : props.theme.pacs?.customColors.iconDefaultColor};
  }
`;

const StyledLayoutWrapper = styled(Stack)`
  max-height: 100%;
  height: 100%;
  overflow: hidden;
`;
