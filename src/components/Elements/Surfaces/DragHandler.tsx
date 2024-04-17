import { css, darken, styled } from '@mui/material';
import React, { FC } from 'react';

import { DragEventHandler, useDragEvents } from '@/hooks';
import { MUIInterpolatedThemeProps } from '@/types';
import { filterTransientProps } from '@/utils/filterTransientProps';

type DragHandlerProps = {
  type: 'horizontal' | 'vertical';
  /**
   * Callback on drag
   */
  onDrag: DragEventHandler;
  /**
   * Determine if the onChange callback fires on which mouse event
   */
  mouseEvent: 'mousemove' | 'mouseup';
};

export const DragHandler: FC<DragHandlerProps> = (props) => {
  const { onDrag, type, mouseEvent } = props;
  const { handleDragStart, isDragging, delta } = useDragEvents({
    onDragEnd: mouseEvent === 'mouseup' ? onDrag : undefined,
    onUpdate: mouseEvent === 'mousemove' ? onDrag : undefined,
  });

  /**
   * only shows preview handler on mouseUp
   */
  const showHandler = mouseEvent === 'mouseup';

  return (
    <>
      <StyledDragArea
        $isVisible={isDragging}
        onMouseDown={handleDragStart}
        $type={type}
      />
      {showHandler && (
        <StyledHorizontalDragHandler
          $type={type}
          $isVisible={isDragging}
          style={
            {
              '--deltaMousePosition': `${type === 'horizontal' ? delta.y : delta.x}px`,
            } as React.CSSProperties
          }
        />
      )}
    </>
  );
};

// the area where we allow dragging in pixels
const DRAG_AREA_SIZE = 15;
// the size of the drag bar in pixels
const DRAG_HANDLER_SIZE = 2;

// drag area is the hidden element that allows the mouse to catch mouse event
const dragAreaStyles = (
  props: MUIInterpolatedThemeProps,
  type: DragHandlerProps['type'],
) => css`
  position: absolute;
  top: 0;
  z-index: ${props.theme.zIndex.appBar};
  /* background-color: ${props.theme.pacs?.customColors.borderColor}; */
  opacity: 0.5;
  background-clip: content-box;
  padding-right: ${type === 'vertical' ? `${DRAG_AREA_SIZE - DRAG_HANDLER_SIZE}px` : 0};
  padding-bottom: ${type === 'horizontal'
    ? `${DRAG_AREA_SIZE - DRAG_HANDLER_SIZE}px`
    : 0};
  transition: all 600ms ${props.theme.transitions.easing.easeInOut};
`;

const dragAreaVisibleStyles = (props: MUIInterpolatedThemeProps) => css`
  opacity: 1;
  background-color: ${darken(props.theme.palette.primary.main, 0.1)};
`;

const horizontalDragAreaStyles = () => css`
  height: ${DRAG_AREA_SIZE}px;
  width: 100%;
  cursor: ns-resize;
`;

const verticalDragAreaStyles = () => css`
  height: 100%;
  width: ${DRAG_AREA_SIZE}px;
  cursor: ew-resize;
`;

const StyledDragArea = styled('div', filterTransientProps)<{
  $isVisible: boolean;
  $type: DragHandlerProps['type'];
}>`
  ${(props) =>
    props.$type === 'horizontal' ? horizontalDragAreaStyles : verticalDragAreaStyles}
  ${(props) => dragAreaStyles(props, props.$type)};
  ${(props) => props.$isVisible && dragAreaVisibleStyles}
  &:hover {
    ${dragAreaVisibleStyles}
  }
`;

// drag handler is the visual element
type StyledDragHandlerProps = {
  $isVisible: boolean;
  $type: DragHandlerProps['type'];
};

const dragHandlerVisibleStyles = () => css`
  display: block;
`;
const dragHandlerStyles = (props: MUIInterpolatedThemeProps) => css`
  position: absolute;
  top: 0;
  z-index: ${props.theme.zIndex.appBar};
  background: ${darken(props.theme.palette.primary.main, 0.1)};
  display: none;
`;
const verticalDragHandlerStyles = (isVisible: boolean) => css`
  height: 100%;
  width: ${DRAG_HANDLER_SIZE}px;
  transform: ${isVisible ? `translateX(var(--deltaMousePosition))` : ''};
`;

const horizontalDragHandlerStyles = (isVisible: boolean) => css`
  height: ${DRAG_HANDLER_SIZE}px;
  width: 100%;
  transform: ${isVisible ? `translateY(var(--deltaMousePosition))` : ''};
`;

const StyledHorizontalDragHandler = styled(
  'div',
  filterTransientProps,
)<StyledDragHandlerProps>`
  ${(props) =>
    props.$type === 'horizontal'
      ? horizontalDragHandlerStyles(props.$isVisible)
      : verticalDragHandlerStyles(props.$isVisible)};
  ${dragHandlerStyles};
  ${(props) => props.$isVisible && dragHandlerVisibleStyles()};
`;
